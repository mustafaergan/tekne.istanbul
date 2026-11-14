// Stilize İstanbul silueti: kubbeler ve minareler, Galata benzeri kule, asma köprü ve dalgalar.
// Hero bölümlerinin altında kullanılır; renkler CSS değişkenlerinden gelir.

export function Skyline({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className="block h-[120px] w-full sm:h-[200px]">
        {/* köprü */}
        <g fill="none" stroke="var(--sky-far)" strokeWidth="2">
          <path d="M880 150 Q 1030 60 1180 150" />
          <path d="M900 150 V 70 M1160 150 V 70" strokeWidth="5" />
          <path d="M860 150 H 1210" strokeWidth="4" />
          {Array.from({ length: 13 }, (_, i) => {
            const x = 920 + i * 20;
            const t = (x - 880) / 300;
            const y = (1 - t) * (1 - t) * 150 + 2 * (1 - t) * t * 60 + t * t * 150;
            return <path key={i} d={`M${x} ${y} V150`} strokeWidth="1" />;
          })}
        </g>

        {/* uzak sıra: cami silueti */}
        <g fill="var(--sky-far)">
          <rect x="120" y="70" width="5" height="90" />
          <path d="M118 72 L122.5 52 L127 72z" />
          <rect x="285" y="70" width="5" height="90" />
          <path d="M283 72 L287.5 52 L292 72z" />
          <path d="M150 160 V 125 Q 205 70 260 125 V160z" />
          <path d="M140 160 V 135 Q 160 112 180 135 V160z" />
          <path d="M230 160 V 135 Q 250 112 270 135 V160z" />
          <rect x="203" y="78" width="4" height="12" />
        </g>

        {/* orta sıra: kubbeler, minareler, kule */}
        <g fill="var(--sky-mid)">
          <path d="M0 175 V150 Q 40 140 80 150 L 120 145 Q 160 150 200 158 V175z" />
          {/* büyük cami */}
          <rect x="420" y="60" width="6" height="120" />
          <path d="M418 63 L423 38 L428 63z" />
          <rect x="600" y="60" width="6" height="120" />
          <path d="M598 63 L603 38 L608 63z" />
          <rect x="445" y="80" width="5" height="100" />
          <path d="M443 82 L447.5 64 L452 82z" />
          <rect x="576" y="80" width="5" height="100" />
          <path d="M574 82 L578.5 64 L583 82z" />
          <path d="M460 180 V 120 Q 513 50 566 120 V180z" />
          <path d="M455 180 V 140 Q 478 115 500 140 V180z" />
          <path d="M526 180 V 140 Q 548 115 571 140 V180z" />
          <rect x="511" y="62" width="4" height="14" />
          <path d="M380 180 V160 H 650 V180z" />
          {/* kule */}
          <rect x="740" y="85" width="34" height="95" />
          <rect x="736" y="80" width="42" height="8" />
          <path d="M737 80 L757 40 L777 80z" />
          <path d="M700 180 V150 H 820 V180z" />
          <path d="M1250 180 V150 Q 1300 140 1340 150 Q 1390 158 1440 148 V180z" />
          <rect x="1300" y="110" width="4" height="50" />
          <path d="M1298 112 L1302 96 L1306 112z" />
          <path d="M1315 160 V 140 Q 1340 118 1365 140 V160z" />
        </g>

        {/* deniz */}
        <path d="M0 178 C 160 165 320 192 480 180 S 800 166 960 178 S 1280 192 1440 176 V220 H0z" fill="var(--sea-wave-1)" />

        {/* uzaktaki yelkenli: sağdan sola */}
        <g className="sail-b">
          <g className="bob" style={{ animationDelay: "-1.2s" }}>
            <Sailboat />
          </g>
        </g>

        {/* vapur: soldan sağa */}
        <g className="sail-a">
          <g className="bob">
            <Ferry />
          </g>
        </g>

        <path d="M0 196 C 200 186 400 210 600 198 S 1000 186 1200 200 S 1380 204 1440 196 V220 H0z" fill="var(--sea-wave-2)" />

        {/* sürat teknesi: önde, hızlı */}
        <g className="sail-c">
          <g className="bob" style={{ animationDelay: "-0.6s", animationDuration: "1.6s" }}>
            <g transform="translate(0 -8)">
              <Speedboat />
            </g>
          </g>
        </g>

        <path d="M0 210 C 240 202 480 220 720 210 S 1200 202 1440 212 V220 H0z" fill="var(--page)" />
      </svg>
    </div>
  );
}

// Klasik Boğaz vapuru: siyah gövde, beyaz üst yapı, sarı-siyah baca. Su çizgisi y=188.
function Ferry() {
  return (
    <g transform="translate(0 0)">
      {/* iz */}
      <path d="M-70 189 q20 -3 40 0 q20 3 40 0" stroke="#fff" strokeOpacity=".55" strokeWidth="2" fill="none" />
      {/* gövde */}
      <path d="M0 176 H 150 L 140 190 H 10 z" fill="#1d2a33" />
      <rect x="0" y="174" width="150" height="3" fill="#b91c1c" />
      {/* güverteler */}
      <rect x="14" y="160" width="122" height="14" rx="2" fill="#fff" />
      <rect x="30" y="148" width="90" height="12" rx="2" fill="#fff" />
      <g fill="#2b5876">
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={20 + i * 10.5} y="164" width="6" height="5" rx="1" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={36 + i * 11.5} y="151" width="6" height="5" rx="1" />
        ))}
      </g>
      {/* köprü üstü ve baca */}
      <rect x="62" y="140" width="26" height="8" rx="1.5" fill="#fff" />
      <rect x="68" y="122" width="14" height="18" fill="#f2c230" />
      <rect x="68" y="122" width="14" height="5" fill="#1d2a33" />
      <path d="M75 120 q6 -10 0 -18 q-6 -8 2 -16" stroke="#fff" strokeOpacity=".5" strokeWidth="3" fill="none" className="smoke" />
      {/* bayrak direği */}
      <path d="M140 160 V 140" stroke="#1d2a33" strokeWidth="1.5" />
      <path d="M140 140 h10 v6 h-10z" fill="#e30a17" />
    </g>
  );
}

function Sailboat() {
  return (
    <g>
      <path d="M0 180 H 46 L 40 187 H 6 z" fill="#f8fafc" />
      <path d="M22 178 V 132" stroke="#e2e8f0" strokeWidth="1.5" />
      <path d="M24 134 L 44 176 H 24 z" fill="#f8fafc" />
      <path d="M20 140 L 4 176 H 20 z" fill="#ffe2cf" />
    </g>
  );
}

function Speedboat() {
  return (
    <g>
      <path d="M-60 205 q15 -4 30 -1 q15 3 30 -1" stroke="#fff" strokeOpacity=".7" strokeWidth="2" fill="none" />
      <path d="M0 196 H 58 Q 70 197 72 200 L 64 206 H 6 z" fill="#fff" />
      <path d="M6 202 H 66" stroke="var(--accent)" strokeWidth="2" />
      <path d="M22 196 L 30 188 H 44 L 48 196 z" fill="#1e3a4c" />
    </g>
  );
}

export function Gulls({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M10 20 q6 -8 12 0 q6 -8 12 0" />
      <path d="M60 10 q4 -5 8 0 q4 -5 8 0" />
      <path d="M90 26 q3 -4 6 0 q3 -4 6 0" />
    </svg>
  );
}
