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

// Replace Klaro scripts with our custom consent.js
const klaroScriptRegex = /\s*<script defer type="text\/javascript" src="\/klaro-config\.js"><\/script>\s*\n?\s*<script defer type="text\/javascript" src="https:\/\/cdn\.kiprotect\.com\/klaro\/v0\.7\/klaro\.js"><\/script>/g;
const consentScript = `\n    <script defer src="/consent.js"></script>`;

let updatedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    if (content.includes('consent.js') && !content.includes('klaro-config.js')) {
        console.log(`Pominięto (już zaktualizowany): ${file}`);
        continue;
    }

    if (klaroScriptRegex.test(content)) {
        content = content.replace(klaroScriptRegex, consentScript);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Zaktualizowano: ${file}`);
        updatedCount++;
    } else {
        console.log(`Pominięto (brak dopasowania): ${file}`);
    }
}

console.log(`\nZakończono. Zaktualizowano ${updatedCount} plików.`);
