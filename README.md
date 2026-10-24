## Static assets

Images and video are plain files served by the host, with no Lovable-specific hosting:

- `public/images/` holds the Instagram images (`ig1.jpg` to `ig6.jpg`) and `logo.png`.
- `public/video/` holds the hero video (`hero.mp4`).
- Paths are defined once in `media` in `src/lib/products.ts` and used as root-relative URLs
  (for example `/images/ig1.jpg`).
- The four `look-*.jpg` files in `src/assets/` are imported through Vite, which bundles and
  fingerprints them.

File names are case-sensitive on Vercel. `npm run check:assets` verifies that every local media
reference resolves, and `npm run build` runs it first. See `MISSING_ASSETS.md` for the files that
still need to be added.
