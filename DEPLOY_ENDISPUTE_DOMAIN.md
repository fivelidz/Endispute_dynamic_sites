# Deploying the finalised Endispute site to its own domain (Cloudflare Pages)

The finalised candidate is **`site-2-courtroom-v3`** (Courtroom direction,
Spotlight scroll). It's a Next.js 15 static export — the build output in
`site-2-courtroom-v3/out/` is plain HTML/CSS/JS that drops onto any static host.
These notes cover putting it on the real Endispute domain via **Cloudflare
Pages** (same platform qalarc.com runs on).

> Heads-up: the version currently on `qalarc.com/projects/demos/endispute-sites/`
> is a **review copy** served from a sub-path (its asset paths are rewritten for
> that sub-path). For the real domain you deploy the **original `out/` build**
> from this repo — which uses normal root-relative paths and needs no rewriting.

---

## Build the site

```bash
cd site-2-courtroom-v3
bun install
bun run build          # → static export in ./out/
```

`out/` is the full deployable site. (It's also committed to this repo, so you can
deploy without building if you prefer.)

---

## Option A — Cloudflare Pages via the dashboard (no GitHub, fastest)

Direct upload of the `out/` folder. Good for a one-off / first launch.

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Upload assets**.
2. Project name: e.g. `endispute`.
3. Drag in the contents of `site-2-courtroom-v3/out/` (the files, not the folder).
4. Deploy. You get a `endispute.pages.dev` preview URL — open it and confirm.
5. **Custom domain:** project → **Custom domains → Set up a domain** →
   enter the Endispute domain (e.g. `endispute.com.au` and `www.endispute.com.au`).
   - If the domain's DNS is already on Cloudflare, it adds the records itself.
   - If not, move the domain's nameservers to Cloudflare first (Add a Site →
     follow the nameserver instructions at the registrar), then add the custom
     domain.
6. Cloudflare auto-provisions SSL. Done.

To update later, repeat the upload with a fresh `out/`.

---

## Option B — Cloudflare Pages connected to GitHub (auto-deploy on push)

Best for ongoing content edits — every push rebuilds and deploys.

1. Push this repo to GitHub (already at
   `github.com/fivelidz/Endispute_dynamic_sites`).
2. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → pick the
   repo.
3. Build settings:
   - **Framework preset:** Next.js (Static HTML Export) — or "None".
   - **Root directory:** `site-2-courtroom-v3`
   - **Build command:** `bun run build`  *(or `npm install && npm run build` if
     Cloudflare's bun support is unavailable — the project also works with npm)*
   - **Build output directory:** `out`
4. Save & deploy. Then attach the custom domain as in Option A, step 5.

> Note: this repo holds multiple sites. Setting **Root directory =
> `site-2-courtroom-v3`** is what makes Cloudflare build only the finalised site.

---

## DNS records (what ends up at the registrar / Cloudflare DNS)

When you add the custom domain in Pages, Cloudflare creates these for you. For
reference, an apex + www setup looks like:

| Type  | Name              | Target                       | Proxy |
|-------|-------------------|------------------------------|-------|
| CNAME | `endispute.com.au`| `endispute.pages.dev`        | ✅    |
| CNAME | `www`             | `endispute.pages.dev`        | ✅    |

(Cloudflare flattens the apex CNAME automatically.) Add a redirect rule if you
want `www` → apex (or vice-versa).

---

## Post-launch checklist

- [ ] Open the live domain on desktop **and** phone — confirm hero, the
      Spotlight process section, the Tania Sourdin portrait, and the
      "range of processes" matrix all render.
- [ ] Update the hard-coded canonical/OG URL in
      `site-2-courtroom-v3/src/app/layout.tsx` (currently
      `https://endispute.com.au`) if the final domain differs, then rebuild.
- [ ] Point the contact form / enquiry CTA at the real destination
      (see `Contact.tsx`) — currently it's a front-end form.
- [ ] Add a `robots.txt` / `sitemap.xml` if SEO matters for launch.
- [ ] Confirm SSL is active (Cloudflare does this automatically; can take a few
      minutes).

---

## Where things live

- Source: `site-2-courtroom-v3/src/`
- Shared copy (single source of truth): `site-2-courtroom-v3/src/lib/content.ts`
- Built static site: `site-2-courtroom-v3/out/`
- Images: `site-2-courtroom-v3/public/` (Logo, Tania portrait, range diagram)
