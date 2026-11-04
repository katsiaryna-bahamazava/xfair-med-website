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

## Funding and acknowledgements

XFAIR-MED is a Marie Skłodowska-Curie Postdoctoral Fellowship (May 2026 – May 2028) within the ROSETTA fellowship programme, hosted at the University of Limerick and coordinated by Lero, the Research Ireland Centre for Software.

| Funder | Programme | Grant |
|---|---|---|
| European Union | Marie Skłodowska-Curie Actions (COFUND, ROSETTA) | Grant Agreement No. 101126578 |
| Taighde Éireann – Research Ireland | Lero, the Research Ireland Centre for Software | Grant No. 13/RC/2094_2 |

**Acknowledgement statement:** This research has emanated from work jointly funded by Taighde Éireann – Research Ireland under Grant No. 13/RC/2094_2 and the European Union’s Marie Skłodowska-Curie Actions under Grant Agreement No. 101126578 (ROSETTA), and was supported in part by the University of Galway.

Co-funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Research Executive Agency. Neither the European Union nor the granting authority can be held responsible for them.
