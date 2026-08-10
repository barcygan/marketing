const fs = require('fs');
const path = require('path');

const snippet = `
    <!-- Google Consent Mode v2 -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    </script>
    <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="248184b3-7db5-4faf-bdd0-2deacecb88fd" data-blockingmode="auto" type="text/javascript"></script>
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TEXVN0KVB9"></script>
    <script>
      gtag('js', new Date());
      gtag('config', 'G-TEXVN0KVB9');
    </script>`;

function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === 'dist' || file === 'reports') continue;
        
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const htmlFiles = findHtmlFiles(__dirname);
console.log(`Znaleziono ${htmlFiles.length} plików HTML.`);

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('G-TEXVN0KVB9')) {
        console.log(`Pominięto: ${file} (już posiada kod)`);
        continue;
    }
    
    // Szukamy tagu <meta charset="UTF-8"> (lub <head>) żeby wkleić po nim
    const regex = /<meta\s+charset="UTF-8"\s*\/?>/i;
    if (regex.test(content)) {
        content = content.replace(regex, `$&\\n${snippet}`);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Zaktualizowano: ${file}`);
    } else {
        const headRegex = /<head>/i;
        if (headRegex.test(content)) {
            content = content.replace(headRegex, `$&\\n${snippet}`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Zaktualizowano (po <head>): ${file}`);
        } else {
            console.log(`Brak <head> w pliku: ${file}`);
        }
    }
}
