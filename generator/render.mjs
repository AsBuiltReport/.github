// Renders a README banner for every public AsBuiltReport.* repo, and a tile for each module
// shown on the organisation profile.
//
//   Banners: assets/repo-banners/<repo>.png   (1760 x 480)
//   Tiles:   profile/images/tiles/<repo>.png  (840 x 240)
//
// Usage (from this folder):
//   npm ci && npx playwright install chromium
//   node render.mjs                         every repo
//   node render.mjs --repo AsBuiltReport.Microsoft.Azure --repo AsBuiltReport.Core
//
// GITHUB_TOKEN is used when set, to avoid the unauthenticated API rate limit.
// Only files whose bytes change are written, so a run with no changes leaves git clean.

import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");
const config = JSON.parse(await readFile(join(here, "repos.json"), "utf8"));
const prefix = "AsBuiltReport.";

const sizes = {
    banner: { width: 880, height: 240, folder: "assets/repo-banners" },
    tile: { width: 420, height: 120, folder: "profile/images/tiles" },
};

function parseArgs(argv) {
    const repos = [];
    for (let i = 0; i < argv.length; i++) {
        if (argv[i] === "--repo" && argv[i + 1]) repos.push(...argv[++i].split(",").map((r) => r.trim()).filter(Boolean));
    }
    return { repos };
}

async function listOrgRepos() {
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "asbuiltreport-repo-banners" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const repos = [];
    for (let page = 1; ; page++) {
        const url = `https://api.github.com/orgs/${config.org}/repos?type=public&per_page=100&page=${page}`;
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`GitHub API returned ${response.status} for ${url}`);
        const batch = await response.json();
        repos.push(...batch);
        if (batch.length < 100) break;
    }
    return repos
        .filter((r) => r.name.startsWith(prefix) && !r.archived && !r.fork && !r.private)
        .filter((r) => !config.exclude.includes(r.name))
        .map((r) => r.name)
        .sort();
}

// A module that is not on the PowerShell Gallery gets its GitHub URL instead of an
// Install-Module command, so the banner never shows a command that fails.
async function isOnGallery(repo) {
    const url = `https://www.powershellgallery.com/api/v2/FindPackagesById()?id='${encodeURIComponent(repo)}'`;
    try {
        const response = await fetch(url);
        if (!response.ok) return false;
        return (await response.text()).includes("<entry>");
    } catch {
        return false;
    }
}

async function footerFor(repo) {
    if (config.footers[repo]) return config.footers[repo];
    if (await isOnGallery(repo)) return `PS> Install-Module ${repo}`;
    return `github.com/${config.org}/${repo}`;
}

async function render(page, kind, repo, footer) {
    const { width, height, folder } = sizes[kind];
    const url = pathToFileURL(join(here, "template.html"));
    url.search = new URLSearchParams({ kind, name: repo.slice(prefix.length), footer }).toString();

    await page.setViewportSize({ width, height });
    await page.goto(url.href);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.images].every((img) => img.complete));
    const failures = await page.evaluate(() => window.fitLines());
    if (failures.length) throw new Error(`${repo} ${kind}: text does not fit: ${failures.join(" | ")}`);

    const png = await page.locator(".card").screenshot({ omitBackground: true });
    const target = join(repoRoot, folder, `${repo}.png`);
    if (existsSync(target) && (await readFile(target)).equals(png)) return false;
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, png);
    return true;
}

const { repos: requested } = parseArgs(process.argv.slice(2));
const repos = requested.length ? requested : await listOrgRepos();
console.log(`Rendering ${repos.length} repos`);

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
let changed = 0;
try {
    for (const repo of repos) {
        const footer = await footerFor(repo);
        const results = [await render(page, "banner", repo, footer)];
        if (!config.noTile.includes(repo)) results.push(await render(page, "tile", repo, footer));
        const updated = results.filter(Boolean).length;
        changed += updated;
        console.log(`${updated ? "updated  " : "unchanged"} ${repo}  (${footer})`);
    }
} finally {
    await browser.close();
}
console.log(`${changed} file(s) changed`);
