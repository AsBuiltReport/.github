// Opens a pull request in each AsBuiltReport.* repo that applies the brand to README.md
// (see readme-brand.mjs): the repo banner, section icons in place of emoji, and badges in the brand palette.
// Where the pull request is already open, the changes are committed to its branch instead.
// Repos whose README already has every change are skipped.
//
// Usage (from this folder, GITHUB_TOKEN needs repo write access, for example: GITHUB_TOKEN=$(gh auth token)):
//   node readme-prs.mjs                       dry run: shows what would change in every repo
//   node readme-prs.mjs --out ./preview       dry run, also writes each new README to ./preview
//   node readme-prs.mjs --apply               opens or updates the pull requests
//   node readme-prs.mjs --apply --repo AsBuiltReport.Microsoft.Azure

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { config, githubHeaders, listOrgRepos, parseRepoArgs } from "./repos.mjs";
import { applyBrand } from "./readme-brand.mjs";

const branch = "feature/readme-brand";
const title = "Apply the AsBuiltReport brand to the README";
const args = process.argv.slice(2);
const apply = args.includes("--apply");
const outIndex = args.indexOf("--out");
const outDir = outIndex >= 0 ? args[outIndex + 1] : null;
const owner = config.org;

const commitMessage = [
    title,
    "",
    "- Repo banner in place of the organisation logo",
    "- Section icons in place of emoji on the section headings",
    "- Badges in the brand palette: link blue for versions, console blue for counts, highlighter for compatibility",
    "- Central health check highlight swatches in place of placeholder image services, in the report style's colours",
    "",
    "The banner, icons and swatches are rendered centrally by the generator in the .github repo.",
    "",
    "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
].join("\n");

const prBody = (repo) => [
    "## Summary",
    "",
    "Applies the AsBuiltReport brand to the README, to match [www.asbuiltreport.com](https://www.asbuiltreport.com) and the other report modules:",
    "",
    `- **Banner:** the repo banner in place of the small organisation logo. Its last line shows \`PS> Install-Module ${repo}\` once the module is on the PowerShell Gallery, and the GitHub address until then.`,
    `- **Section icons:** the emoji on the section headings are replaced with the [section icon pack](https://github.com/${owner}/.github/tree/main/assets/section-icons), in the style of the feature icons on the website.`,
    "- **Badges:** recoloured to the brand palette: link blue `#1F5FD0` for versions, console blue `#012456` for counts, highlighter `#FFD02B` for compatibility.",
    `- **Highlight swatches** (where the README has a HealthCheck table): the colour images now come from the [central swatches](https://github.com/${owner}/.github/tree/main/assets/highlight-swatches) instead of placeholder services such as placehold.co, which break. Each swatch shows the colour this module's report style uses, so it can differ from the old image where that showed another module's colour.`,
    "",
    `The banner, icons and swatches are rendered by the [generator in the .github repo](https://github.com/${owner}/.github/tree/main/generator), which keeps them up to date, so this repo does not store the images. Only \`README.md\` changes.`,
    "",
    "🤖 Generated with [Claude Code](https://claude.com/claude-code)",
].join("\n");

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

const getReadme = (repo, ref) => api(`/repos/${owner}/${repo}/contents/README.md?ref=${encodeURIComponent(ref)}`);
const putReadme = (repo, readme, text) => api(`/repos/${owner}/${repo}/contents/README.md`, {
    method: "PUT",
    body: JSON.stringify({ branch, sha: readme.sha, content: Buffer.from(text, "utf8").toString("base64"), message: commitMessage }),
});
const decode = (readme) => Buffer.from(readme.content, "base64").toString("utf8");

const requested = parseRepoArgs(args);
const repos = (await listOrgRepos())
    .filter((r) => !config.noReadmeBanner.includes(r.name))
    .filter((r) => !requested.length || requested.includes(r.name));

console.log(`${apply ? "Applying to" : "Dry run for"} ${repos.length} repos`);
if (outDir) await mkdir(outDir, { recursive: true });
for (const { name, default_branch: base } of repos) {
    const open = await api(`/repos/${owner}/${name}/pulls?state=open&head=${owner}:${branch}`);
    const pr = open && open.length ? open[0] : null;
    const readme = await getReadme(name, pr ? branch : base);
    if (!readme) {
        console.log(`no README     ${name}`);
        continue;
    }
    const text = applyBrand(decode(readme), name);
    if (text === decode(readme)) {
        console.log(`up to date    ${name}${pr ? `: ${pr.html_url}` : ""}`);
        continue;
    }
    if (outDir) await writeFile(join(outDir, `${name}.md`), text);

    if (!apply) {
        console.log(`would ${pr ? "update" : "open  "}  ${name}: ${pr ? pr.html_url : `PR on ${base}`}`);
    } else if (pr) {
        await putReadme(name, readme, text);
        await api(`/repos/${owner}/${name}/pulls/${pr.number}`, { method: "PATCH", body: JSON.stringify({ title, body: prBody(name) }) });
        console.log(`updated       ${name}: ${pr.html_url}`);
    } else {
        const baseRef = await api(`/repos/${owner}/${name}/git/ref/heads/${base}`);
        const existing = await api(`/repos/${owner}/${name}/git/ref/heads/${encodeURIComponent(branch)}`);
        if (existing) {
            // The branch is left over from an earlier pull request. Reuse it only when everything on
            // it is already in the base branch: moving it forward to the base is then a fast-forward
            // and loses nothing. A branch with unmerged commits is someone's work, so skip the repo.
            const compare = await api(`/repos/${owner}/${name}/compare/${encodeURIComponent(base)}...${encodeURIComponent(branch)}`);
            if (compare.ahead_by > 0) {
                console.log(`skipped       ${name}: branch ${branch} has ${compare.ahead_by} unmerged commit(s) and no open PR`);
                continue;
            }
            await api(`/repos/${owner}/${name}/git/refs/heads/${encodeURIComponent(branch)}`, { method: "PATCH", body: JSON.stringify({ sha: baseRef.object.sha, force: false }) });
        } else {
            await api(`/repos/${owner}/${name}/git/refs`, { method: "POST", body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseRef.object.sha }) });
        }
        await putReadme(name, readme, text);
        const created = await api(`/repos/${owner}/${name}/pulls`, { method: "POST", body: JSON.stringify({ title, head: branch, base, body: prBody(name) }) });
        console.log(`opened        ${name}: ${created.html_url}`);
    }
}
