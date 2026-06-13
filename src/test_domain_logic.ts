
function getIdentifier(hostname: string) {
    const parts = hostname.split('.');
    let identifier = '';

    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        identifier = 'local-test'; // Simulated
    } else if (parts.length >= 3 && parts[parts.length - 2] === 'giftmagic' && parts[parts.length - 1] === 'beauty') {
        identifier = parts[0];
    } else if (hostname !== 'giftmagic.beauty' && hostname !== 'www.giftmagic.beauty' && hostname !== 'admin.giftmagic.beauty') {
        identifier = hostname;
    }
    return identifier;
}

console.log("Testing Identifier Logic:");
console.log("Subdomain (client.giftmagic.beauty):", getIdentifier("client.giftmagic.beauty"));
console.log("Custom Domain (mybrand.com):", getIdentifier("mybrand.com"));
console.log("Main Site (giftmagic.beauty):", getIdentifier("giftmagic.beauty"));
console.log("Admin (admin.giftmagic.beauty):", getIdentifier("admin.giftmagic.beauty"));
console.log("Local (localhost):", getIdentifier("localhost"));
