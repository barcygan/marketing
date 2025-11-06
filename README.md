# NovaGrowth Blocks – designerski minimalizm

Repozytorium zawiera lekki, modularny landing page agencji marketingowej w układzie **block layout**.
Kolorystyka: biało–szaro–niebieska. Motyw gór w tle hero.

## Struktura
- `index.html` – strona główna
- `style.css` – style (Inter, layout blokowy, animacje reveal)
- `assets/` – logo i ikony SVG + tło gór

## Jak uruchomić lokalnie
1. Otwórz `index.html` w przeglądarce – działa bez serwera.
2. (Opcjonalnie) serwer lokalny:
   ```bash
   python3 -m http.server 8000
   # http://localhost:8000
   ```

## GitHub Pages
1. Wgraj pliki do repo **barcygan/marketing** (zastąp stare).
2. Upewnij się, że w `Settings → Pages` masz: Source: *Deploy from a branch*, Branch: `main`, Folder: `/ (root)`.
3. Strona: https://barcygan.github.io/marketing/

## SEO
- Metadane (title, description)
- Sekcje z frazami: strategia marketingowa, SEO, kampanie digital, analityka danych
- Szybkie ładowanie (brak frameworków, wektory SVG)