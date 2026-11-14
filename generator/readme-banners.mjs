// Opens a pull request in each AsBuiltReport.* repo that puts its brand banner at the top of README.md.
// The old organisation logo block is replaced where there is one. Otherwise the banner goes at the top.
// Repos whose README already uses the banner, or that already have the pull request open, are skipped.
//
// Usage (from this folder, GITHUB_TOKEN needs repo write access, for example: GITHUB_TOKEN=$(gh auth token)):
//   node readme-banners.mjs                       dry run: shows what would change in every repo
//   node readme-banners.mjs --out ./preview       dry run, also writes each new README to ./preview
//   node readme-banners.mjs --apply               opens the pull requests
//   node readme-banners.mjs --apply --repo AsBuiltReport.Microsoft.Azure

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { config, githubHeaders, listOrgRepos, parseRepoArgs } from "./repos.mjs";

const branch = "feature/readme-banner";
const title = "Use the AsBuiltReport brand banner in the README";
const args = process.argv.slice(2);
const apply = args.includes("--apply");
const outIndex = args.indexOf("--out");
const outDir = outIndex >= 0 ? args[outIndex + 1] : null;

export function bannerBlock(repo) {
    return [
        '<p align="center">',
        '    <a href="https://www.asbuiltreport.com/">',
        `        <img src="https://raw.githubusercontent.com/${config.org}/.github/main/assets/repo-banners/${repo}.png" alt="${repo}" width="880"></a>`,
        "</p>",
    ];
}

// The old logo is a centred paragraph holding the organisation avatar or AsBuiltReport.png.
const logoBlock = /<p align="center">\s*<a href="https:\/\/www\.asbuiltreport\.com\/?"[^>]*>(?:\s*<\/a>)?\s*<img src=['"](?:https:\/\/github\.com\/AsBuiltReport\.png|https:\/\/avatars\.githubusercontent\.com\/u\/42958564[^'"]*|[^'"]*\/AsBuiltReport\.png)['"][^>]*>\s*(?:<\/a>)?\s*<\/p>/;

export function addBanner(readme, repo) {
    if (readme.includes("/assets/repo-banners/")) return null;
    const eol = readme.includes("\r\n") ? "\r\n" : "\n";
    const block = bannerBlock(repo).join(eol);
    if (logoBlock.test(readme)) return { how: "replaced logo", text: readme.replace(logoBlock, block) };

    // No logo: put the banner first, after the "DO NOT EDIT" comment if the README has one.
    const comment = readme.match(/^<!--[^\n]*DO NOT EDIT[^\n]*-->\r?\n/);
    const head = comment ? comment[0] : "";
    return { how: "inserted at top", text: head + block + eol + readme.slice(head.length) };
}

async function api(path, options = {}) {
    const response = await fetch(`https://api.github.com${path}`, {
        ...options,
        headers: { ...githubHeaders(), ...(options.body ? { "Content-Type": "application/json" } : {}) },
    });
    if (!response.ok && response.status !== 404) {
        throw new Error(`${options.method || "GET"} ${path}: ${response.status} ${await response.text()}`);
    }
    return response.status === 404 ? null : response.json();
}

async function openPullRequest(repo, base, readme, text) {
    const owner = config.org;
    const open = await api(`/repos/${owner}/${repo}/pulls?state=open&head=${owner}:${branch}`);
    if (open && open.length) return `already open: ${open[0].html_url}`;

    const baseRef = await api(`/repos/${owner}/${repo}/git/ref/heads/${base}`);
    const existing = await api(`/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(branch)}`);
    if (existing) return `skipped: branch ${branch} already exists`;
    await api(`/repos/${owner}/${repo}/git/refs`, {
        method: "POST",
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseRef.object.sha }),
    });
    await api(`/repos/${owner}/${repo}/contents/README.md`, {
        method: "PUT",
        body: JSON.stringify({
            branch,
            sha: readme.sha,
            content: Buffer.from(text, "utf8").toString("base64"),
            message: `${title}\n\nThe banner is rendered centrally by the generator in the .github repo.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`,
        }),
    });
    const pr = await api(`/repos/${owner}/${repo}/pulls`, {
        method: "POST",
        body: JSON.stringify({
            title,
            head: branch,
            base,
            body: [
                "## Summary",
                "",
                `Puts the AsBuiltReport brand banner at the top of the README, in place of the small organisation logo. The banner is rendered by the [generator in the .github repo](https://github.com/${owner}/.github/tree/main/generator), which keeps it up to date, so this repo does not store the image.`,
                "",
                `Line 3 of the banner shows \`PS> Install-Module ${repo}\` once the module is on the PowerShell Gallery, and the GitHub URL until then.`,
                "",
                "🤖 Generated with [Claude Code](https://claude.com/claude-code)",
            ].join("\n"),
        }),
    });
    return pr.html_url;
}

const requested = parseRepoArgs(args);
const repos = (await listOrgRepos())
    .filter((r) => !config.noReadmeBanner.includes(r.name))
    .filter((r) => !requested.length || requested.includes(r.name));

console.log(`${apply ? "Applying to" : "Dry run for"} ${repos.length} repos`);
if (outDir) await mkdir(outDir, { recursive: true });
for (const { name, default_branch: base } of repos) {
    const readme = await api(`/repos/${config.org}/${name}/contents/README.md?ref=${base}`);
    if (!readme) {
        console.log(`no README  ${name}`);
        continue;
    }
    const current = Buffer.from(readme.content, "base64").toString("utf8");
    const result = addBanner(current, name);
    if (!result) {
        console.log(`has banner ${name}`);
        continue;
    }
    if (outDir) await writeFile(join(outDir, `${name}.md`), result.text);
    const outcome = apply ? await openPullRequest(name, base, readme, result.text) : `would open a PR on ${base}`;
    console.log(`${result.how.padEnd(16)} ${name}: ${outcome}`);
}
