import fs from 'fs';

const filePath = "d:\\downloads\\New folder\\gift-main\\gift-main\\src\\pages\\ClientDashboard.tsx";

let content = fs.readFileSync(filePath, 'utf-8');

const regex = /\} catch \(error: any\) \{\s*\} catch \(error: any\) \{\s*toast\(\{ title: "Error"/m;

if (regex.test(content)) {
    console.log("Found double catch! Fixing it...");
    const fixed = content.replace(regex, '} catch (error: any) {\n                                                     toast({ title: "Error"');
    fs.writeFileSync(filePath, fixed, 'utf-8');
    console.log("Double catch fixed!");
} else {
    console.log("No double catch found by regex. trying string replace.");
    const fixed = content.replace('} catch (error: any) {\r\n                                                  } catch (error: any) {', '} catch (error: any) {');
    fs.writeFileSync(filePath, fixed, 'utf-8');
}
