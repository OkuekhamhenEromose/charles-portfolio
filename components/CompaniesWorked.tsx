"use client";

/**
 * CompaniesWorked — inline SVG brand logos
 *
 * JPEGs with black backgrounds can't be cleanly composited on a dark
 * background via CSS alone. Instead, each logo is an inline SVG path
 * rendered in rgb(var(--foreground)), so it always adapts to the theme,
 * is perfectly visible, and every logo sits in the exact same 200 × 64
 * bounding box with identical visual weight.
 */

function PaystackLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Paystack" role="img">
      {/* Stacked bars icon */}
      <rect x="8"  y="14" width="28" height="8"  rx="4" fill="rgb(var(--foreground))"/>
      <rect x="8"  y="28" width="22" height="8"  rx="4" fill="rgb(var(--foreground))"/>
      <rect x="8"  y="42" width="16" height="8"  rx="4" fill="rgb(var(--foreground))"/>
      {/* wordmark */}
      <text
        x="44" y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="rgb(var(--foreground))"
        letterSpacing="-0.5"
      >
        paystack
      </text>
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Slack" role="img">
      {/* Slack hashtag icon — simplified monochrome */}
      <g transform="translate(8, 10)">
        {/* top-left pill */}
        <rect x="0"  y="0"  width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        {/* top-right pill */}
        <rect x="15" y="0"  width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        {/* bottom-left pill */}
        <rect x="0"  y="18" width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        {/* bottom-right pill */}
        <rect x="15" y="18" width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        {/* horizontal connectors */}
        <rect x="0"  y="13" width="26" height="11" rx="5.5" fill="rgb(var(--foreground))"/>
      </g>
      <text
        x="48" y="42"
        fontFamily="'Lato', system-ui, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="rgb(var(--foreground))"
        letterSpacing="-0.3"
      >
        slack
      </text>
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Amazon" role="img">
      <text
        x="16" y="40"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="30"
        fill="rgb(var(--foreground))"
        letterSpacing="-0.5"
      >
        amazon
      </text>
      {/* Arrow smile — the iconic underline curve */}
      <path
        d="M 22 50 Q 78 62 148 49"
        stroke="rgb(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M 141 45 L 148 49 L 140 53"
        stroke="rgb(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function JumiaLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Jumia" role="img">
      <text
        x="12" y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="30"
        fill="rgb(var(--foreground))"
        letterSpacing="3"
      >
        JUMIA
      </text>
      {/* Star badge — tucked right after the A in JUMIA */}
      <polygon
        points="152,18 154,25 161,25 155.5,29 157.5,36 152,32 146.5,36 148.5,29 143,25 150,25"
        fill="rgb(var(--foreground))"
      />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Google" role="img">
      <text
        x="12" y="44"
        fontFamily="'Product Sans', 'Google Sans', system-ui, sans-serif"
        fontWeight="400"
        fontSize="34"
        fill="rgb(var(--foreground))"
        letterSpacing="-0.5"
      >
        Google
      </text>
    </svg>
  );
}

const companies = [
  { name: "Paystack", Logo: PaystackLogo },
  { name: "Slack",    Logo: SlackLogo    },
  { name: "Amazon",   Logo: AmazonLogo   },
  { name: "Jumia",    Logo: JumiaLogo    },
  { name: "Google",   Logo: GoogleLogo   },
];

export default function CompaniesWorked() {
  return (
    <section className="companies-worked-section">
      <div className="section-shell">
        <div className="companies-worked-wrapper">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="companies-worked-header">
            <span className="section-tag">Trusted Collaboration</span>

            <h2>
              Companies &amp; Platforms{" "}
              <span>I&apos;ve Worked With</span>
            </h2>

            <p>
              Building scalable frontend systems, APIs, cloud-powered
              applications, and polished digital experiences for modern
              products and businesses.
            </p>
          </div>

          {/* ── Logo strip — every logo in the same 200 × 64 box ───── */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-6 lg:gap-x-4">
            {companies.map(({ name, Logo }) => (
              <div
                key={name}
                className="
                  opacity-40 hover:opacity-100
                  transition-all duration-300 hover:scale-105
                  shrink-0
                "
                style={{ width: "160px", height: "56px" }}
              >
                <Logo />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}