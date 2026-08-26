const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === 'dist' || file === 'reports' || file.startsWith('.')) continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const projectDir = path.resolve(__dirname, '..');
const htmlFiles = findHtmlFiles(projectDir);

// Old consent block (both old and after fix variants)
const oldConsentBlockRegex = /\s*<!--\s*Google Consent Mode v2\s*-->[\s\S]*?<\/script>\s*\n?\s*<script defer src="\/consent\.js"><\/script>\s*\n?\s*\n?\s*<!--\s*Google tag[\s\S]*?<\/script>/;

// New fixed consent block: synchronous localStorage read happens BEFORE gtag/js async load
const newConsentBlock = `
    <!-- Google Consent Mode v2 — must be first, before GA4 loads -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}

      // 1. Set safe defaults (all denied)
      gtag('consent', 'default', {
        'ad_storage':          'denied',
        'ad_user_data':        'denied',
        'ad_personalization':  'denied',
        'analytics_storage':   'denied',
        'wait_for_update':     500
      });

      // 2. Restore previously saved consent SYNCHRONOUSLY before GA4 loads
      (function() {
        try {
          var saved = JSON.parse(localStorage.getItem('kcygan_consent'));
          if (saved !== null) {
            gtag('consent', 'update', {
              'analytics_storage':  saved.analytics ? 'granted' : 'denied',
              'ad_storage':         'denied',
              'ad_user_data':       'denied',
              'ad_personalization': 'denied'
            });
          }
        } catch(e) {}
      })();
    </script>
    <script defer src="/consent.js"></script>

    <!-- Google tag (gtag.js) — loads after consent defaults are set -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TEXVN0KVB9"></script>
    <script>
      gtag('js', new Date());
      gtag('config', 'G-TEXVN0KVB9');
    </script>`;

let updatedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('G-TEXVN0KVB9')) {
        console.log(`Pominięto (brak GA4): ${file}`);
        continue;
    }

    if (content.includes('wait_for_update')) {
        console.log(`Pominięto (już zaktualizowany): ${file}`);
        continue;
    }

    if (oldConsentBlockRegex.test(content)) {
        content = content.replace(oldConsentBlockRegex, newConsentBlock);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Zaktualizowano: ${file}`);
        updatedCount++;
    } else {
        console.log(`UWAGA – nie dopasowano: ${file}`);
    }
}

console.log(`\nZakończono. Zaktualizowano ${updatedCount} plików.`);
