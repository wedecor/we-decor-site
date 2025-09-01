/* eslint-disable no-console */
const PHONE_BASE_URL = process.env.BASE_URL ?? "https://www.wedecorevents.com";
const HOME = "/";
const WA = /wa\.me\/919880544452/i;                 // WhatsApp CTA must use 8880544452
const N1 = /88805\s*44452/;                         // display primary (spaced)
const N2 = /95912\s*32166/;                         // display secondary (spaced)

async function getPhone(u: string) {
  try {
    const r = await fetch(u);
    return { status: r.status, text: await r.text() };
  } catch (error) {
    return { status: 0, text: "" };
  }
}

(async () => {
  console.log("🔍 Auditing phone number policy...");
  console.log(`Checking: ${PHONE_BASE_URL}${HOME}`);
  
  const { status, text } = await getPhone(`${PHONE_BASE_URL}${HOME}`);
  
  if (status !== 200) { 
    console.error("❌ Home page not accessible (status:", status, ")");
    process.exit(1);
  }
  
  const okWa = WA.test(text);
  const okN1 = N1.test(text);
  const okN2 = N2.test(text);
  
  console.log("\n📊 Phone Policy Check Results:");
  console.log(`   WhatsApp CTA (8880544452): ${okWa ? "✅" : "❌"}`);
  console.log(`   Display Primary (8880544452): ${okN1 ? "✅" : "❌"}`);
  console.log(`   Display Secondary (9591232166): ${okN2 ? "✅" : "❌"}`);
  
  if (!okWa) {
    console.error("\n❌ WhatsApp CTA number incorrect/missing");
    console.error("   Expected: wa.me/919880544452");
  }
  
  if (!okN1) {
    console.error("\n❌ Display primary number missing");
    console.error("   Expected: 8880544452 (with or without spaces)");
  }
  
  if (!okN2) {
    console.error("\n❌ Display secondary number missing");
    console.error("   Expected: 9591232166 (with or without spaces)");
  }
  
  if (!okWa || !okN1 || !okN2) {
    console.error("\n❌ Phone policy check FAILED");
    process.exit(1);
  }
  
  console.log("\n✅ Phone policy OK!");
  console.log("   - WhatsApp CTA: +91 8880544452");
  console.log("   - Display numbers: Both numbers present");
  console.log("   - Policy compliance: 100%");
})(); 