import fs from 'fs';

const filePath = "d:\\downloads\\New folder\\gift-main\\gift-main\\src\\pages\\ClientDashboard.tsx";

let content = fs.readFileSync(filePath, 'utf-8');

// Use Regex to find the broken block and replace it cleanly
const regex = /if\s+\(!file\)\s+ret\s+try\s*\{([\s\S]*?)\}\s*catch\s*\(error:\s*any\)\s*\{\s*\d+:\s*ny\)\s*\{/im;

if (regex.test(content)) {
    console.log("MATCH FOUND! Fixing broken block...");
    const fixedContent = content.replace(regex, (match, body) => {
        return `if (!file) return;\n\n                                                 try {\n${body}} catch (error: any) {`;
    });
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    console.log("File fixed successfully!");
} else {
    console.log("REGEX MATCH FAILED! Prepping fallback...");
    // Fallback: Just replace the broken line 388 and 402 by matching strings on array split
    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('if (!file) ret')) {
            lines[i] = '                                                 if (!file) return;\n\n                                                 try {';
        }
        if (lines[i].includes('ny) {') && i > 390) {
            lines[i] = '                                                 } catch (error: any) {';
        }
    }
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    console.log("Fallback replacement written.");
}
