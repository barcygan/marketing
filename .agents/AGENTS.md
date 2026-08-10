# Deployment & Hosting (Vercel)

- **Platforma**: Projekt jest hostowany na platformie Vercel. Wszelkie zmiany wypchnięte (git push) na główną gałąź automatycznie uruchamiają proces budowy (build) i publikacji. Z tego powodu **NIE** używaj starych skryptów wdrożeniowych (takich jak `npm run deploy` z pakietem `gh-pages`), chyba że użytkownik wyraźnie o to poprosi.
- **Routing Vercel a Vite**: Aplikacja budowana jest przez Vite jako statyczne pliki HTML (w folderze `dist`). Aby zapewnić poprawne działanie "czystych" linków bez dopisków (np. `kcygan.eu/marketing` zamiast `kcygan.eu/marketing.html`), w pliku `vercel.json` musi bezwzględnie znajdować się wpis `"cleanUrls": true`. Należy brać to pod uwagę przy modyfikowaniu linków wewnątrz aplikacji.
