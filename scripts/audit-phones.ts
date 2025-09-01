import { execSync } from "node:child_process";
import fs from "node:fs";

function auditPhones() {
  console.log("🔍 Auditing phone number usage across codebase...");
  
  try {
    // Search for hardcoded phone numbers and WhatsApp links
    const cmd = `grep -R -nE "(8880|9591|wa\\.me|api\\.whatsapp|\\btel:)" --include='*.{ts,tsx,js,jsx}' . | grep -v "lib/contact.ts" | grep -v "scripts/audit-phones.ts" || true`;
    
    const output = execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString();
    
    // Create reports directory
    fs.mkdirSync("reports/seo", { recursive: true });
    
    // Save audit report
    const report = {
      generated: new Date().toISOString(),
      auditType: "Phone Number Usage",
      findings: output || "No direct occurrences found.",
      recommendations: [
        "All phone numbers should be imported from lib/contact.ts",
        "Use CONTACT.displayNumbers for display purposes",
        "Use CONTACT.whatsappNumber for WhatsApp links",
        "Use CONTACT.telLinks() for telephone links"
      ]
    };
    
    fs.writeFileSync("reports/seo/phone-audit.txt", 
      `Phone Number Audit Report\n` +
      `Generated: ${report.generated}\n\n` +
      `## Findings\n` +
      `${report.findings}\n\n` +
      `## Recommendations\n` +
      report.recommendations.map(r => `- ${r}`).join("\n") + `\n\n` +
      `## Policy\n` +
      `- WhatsApp CTA: +91 8880544452\n` +
      `- Display numbers: Both +91 8880544452 and +91 9591232166\n` +
      `- All numbers should come from centralized contact configuration`
    );
    
    // Save JSON report
    fs.writeFileSync("reports/seo/phone-audit.json", JSON.stringify(report, null, 2));
    
    if (output.trim()) {
      console.log("⚠️  Found hardcoded phone numbers:");
      console.log(output);
      console.log("\n❌ Phone audit FAILED. Please replace hardcoded numbers with imports from lib/contact.ts");
    } else {
      console.log("✅ No hardcoded phone numbers found!");
      console.log("✅ All phone numbers are properly centralized in lib/contact.ts");
    }
    
    console.log(`\n📁 Reports saved to:`);
    console.log(`   reports/seo/phone-audit.txt`);
    console.log(`   reports/seo/phone-audit.json`);
    
  } catch (error) {
    console.error("❌ Error during phone audit:", error);
    process.exit(1);
  }
}

auditPhones(); 