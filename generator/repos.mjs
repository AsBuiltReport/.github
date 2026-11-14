// Shared by render.mjs and readme-banners.mjs: the generator config and the list of repos.

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const here = dirname(fileURLToPath(import.meta.url));
export const config = JSON.parse(await readFile(join(here, "repos.json"), "utf8"));
export const prefix = "AsBuiltReport.";

export function githubHeaders() {
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "asbuiltreport-repo-banners" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    return headers;
}

// Public, unarchived, non-fork AsBuiltReport.* repos, minus the exclusions in repos.json.
// Returns the full API objects, so callers can read default_branch.
export async function listOrgRepos() {
    const repos = [];
    for (let page = 1; ; page++) {
        const url = `https://api.github.com/orgs/${config.org}/repos?type=public&per_page=100&page=${page}`;
        const response = await fetch(url, { headers: githubHeaders() });
        if (!response.ok) throw new Error(`GitHub API returned ${response.status} for ${url}`);
        const batch = await response.json();
        repos.push(...batch);
        if (batch.length < 100) break;
    }
    return repos
        .filter((r) => r.name.startsWith(prefix) && !r.archived && !r.fork && !r.private)
        .filter((r) => !config.exclude.includes(r.name))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function parseRepoArgs(argv) {
    const repos = [];
    for (let i = 0; i < argv.length; i++) {
        if (argv[i] === "--repo" && argv[i + 1]) repos.push(...argv[++i].split(",").map((r) => r.trim()).filter(Boolean));
    }
    return repos;
}
