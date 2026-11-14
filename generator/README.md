# Brand asset generator

Renders the brand images for AsBuiltReport repos: a README banner for every public `AsBuiltReport.*` repo and the module tiles on the organisation profile, from one HTML template, and the section icon pack used on README headings.

| Output | Size | Path |
|---|---|---|
| README banner | 1760 x 480 | `assets/repo-banners/<repo>.png` |
| Profile tile | 840 x 240 | `profile/images/tiles/<repo>.png` |
| README section icon | 32 x 32 SVG, 96 x 96 PNG | `assets/section-icons/<name>.svg`, `.png` |

The [Repo banners](../.github/workflows/repo-banners.yml) workflow runs daily, on pushes to `generator/`, and by hand. It commits only the images that changed. After creating a new repo, run the workflow by hand so its banner exists straight away.

## Banner text

- Line 2 is the repo name without the `AsBuiltReport.` prefix.
- Line 3 is `PS> Install-Module <repo>` when the module is on the PowerShell Gallery, and the GitHub URL when it is not, so a banner never shows a command that fails.
- `repos.json` sets the exceptions: repos to skip, repos without a tile, and fixed line 3 text (the website shows `www.asbuiltreport.com`).

## Section icons

Section headings in module READMEs use icons in place of emoji, in the style of the feature icons on [www.asbuiltreport.com](https://www.asbuiltreport.com): an [Octicons](https://primer.style/octicons/) glyph in console blue on a highlighter yellow tile. `section-icons.json` lists each icon, its Octicon and the heading texts it is used for. `section-icons.mjs` renders them, with a catalogue at [`assets/section-icons`](../assets/section-icons). To add an icon, add an entry to `section-icons.json`.

## Using a banner in a README

```html
<p align="center">
    <a href="https://www.asbuiltreport.com/">
        <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/assets/repo-banners/AsBuiltReport.Microsoft.Azure.png" alt="AsBuiltReport.Microsoft.Azure" width="880">
    </a>
</p>
```

New modules get this from the [Plaster template](https://github.com/AsBuiltReport/AsBuiltReport.Plaster.Template).

## Applying the brand to existing READMEs

`readme-prs.mjs` opens a pull request in each repo that applies the brand to its README, using the functions in `readme-brand.mjs`:

- the banner in place of the old logo at the top (or at the top when there is no logo)
- section icons in place of the emoji on known section headings, sized to the heading level (headings inside code blocks are left alone)
- badges in the brand palette: link blue `#1F5FD0` for versions, console blue `#012456` for counts (downloads, contributors), highlighter `#FFD02B` for compatibility (platform)

Where the pull request is already open, it commits to that branch instead. It skips READMEs that already have every change. It is a dry run unless you pass `--apply`:

```sh
GITHUB_TOKEN=$(gh auth token) node readme-prs.mjs --out ./preview   # dry run, writes the new READMEs to ./preview
GITHUB_TOKEN=$(gh auth token) node readme-prs.mjs --apply           # opens or updates the pull requests
```

`readme-brand.test.mjs` tests these changes (`node --test`). Set `README_DIR` to a folder of downloaded READMEs to also check that nothing else in them changes.

## Running it locally

Needs Node.js 22 or later.

```sh
cd generator
npm ci
npx playwright install chromium
node render.mjs                                      # every repo
node render.mjs --repo AsBuiltReport.Microsoft.Azure # one repo
node section-icons.mjs                               # the section icon pack
node --test                                          # tests
```

To preview a layout change, open `template.html` in a browser with a query string, for example `template.html?kind=banner&name=Microsoft.Azure`. Local renders on Windows or macOS differ slightly from the Linux runner, so let the workflow produce the committed images.

## Fonts and icons

Archivo and Cascadia Code are copied from the project website and used under the SIL Open Font License (see `fonts/`). Octicons are by GitHub, used under the MIT License.
