// Sosyal medya paylaşım görseli: public/og.png (1200x630). Değiştirince: node scripts/og.mjs
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0569a8"/><stop offset=".6" stop-color="#1497d4"/><stop offset="1" stop-color="#4cc0ea"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<g fill="#127bb2">
 <rect x="300" y="330" width="7" height="160"/><path d="M298 333 L303.5 300 L309 333z"/>
 <rect x="520" y="330" width="7" height="160"/><path d="M518 333 L523.5 300 L529 333z"/>
 <path d="M340 490 V 410 Q 413 320 486 410 V490z"/><path d="M330 490 V 440 Q 360 405 390 440 V490z"/><path d="M436 490 V 440 Q 466 405 496 440 V490z"/>
 <rect x="700" y="370" width="44" height="120"/><rect x="694" y="362" width="56" height="10"/><path d="M696 362 L722 310 L748 362z"/>
</g>
<g fill="none" stroke="#3aa6d6" stroke-width="3"><path d="M840 470 Q 980 360 1120 470"/><path d="M860 470 V 380 M1100 470 V 380" stroke-width="7"/><path d="M820 470 H 1160" stroke-width="5"/></g>
<path d="M0 480 C 200 465 400 500 600 485 S 1000 465 1200 482 V630 H0z" fill="#0a6aa0"/>
<g transform="translate(140 400)"><path d="M0 76 H 190 L 177 94 H 13 z" fill="#1d2a33"/><rect y="73" width="190" height="4" fill="#b91c1c"/><rect x="18" y="56" width="154" height="18" rx="3" fill="#fff"/><rect x="38" y="40" width="114" height="16" rx="3" fill="#fff"/><rect x="86" y="14" width="18" height="26" fill="#f2c230"/><rect x="86" y="14" width="18" height="7" fill="#1d2a33"/></g>
<path d="M0 540 C 240 525 480 555 720 540 S 1000 525 1200 545 V630 H0z" fill="#075a8c"/>
<text x="80" y="170" font-family="Segoe UI, Arial, sans-serif" font-size="96" font-weight="700" fill="#fff">tekne<tspan fill="#ff7a3d">.</tspan>istanbul</text>
<text x="84" y="235" font-family="Segoe UI, Arial, sans-serif" font-size="36" fill="#e3f4fb">Boat rental · Bosphorus tours · Tekne kiralama</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("public/og.png");
console.log("public/og.png yazildi");
