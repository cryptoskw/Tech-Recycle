# TechRecycle GitHub Pages Setup

This package is rebuilt for GitHub Pages.

## Upload method

Upload the contents of this folder to the root of your GitHub repository, so `index.html`, `CNAME`, `.nojekyll`, `assets/`, `partials/`, and all page folders are at the top level of the repository.

Do not upload this folder itself as a nested folder. The repository root must contain `index.html`.

## Important GitHub Pages changes

- `.htaccess` was removed because GitHub Pages does not run Apache rewrite rules.
- `send-contact.php` was removed because GitHub Pages does not run PHP.
- `.nojekyll` was added so GitHub serves the static assets directly.
- `CNAME` was added for `techrecycle.co.za`.
- Forms now use a static-form endpoint. Submit the form once after publishing and confirm the email verification request sent to `info@techrecycle.co.za`.
- Internal assets and partial includes were rebuilt to work from folder URLs on GitHub Pages.

## Pages settings

In GitHub:

1. Go to the repository.
2. Open Settings → Pages.
3. Source: deploy from branch.
4. Branch: `main` or `master`, folder `/root`.
5. Custom domain: `techrecycle.co.za`.
6. Enable HTTPS after GitHub allows it.

## DNS reminder

Point the domain to GitHub Pages using GitHub's current DNS instructions. Keep email records separate so mail still works.
