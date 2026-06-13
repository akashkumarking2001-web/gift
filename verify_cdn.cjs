const fs = require('fs');

async function test() {
    const res = await fetch("https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image.prod.js");
    const content = await res.text();
    
    // Simulate Browser/CommonJS wrapper
    let exports = {};
    let module = { exports: exports };
    
    eval(content);
    
    console.log("Keys in module.exports:", Object.keys(module.exports));
    if (module.exports.Compiler) {
        console.log("-> SUCCESS: Compiler is in module.exports!");
    } else {
        console.log("-> FAIL: Compiler missing in module.exports.");
    }
}

test();
