// Pure functions that apply the AsBuiltReport brand to a module README:
//   addBanner        the repo banner in place of the old organisation logo
//   addSectionIcons  section icons in place of the emoji on known section headings
//   recolourBadges   shields.io badges in the brand palette
//   replaceHighlightSwatches  central health check highlight swatches in place of placeholder services
// readme-banners.mjs uses these to open pull requests. readme-brand.test.mjs tests them.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config, here } from "./repos.mjs";

const { icons } = JSON.parse(readFileSync(join(here, "section-icons.json"), "utf8"));
const assetBase = `https://raw.githubusercontent.com/${config.org}/.github/main/assets`;

const eolOf = (text) => (text.includes("\r\n") ? "\r\n" : "\n");

// ---------- Banner ----------

export function bannerBlock(repo, eol = "\n") {
    return [
        '<p align="center">',
        '    <a href="https://www.asbuiltreport.com/">',
        `        <img src="${assetBase}/repo-banners/${repo}.png" alt="${repo}" width="880"></a>`,
        "</p>",
    ].join(eol);
}

// The old logo is a centred paragraph holding the organisation avatar or AsBuiltReport.png.
const logoBlock = /<p align="center">\s*<a href="https:\/\/www\.asbuiltreport\.com\/?"[^>]*>(?:\s*<\/a>)?\s*<img src=['"](?:https:\/\/github\.com\/AsBuiltReport\.png|https:\/\/avatars\.githubusercontent\.com\/u\/42958564[^'"]*|[^'"]*\/AsBuiltReport\.png)['"][^>]*>\s*(?:<\/a>)?\s*<\/p>/;

export function addBanner(readme, repo) {
    if (readme.includes("/assets/repo-banners/")) return readme;
    const block = bannerBlock(repo, eolOf(readme));
    if (logoBlock.test(readme)) return readme.replace(logoBlock, block);

    // No logo: put the banner first, after the "DO NOT EDIT" comment if the README has one.
    const comment = readme.match(/^<!--[^\n]*DO NOT EDIT[^\n]*-->\r?\n/);
    const head = comment ? comment[0] : "";
    return head + block + eolOf(readme) + readme.slice(head.length);
}

// ---------- Section icons ----------

// A GitHub :shortcode: or a run of Unicode emoji (with variation selectors and joiners).
const emoji = String.raw`(?::[a-z0-9_+-]+:|(?:\p{Extended_Pictographic}|\p{Regional_Indicator})(?:️|‍|\p{Extended_Pictographic})*)`;
const leadingEmoji = new RegExp(String.raw`^(?:${emoji}\s*)+`, "u");
const trailingEmoji = new RegExp(String.raw`(?:\s*${emoji})+$`, "u");
const iconSizes = { 1: 28, 2: 24, 3: 20, 4: 16 };

const normalise = (text) => text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim().toLowerCase();
const iconByHeading = new Map(icons.flatMap((icon) => icon.headings.map((h) => [normalise(h), icon])));

export function sectionIcon(icon, level) {
    const size = iconSizes[level];
    return `<img src="${assetBase}/section-icons/${icon.name}.svg" alt="" width="${size}" height="${size}" align="top">`;
}

export function addSectionIcons(readme) {
    const eol = eolOf(readme);
    let fence = null;
    return readme.split(/\r?\n/).map((line) => {
        // Skip fenced code blocks, where "# ..." lines are comments, not headings.
        const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
        if (fenceMatch) {
            if (!fence) fence = fenceMatch[1][0];
            else if (fenceMatch[1][0] === fence) fence = null;
            return line;
        }
        if (fence) return line;

        const heading = line.match(/^(#{1,4})\s+(.*?)\s*$/);
        if (!heading || heading[2].includes("/assets/section-icons/")) return line;
        const hadEmoji = leadingEmoji.test(heading[2]);
        const text = heading[2].replace(leadingEmoji, "").replace(trailingEmoji, "").trim();
        const icon = iconByHeading.get(normalise(text));
        // Headings without an emoji only get an icon down to level 3, so deep sub-headings stay plain.
        if (!icon || (!hadEmoji && heading[1].length > 3)) return line;
        return `${heading[1]} ${sectionIcon(icon, heading[1].length)} ${text}`;
    }).join(eol);
}

// ---------- Badges ----------

// Brand palette for shields.io badges: link blue for versions, console blue for counts,
// highlighter for compatibility. Shields picks dark text on the highlighter automatically.
const badgeColours = [
    { pattern: /img\.shields\.io\/powershellgallery\/v\//, colour: "1F5FD0" },
    { pattern: /img\.shields\.io\/github\/v\/release\//, colour: "1F5FD0" },
    { pattern: /img\.shields\.io\/powershellgallery\/dt\//, colour: "012456" },
    { pattern: /img\.shields\.io\/github\/contributors\//, colour: "012456" },
    { pattern: /img\.shields\.io\/github\/stars\//, colour: "012456" },
    { pattern: /img\.shields\.io\/powershellgallery\/p\//, colour: "FFD02B" },
];

export function recolourBadge(url) {
    const rule = badgeColours.find((r) => r.pattern.test(url));
    if (!rule) return url;
    const [path, query = ""] = url.split("?");
    const params = query.split("&").filter((p) => p && !/^colou?r=/i.test(p));
    return `${path}?${[`color=${rule.colour}`, ...params].join("&")}`;
}

export function recolourBadges(readme) {
    return readme.replace(/https:\/\/img\.shields\.io\/[^\s"'()<>]+/g, recolourBadge);
}

// ---------- Highlight swatches ----------

// HealthCheck tables show each highlight colour as a small image from a third-party placeholder
// service, which often breaks. These are replaced with the central swatches. The colour comes from
// the repo's report style (highlight-swatches.json), not the old link, because some READMEs show
// colours copied from another module's style.
const { styles } = JSON.parse(readFileSync(join(here, "highlight-swatches.json"), "utf8"));
const placeholderImage = /!\[([^\]]*)\]\((https?:\/\/(?:placehold\.co|place-hold\.it|via\.placeholder\.com|dummyimage\.com)\/[^)\s]*)\)/g;
const styleLabels = { critical: "Critical", citical: "Critical", warning: "Warning", info: "Info", ok: "OK" };

export function swatchUrl(hex) {
    return `${assetBase}/highlight-swatches/${hex}.svg`;
}

export function replaceHighlightSwatches(readme, repo) {
    const colours = (styles[repo] || styles.default).colours;
    const known = new Set(Object.values(styles).flatMap((s) => Object.values(s.colours)));
    return readme.replace(placeholderImage, (match, alt, url) => {
        const label = styleLabels[alt.trim().toLowerCase()];
        if (label && colours[label]) return `![${label}](${swatchUrl(colours[label])})`;
        // Unknown style name: keep the link's own colour when there is a swatch for it.
        const hex = (url.match(/(?<![0-9A-Fa-f])[0-9A-Fa-f]{6}(?![0-9A-Fa-f])/) || [""])[0].toUpperCase();
        return known.has(hex) ? `![${alt}](${swatchUrl(hex)})` : match;
    });
}

// Placeholder images that replaceHighlightSwatches could not map, for the dry run to report.
export function unmappedPlaceholders(readme) {
    return [...readme.matchAll(placeholderImage)].map((m) => m[0]);
}

export function applyBrand(readme, repo) {
    return replaceHighlightSwatches(recolourBadges(addSectionIcons(addBanner(readme, repo))), repo);
}
