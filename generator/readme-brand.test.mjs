// Tests for readme-brand.mjs: the banner, section icon, badge and highlight swatch changes made to module READMEs.
// Nothing is stubbed: the functions are pure and read only section-icons.json, highlight-swatches.json and repos.json.
// Run from this folder: node --test
// To check against the live READMEs as well, set README_DIR to a folder of downloaded README files.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { addBanner, addSectionIcons, recolourBadge, recolourBadges, replaceHighlightSwatches, unmappedPlaceholders, swatchUrl, removeTitleHeading, removeFollowBadge, applyBrand } from "./readme-brand.mjs";

const icon = (name, size) => `<img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/assets/section-icons/${name}.svg" alt="" width="${size}" height="${size}" align="top">`;

test("replaces the emoji on known section headings, sized to the heading level", () => {
    const input = "# :beginner: Getting Started\n## :package: Module Installation\n### :closed_lock_with_key: Required Privileges";
    const expected = `# ${icon("getting-started", 28)} Getting Started\n## ${icon("module-installation", 24)} Module Installation\n### ${icon("required-privileges", 20)} Required Privileges`;
    assert.equal(addSectionIcons(input), expected);
});

test("handles Unicode emoji, including variation selectors", () => {
    assert.equal(addSectionIcons("## 🗺️ Language Support"), `## ${icon("language-support", 24)} Language Support`);
    assert.equal(addSectionIcons("## 🌐 Language Support"), `## ${icon("language-support", 24)} Language Support`);
});

test("maps every Known Issues emoji variant to the same icon", () => {
    for (const e of [":x:", ":bug:", ":exclamation:", ":rotating_light:"]) {
        assert.equal(addSectionIcons(`## ${e} Known Issues`), `## ${icon("known-issues", 24)} Known Issues`);
    }
});

test("drops a trailing emoji and keeps the heading text as written", () => {
    const input = "## :exclamation: THIS ASBUILTREPORT MODULE IS CURRENTLY IN DEVELOPMENT AND MIGHT NOT YET BE FUNCTIONAL ❗";
    assert.equal(addSectionIcons(input), `## ${icon("in-development", 24)} THIS ASBUILTREPORT MODULE IS CURRENTLY IN DEVELOPMENT AND MIGHT NOT YET BE FUNCTIONAL`);
});

test("leaves headings inside fenced code blocks alone", () => {
    const input = "```powershell\n# Examples\nInstall-Module Foo\n```\n## :computer: Examples";
    assert.equal(addSectionIcons(input), `\`\`\`powershell\n# Examples\nInstall-Module Foo\n\`\`\`\n## ${icon("examples", 24)} Examples`);
});

test("leaves unknown headings, and deep headings without an emoji, alone", () => {
    const input = "### Report\n## :tada: Something Else\n#### Configuration";
    assert.equal(addSectionIcons(input), input);
});

test("is idempotent and keeps CRLF line endings", () => {
    const once = addSectionIcons("# :beginner: Getting Started\r\nText\r\n");
    assert.equal(addSectionIcons(once), once);
    assert.ok(!once.replace(/\r\n/g, "").includes("\n"));
});

test("recolours badges by kind and leaves others alone", () => {
    assert.equal(recolourBadge("https://img.shields.io/powershellgallery/v/AsBuiltReport.Core.svg"), "https://img.shields.io/powershellgallery/v/AsBuiltReport.Core.svg?color=1F5FD0");
    assert.equal(recolourBadge("https://img.shields.io/powershellgallery/dt/AsBuiltReport.Core.svg"), "https://img.shields.io/powershellgallery/dt/AsBuiltReport.Core.svg?color=012456");
    assert.equal(recolourBadge("https://img.shields.io/github/contributors/AsBuiltReport/AsBuiltReport.Core.svg"), "https://img.shields.io/github/contributors/AsBuiltReport/AsBuiltReport.Core.svg?color=012456");
    assert.equal(recolourBadge("https://img.shields.io/powershellgallery/p/AsBuiltReport.Core.svg"), "https://img.shields.io/powershellgallery/p/AsBuiltReport.Core.svg?color=FFD02B");
    const licence = "https://img.shields.io/github/license/AsBuiltReport/AsBuiltReport.Core.svg";
    assert.equal(recolourBadge(licence), licence);
});

test("replaces an existing colour and keeps other query parameters", () => {
    assert.equal(recolourBadge("https://img.shields.io/powershellgallery/v/X?style=flat&color=red"), "https://img.shields.io/powershellgallery/v/X?color=1F5FD0&style=flat");
    assert.equal(recolourBadges('<img src="https://img.shields.io/powershellgallery/v/X.svg" />'), '<img src="https://img.shields.io/powershellgallery/v/X.svg?color=1F5FD0" />');
});

test("replaces placeholder services with the central swatch for the repo's style", () => {
    const row = "| ![Warning](https://placehold.co/15x15/FFF4C7/FFF4C7) Unknown<br> ![Critical](https://place-hold.it/15/FEDDD7/FEDDD7.png) Offline |";
    assert.equal(replaceHighlightSwatches(row, "AsBuiltReport.VMware.vSphere"), `| ![Warning](${swatchUrl("FFF4C7")}) Unknown<br> ![Critical](${swatchUrl("FEDDD7")}) Offline |`);
});

// VMware.ESXi showed PureStorage's colours and Azure an Info colour from no style. Both reports use the Core style.
test("uses the report style's colour, not the colour in the old link", () => {
    assert.equal(replaceHighlightSwatches("![Warning](https://place-hold.it/15/FFE860/FFE860.png)", "AsBuiltReport.VMware.ESXi"), `![Warning](${swatchUrl("FFF4C7")})`);
    assert.equal(replaceHighlightSwatches("![Info](https://placehold.co/15x15/D4E4F7/D4E4F7)", "AsBuiltReport.Microsoft.Azure"), `![Info](${swatchUrl("E3F5FC")})`);
});

test("uses a module's own style where it has one", () => {
    assert.equal(replaceHighlightSwatches("![Warning](https://via.placeholder.com/15/FFBC0B/FFBC0B.png)", "AsBuiltReport.Nutanix.PrismElement"), `![Warning](${swatchUrl("FFBC0B")})`);
});

test("corrects the Citical alt text typo", () => {
    assert.equal(replaceHighlightSwatches("![Citical](https://placehold.co/15x15/FEDDD7/FEDDD7)", "AsBuiltReport.Microsoft.Azure"), `![Critical](${swatchUrl("FEDDD7")})`);
});

test("leaves a placeholder alone when neither the style name nor the colour is known", () => {
    const unknown = "![Odd](https://placehold.co/15x15/123456/123456)";
    assert.equal(replaceHighlightSwatches(unknown, "AsBuiltReport.Core"), unknown);
    assert.deepEqual(unmappedPlaceholders(unknown), [unknown]);
});

test("removes the title heading and the blank line after it", () => {
    const readme = "</p>\n<!-- ********** DO NOT EDIT THESE LINKS ********** -->\n\n# VMware vSphere As Built Report\n\nVMware vSphere As Built Report is a PowerShell module";
    assert.equal(removeTitleHeading(readme), "</p>\n<!-- ********** DO NOT EDIT THESE LINKS ********** -->\n\nVMware vSphere As Built Report is a PowerShell module");
    assert.equal(removeTitleHeading("# AsBuiltReport.Core\r\n\r\nText\r\n"), "Text\r\n");
});

// Microsoft.Azure has no title: its first heading is Getting Started, which must stay.
test("keeps the first heading when it is a known section or not level 1", () => {
    const azure = "Intro\n\n# :beginner: Getting Started\n\nText";
    assert.equal(removeTitleHeading(azure), azure);
    const iconed = `# ${icon("getting-started", 28)} Getting Started`;
    assert.equal(removeTitleHeading(iconed), iconed);
    const late = "## :wrench: System Requirements\n# Later Heading";
    assert.equal(removeTitleHeading(late), late);
});

// Microsoft.AD, Microsoft.SCVMM, Veeam.VB365 and Veeam.VBR put a "community maintained" notice above the title.
test("skips lower level headings above the title", () => {
    const readme = "#### This project is community maintained\n\n# Microsoft AD As Built Report\n\nText\n\n# :books: Sample Reports";
    assert.equal(removeTitleHeading(readme), "#### This project is community maintained\n\nText\n\n# :books: Sample Reports");
});

test("ignores # lines in code blocks when finding the title", () => {
    const readme = "```powershell\n# Install\n```\n# Rubrik CDM As Built Report\n\nText";
    assert.equal(removeTitleHeading(readme), "```powershell\n# Install\n```\nText");
});

test("removes the follow @AsBuiltReport badge paragraph only", () => {
    const badge = '<p align="center">\n    <a href="https://twitter.com/AsBuiltReport" alt="Twitter">\n            <img src="https://img.shields.io/twitter/follow/AsBuiltReport.svg?style=social"/></a>\n</p>\n';
    assert.equal(removeFollowBadge(`</p>\n${badge}<!-- comment -->`), "</p>\n<!-- comment -->");
    const other = badge.replace(/AsBuiltReport/g, "rebelinux");
    assert.equal(removeFollowBadge(other), other);
});

test("adds the banner once", () => {
    const readme = "<p align=\"center\">\n    <a href=\"https://www.asbuiltreport.com/\" alt=\"AsBuiltReport\"></a>\n            <img src='https://github.com/AsBuiltReport.png' width=\"8%\" height=\"8%\" /></a>\n</p>\nText";
    const once = addBanner(readme, "AsBuiltReport.Core");
    assert.match(once, /repo-banners\/AsBuiltReport\.Core\.png/);
    assert.equal(addBanner(once, "AsBuiltReport.Core"), once);
});

// Runs the full change over real READMEs: every emoji section heading gets an icon,
// nothing outside headings, badge URLs and the logo block changes, and a second run changes nothing.
const readmeDir = process.env.README_DIR;
if (readmeDir) {
    for (const file of readdirSync(readmeDir).filter((f) => f.endsWith(".md"))) {
        test(`real README: ${file}`, () => {
            const repo = file.replace(/\.md$/, "");
            const before = readFileSync(join(readmeDir, file), "utf8");
            const after = applyBrand(before, repo);
            assert.equal(applyBrand(after, repo), after, "second run changes nothing");
            assert.deepEqual(unmappedPlaceholders(after), [], "no placeholder images left");
            assert.ok(!/(?:twitter|x)\.com\/AsBuiltReport\b/i.test(after), "no follow @AsBuiltReport badge left");
            assert.equal(removeTitleHeading(after), after, "no title heading left");
            const lines = (t) => t.split(/\r?\n/);
            const changed = lines(after).filter((l, i, all) => !lines(before).includes(l));
            for (const line of changed) {
                assert.ok(/section-icons\/|highlight-swatches\/|img\.shields\.io|repo-banners\/|^<p align="center">$|^\s*<a href="https:\/\/www\.asbuiltreport\.com\/">$|^<\/p>$/.test(line), `unexpected change: ${line}`);
            }
        });
    }
}
