# XFAIR-MED website

Project website for XFAIR-MED, a research toolkit for auditing fairness across data, models, and explanations in medical AI.

## Website

[Visit the XFAIR-MED project website](https://katsiaryna-bahamazava.github.io/xfair-med-website/).

The website introduces the project, explains its three-layer audit methodology, presents preliminary findings, and links to the Python toolkit and documentation.

## Research software

The [XFAIR-MED toolkit](https://github.com/katsiaryna-bahamazava/xfairmed-toolkit) is maintained separately. Access is currently restricted.

## Hosting and maintenance

This is a static website with no build dependencies. GitHub Pages serves `index.html`, `styles.css`, `app.js`, and `favicon.svg` from the root of the `main` branch. The `.nojekyll` file disables Jekyll processing.

Update the files on `main` to update the site. All asset paths are relative so the site works under a project subdirectory.

## Research scope

Results are preliminary. The semi-synthetic comparison is a known-answer implementation check, not clinical evidence. The linked TCGA study implements partial EXL using ASS and ERS, and reports partial XCFS accordingly. Sources are linked beside the relevant content.
