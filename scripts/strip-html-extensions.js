import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (['node_modules', 'dist', 'public', 'reports', 'assets', '.git'].includes(file)) {
        continue;
      }
      getHtmlFiles(filePath, files);
    } else if (file.endsWith('.html')) {
      files.push(filePath);
    }
  }
  return files;
}

function stripHtmlExtensions() {
  const htmlFiles = getHtmlFiles(PROJECT_ROOT);
  const regex = /\b(marketing|offer|social-media)\.html\b/g;

  console.log(`Scanning and cleaning HTML files in ${PROJECT_ROOT}...`);

  for (const filePath of htmlFiles) {
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Reset regex index
    regex.lastIndex = 0;
    
    if (regex.test(content)) {
      const updatedContent = content.replace(regex, '$1');
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated links in: ${relativePath}`);
    } else {
      console.log(`No changes needed in: ${relativePath}`);
    }
  }
  console.log('HTML files refactoring completed successfully.');
}

stripHtmlExtensions();
