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
        // Match the content inside the top-level div (assuming a single wrapper per chapter)
        let innerContentMatch = content.match(/return\s*\(\s*(<div[^>]*>[\s\S]*?)<\/div>\s*\)\s*;/);
        
        if (innerContentMatch) {
            let innerContent = innerContentMatch[1];
            
            // Convert simple tags
            innerContent = innerContent.replace(/<h1>(.*?)<\/h1>/gi, '## $1\n\n');
            innerContent = innerContent.replace(/<h2>(.*?)<\/h2>/gi, '### $1\n\n');
            innerContent = innerContent.replace(/<h3>(.*?)<\/h3>/gi, '#### $1\n\n');
            innerContent = innerContent.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
            innerContent = innerContent.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
            innerContent = innerContent.replace(/<b>(.*?)<\/b>/gi, '**$1**');
            innerContent = innerContent.replace(/<em>(.*?)<\/em>/gi, '*$1*');
            innerContent = innerContent.replace(/<i>(.*?)<\/i>/gi, '*$1*');
            innerContent = innerContent.replace(/<ul>/gi, '\n');
            innerContent = innerContent.replace(/<\/ul>/gi, '\n');
            innerContent = innerContent.replace(/<ol>/gi, '\n');
            innerContent = innerContent.replace(/<\/ol>/gi, '\n');
            innerContent = innerContent.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
            innerContent = innerContent.replace(/<br\s*\/?>/gi, '\n');
            
            // Tables
            innerContent = innerContent.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, function(match, tableContent) {
                let markdownTable = '\n';
                const rows = tableContent.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
                let isFirstRow = true;
                
                rows.forEach(row => {
                    const cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [];
                    const rowContent = cells.map(cell => cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/i, '$1').replace(/<[^>]+>/g, '').trim()).join(' | ');
                    markdownTable += `| ${rowContent} |\n`;
                    
                    if (isFirstRow) {
                        const separator = cells.map(() => '---').join(' | ');
                        markdownTable += `| ${separator} |\n`;
                        isFirstRow = false;
                    }
                });
                return markdownTable + '\n';
            });

            // Remove other tags
            innerContent = innerContent.replace(/<[^>]+>/g, '');
            
            // Decode HTML entities
            innerContent = innerContent.replace(/&nbsp;/g, ' ');
            innerContent = innerContent.replace(/&amp;/g, '&');
            innerContent = innerContent.replace(/&lt;/g, '<');
            innerContent = innerContent.replace(/&gt;/g, '>');
            innerContent = innerContent.replace(/&quot;/g, '"');
            
            markdownContent += innerContent.trim() + '\n\n---\n\n';
        } else {
             // Fallback for different return structures
             let bodyMatch = content.match(/return\s*\([\s\S]*?(<h1>[\s\S]*?)<\/div>\s*\)\s*;/);
             if (bodyMatch) {
                 markdownContent += `## Capítulo ${i}\n[No se pudo extraer el formato perfectamente]\n\n`;
             }
        }
    }
}

fs.writeFileSync(outputFile, markdownContent);
console.log(`Ebook extracted to ${outputFile}`);
