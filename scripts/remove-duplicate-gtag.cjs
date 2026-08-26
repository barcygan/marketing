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

// Matches the duplicate gtag block that appears right after our new consent block
// (the old one left over when regex replaced the first occurrence only)
const duplicateGtagRegex = /(\s*<script>\s*\n?\s*gtag\('js', new Date\(\)\);\s*\n?\s*gtag\('config', 'G-TEXVN0KVB9'\);\s*\n?\s*<\/script>){2,}/g;

let updatedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('G-TEXVN0KVB9')) {
        console.log(`Pominięto (brak GA4): ${file}`);
        continue;
    }

    // Count occurrences
    const matches = content.match(/<script>\s*\n?\s*gtag\('js', new Date\(\)\);/g);
    if (!matches || matches.length < 2) {
        console.log(`OK (brak duplikatu): ${file}`);
        continue;
    }

    // Remove the first occurrence (duplicate left over), keep the second (correct one)
    let replaced = false;
    content = content.replace(
        /(<script>\s*\n?\s*gtag\('js', new Date\(\)\);\s*\n?\s*gtag\('config', 'G-TEXVN0KVB9'\);\s*\n?\s*<\/script>\s*\n?)/,
        (match) => {
            if (!replaced) { replaced = true; return ''; }
            return match;
        }
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Usunięto duplikat: ${file}`);
    updatedCount++;
}

console.log(`\nZakończono. Zaktualizowano ${updatedCount} plików.`);
