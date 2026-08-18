# Kingdom Hearts 1FM AP Randomizer Website (Dev)

Staging site for [kh1fmrando.com](https://kh1fmrando.com), served at [dev.kh1fmrando.com](https://dev.kh1fmrando.com) via GitHub Pages. Used to try out content/layout changes before they go live on the main site.

This repo was split out from a `dev/` subfolder of the [main site repo](https://github.com/gaithern/Kingdom-Hearts-1FM-AP-Randomizer-Website) so it could be served on its own subdomain - GitHub Pages only supports one custom domain per repo, so the dev content needed a repo of its own. History was preserved during the split.

## Structure

Same plain static HTML/CSS structure as the main repo: per-world guide pages, `header.html` fetched client-side on every page for shared nav, `style.css` for styling, `images/` for assets.

## Workflow

Push changes here first, verify on `dev.kh1fmrando.com`, then port the changes over to the main repo to publish on `kh1fmrando.com`.
