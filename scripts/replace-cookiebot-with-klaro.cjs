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

const klaroBlock = `    <!-- Google Consent Mode v2 -->
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
    <script defer type="text/javascript" src="/klaro-config.js"></script>
    <script defer type="text/javascript" src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js"></script>
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TEXVN0KVB9"></script>
    <script>
      gtag('js', new Date());
      gtag('config', 'G-TEXVN0KVB9');
    </script>`;

const cookiebotRegex = /<script\s+id="Cookiebot"[^>]*><\/script>/gi;

const projectDir = path.resolve(__dirname, '..');
const htmlFiles = findHtmlFiles(projectDir);
console.log(`Znaleziono ${htmlFiles.length} plików HTML.`);

let updatedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    if (cookiebotRegex.test(content)) {
        // Usuwamy stary tag Cookiebota i wstawiamy skrypty Klaro
        content = content.replace(cookiebotRegex, `<script defer type="text/javascript" src="/klaro-config.js"></script>\n    <script defer type="text/javascript" src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js"></script>`);
        modified = true;
    } else if (!content.includes('klaro.js')) {
        // Jeśli nie było Cookiebota, wstawiamy pełny blok po meta charset lub <head>
        const metaRegex = /<meta\s+charset="UTF-8"\s*\/?>/i;
        if (metaRegex.test(content)) {
            content = content.replace(metaRegex, `$&\\n${klaroBlock}`);
            modified = true;
        } else {
            const headRegex = /<head>/i;
            if (headRegex.test(content)) {
                content = content.replace(headRegex, `$&\\n${klaroBlock}`);
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Zaktualizowano: ${file}`);
        updatedCount++;
    } else {
        console.log(`Pominięto: ${file}`);
    }
}

console.log(`Zakończono. Zaktualizowano ${updatedCount} plików.`);
