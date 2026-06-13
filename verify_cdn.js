const fs = require('fs');
const content = fs.readFileSync("d:\\downloads\\New folder\\gift-main\\gift-main\\src\\lib\\mindar-image.js", 'utf-8');

const matches = content.match(/n\.s=\d+/);
console.log("Entrypoint found:", matches ? matches[0] : "None");

if (content.includes("CompilerClass")) {
    console.log("Prepend was applied earlier.");
} else {
    console.log("Prepend was OR was not applied properly.");
}
