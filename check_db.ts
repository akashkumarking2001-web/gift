
import { BusinessService } from "./src/lib/businessService";

async function check() {
    const identifier = "paalkovvamagic.shop";
    console.log(`Checking identifier: "${identifier}"`);
    
    const biz = await BusinessService.getBusinessByIdentifier(identifier);
    if (biz) {
        console.log("Business Found:", biz.business_name);
        console.log("Slug:", biz.business_slug);
        console.log("Custom Domain:", biz.custom_domain);
        console.log("Is Active:", biz.is_active);
    } else {
        console.log("Business NOT FOUND in database.");
        
        // Try listing all with custom domains
        const { data } = await (BusinessService as any).supabase
            .from('business_clients')
            .select('*')
            .not('custom_domain', 'is', null);
            
        console.log("Businesses with custom domains:");
        data?.forEach((b: any) => {
            console.log(`- "${b.custom_domain}" (ID: ${b.id}, Slug: ${b.business_slug})`);
        });
    }
}

check();
