# Deployment & Hosting (Vercel)

- **Platforma**: Projekt jest hostowany na platformie Vercel. Wszelkie zmiany wypchnięte (git push) na główną gałąź automatycznie uruchamiają proces budowy (build) i publikacji. Z tego powodu **NIE** używaj starych skryptów wdrożeniowych (takich jak `npm run deploy` z pakietem `gh-pages`), chyba że użytkownik wyraźnie o to poprosi.
- **Routing Vercel a Vite**: Aplikacja budowana jest przez Vite jako statyczne pliki HTML (w folderze `dist`). Aby zapewnić poprawne działanie "czystych" linków bez dopisków (np. `kcygan.eu/marketing` zamiast `kcygan.eu/marketing.html`), w pliku `vercel.json` musi bezwzględnie znajdować się wpis `"cleanUrls": true`. Należy brać to pod uwagę przy modyfikowaniu linków wewnątrz aplikacji.

## EasyCart — Linki z automatycznym kodem rabatowym

- Platforma sklepu: **EasyCart (easy.tools)**
- Format linku checkout: `https://cart.easy.tools/checkout/kcygan/[slug-produktu]`
- Aby automatycznie zastosować kod rabatowy przy wejściu na kasę, dodaj `?promo=KOD` na końcu URL — klient nie musi nic wpisywać ręcznie.
  - Przykład: `https://cart.easy.tools/checkout/kcygan/partner-czy-dzieci-jak-nie-zgubic-dwojki-w-rodzinie?promo=BAROMETR`
- Kod rabatowy dla użytkowników Barometru: **BAROMETR** (25% zniżki)
- Linki w barometrze (`barometr/barometr.js`) ZAWSZE powinny zawierać `?promo=BAROMETR` w adresie URL.

## Vite Build — kopiowanie plików ebooków do dist

Po każdym `npm run build` należy ręcznie skopiować pliki statyczne do `dist/ebook/`, ponieważ Vite nie kopiuje automatycznie podfolderów zagnieżdżonych w `public/`:

```bash
cp public/ebook/okladka-*.jpg dist/ebook/
cp public/ebook/ebook-dlaczego-po-latach-partner-zaczy-nas-odpychac.html dist/ebook/
```

Dotyczy to katalogu `public/ebook/` — okładek (`.jpg`) oraz darmowego e-booka (lead magnet). Landingi płatnych e-booków zostały usunięte z projektu. Pliki podglądu HTML zostały usunięte z projektu.
