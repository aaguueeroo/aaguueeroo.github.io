# Chotos landing page

## Copy and design
Audience: Spanish-speaking cattle farmers with little confidence using technology.
Lead: “Las vacas de tu explotación, siempre a mano.” Explain familiar tasks in short sentences, using vaca, crotal, cubrición and cría. Do not promise offline use, reminders, a release date, pricing or public downloads.
Funnel: familiar benefit → visible app preview → three useful tasks → simple start → practical questions → email invitation to testing.
Visual direction: Tierra cream, forest green, Bitter headings and Atkinson Hyperlegible text; generous type and large controls. Desktop splits copy and phone preview; mobile stacks in reading order. Native disclosure questions, no animation needed.
Screens are existing design mockups, labelled as such. All assets and fonts are local.

## Approach and implementation
Choose standalone static HTML at public/chotos/index.html with scoped stylesheet and local assets. This is lighter than a React page for a static landing and remains available without JavaScript. The existing Vite build copies it unchanged, alongside the privacy route. Keep the portfolio homepage intact. No new hosting provider or signup backend required.

1. Write semantic Spanish copy in public/chotos/index.html; primary CTA goes to the confirmed chotos@juliaaguero.com with an encoded subject and body. Explain that sending email requests participation; never claim automatic registration.
2. Style in public/chotos/landing.css, reusing the app fonts and existing mockups. Responsive one-column mobile and split desktop; readable focus, reduced motion, 48px controls.
3. Verify all relative assets, headings and links; build the existing site; inspect desktop and mobile and verify native FAQ and email links. Review changes and check privacy route preservation.
4. Commit a feature branch, push and merge into master, then verify the existing GitHub Pages deployment and live page.

## Review focus
Mail intent must be explicit. No unsupported product claims. The static file must survive the build and be reachable at /chotos and /chotos/. Mockups must not masquerade as current production screenshots. No external form submission or tracking added.

User requested autonomous execution and explicitly authorized pushing, merging and publication.
