const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, 'src', 'pages', 'chapters');
const outputFile = path.join(__dirname, 'Ebook_Mamas_Con_Fundamento.md');

let markdownContent = '# Mamás con Fundamento - Ebook Completo\n\n';

for (let i = 0; i <= 9; i++) {
    const filename = `Chapter${i}.jsx`;
    const filePath = path.join(chaptersDir, filename);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Extract content inside the main div or return statement
        const match = content.match(/<div className="chapter-content">([\s\S]*?)<\/div>\s*\);/);
        if (match) {
            let innerContent = match[1];
            
            // Replace tags with markdown
            innerContent = innerContent.replace(/<h1>(.*?)<\/h1>/g, '## $1\n');
            innerContent = innerContent.replace(/<h2>(.*?)<\/h2>/g, '### $1\n');
            innerContent = innerContent.replace(/<p>(.*?)<\/p>/g, '$1\n\n');
            innerContent = innerContent.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
            innerContent = innerContent.replace(/<em>(.*?)<\/em>/g, '*$1*');
            innerContent = innerContent.replace(/<ul>/g, '\n');
            innerContent = innerContent.replace(/<\/ul>/g, '\n');
            innerContent = innerContent.replace(/<li>(.*?)<\/li>/g, '- $1\n');
            innerContent = innerContent.replace(/<br\s*\/?>/g, '\n');
            
            // Remove other tags
            innerContent = innerContent.replace(/<[^>]+>/g, '');
            
            // Decode HTML entities if any (simple ones)
            innerContent = innerContent.replace(/&nbsp;/g, ' ');
            innerContent = innerContent.replace(/&amp;/g, '&');
            
            markdownContent += innerContent.trim() + '\n\n---\n\n';
        }
    }
}

fs.writeFileSync(outputFile, markdownContent);
console.log(`Ebook extracted to ${outputFile}`);
