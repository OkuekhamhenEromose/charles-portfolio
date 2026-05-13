// "use client";

// /**
//  * CompaniesWorked — inline SVG brand logos
//  * Responsive grid: 2 cols (mobile) → 3 cols (sm) → 5 cols (lg)
//  * Each logo cell is a fixed-ratio box so all logos are identical size.
//  */

// function PaystackLogo() {
//   return (
//     <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
//       aria-label="Paystack" role="img" width="100%" height="100%">
//       <rect x="8"  y="14" width="28" height="8" rx="4" fill="rgb(var(--foreground))"/>
//       <rect x="8"  y="28" width="22" height="8" rx="4" fill="rgb(var(--foreground))"/>
//       <rect x="8"  y="42" width="16" height="8" rx="4" fill="rgb(var(--foreground))"/>
//       <text
//         x="44" y="42"
//         fontFamily="system-ui, -apple-system, sans-serif"
//         fontWeight="700" fontSize="22"
//         fill="rgb(var(--foreground))" letterSpacing="-0.5"
//       >paystack</text>
//     </svg>
//   );
// }

// function SlackLogo() {
//   return (
//     <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
//       aria-label="Slack" role="img" width="100%" height="100%">
//       <g transform="translate(8, 10)">
//         <rect x="0"  y="0"  width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
//         <rect x="15" y="0"  width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
//         <rect x="0"  y="18" width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
//         <rect x="15" y="18" width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
//         <rect x="0"  y="13" width="26" height="11" rx="5.5" fill="rgb(var(--foreground))"/>
//       </g>
//       <text
//         x="48" y="42"
//         fontFamily="'Lato', system-ui, sans-serif"
//         fontWeight="700" fontSize="26"
//         fill="rgb(var(--foreground))" letterSpacing="-0.3"
//       >slack</text>
//     </svg>
//   );
// }

// function AmazonLogo() {
//   return (
//     <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
//       aria-label="Amazon" role="img" width="100%" height="100%">
//       <text
//         x="16" y="40"
//         fontFamily="system-ui, -apple-system, sans-serif"
//         fontWeight="700" fontSize="30"
//         fill="rgb(var(--foreground))" letterSpacing="-0.5"
//       >amazon</text>
//       <path
//         d="M 22 50 Q 78 62 148 49"
//         stroke="rgb(var(--foreground))" strokeWidth="3"
//         strokeLinecap="round" fill="none"
//       />
//       <path
//         d="M 141 45 L 148 49 L 140 53"
//         stroke="rgb(var(--foreground))" strokeWidth="3"
//         strokeLinecap="round" strokeLinejoin="round" fill="none"
//       />
//     </svg>
//   );
// }

// function JumiaLogo() {
//   return (
//     <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
//       aria-label="Jumia" role="img" width="100%" height="100%">
//       <text
//         x="12" y="42"
//         fontFamily="system-ui, -apple-system, sans-serif"
//         fontWeight="800" fontSize="30"
//         fill="rgb(var(--foreground))" letterSpacing="3"
//       >JUMIA</text>
//       <polygon
//         points="152,18 154,25 161,25 155.5,29 157.5,36 152,32 146.5,36 148.5,29 143,25 150,25"
//         fill="rgb(var(--foreground))"
//       />
//     </svg>
//   );
// }

// function GoogleLogo() {
//   return (
//     <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
//       aria-label="Google" role="img" width="100%" height="100%">
//       <text
//         x="12" y="44"
//         fontFamily="'Product Sans', 'Google Sans', system-ui, sans-serif"
//         fontWeight="400" fontSize="34"
//         fill="rgb(var(--foreground))" letterSpacing="-0.5"
//       >Google</text>
//     </svg>
//   );
// }

// const companies = [
//   { name: "Paystack", Logo: PaystackLogo },
//   { name: "Slack",    Logo: SlackLogo    },
//   { name: "Amazon",   Logo: AmazonLogo   },
//   { name: "Jumia",    Logo: JumiaLogo    },
//   { name: "Google",   Logo: GoogleLogo   },
// ];

// export default function CompaniesWorked() {
//   return (
//     <section className="companies-worked-section">
//       <div className="section-shell">
//         <div className="companies-worked-wrapper">

//           {/* ── Header ─────────────────────────────────────────────── */}
//           <div className="companies-worked-header">
//             <span className="section-tag">Trusted Collaboration</span>
//             <h2>
//               Companies &amp; Platforms{" "}
//               <span>I&apos;ve Worked With</span>
//             </h2>
//             <p>
//               Building scalable frontend systems, APIs, cloud-powered
//               applications, and polished digital experiences for modern
//               products and businesses.
//             </p>
//           </div>

//           {/* ── Logo grid ──────────────────────────────────────────── */}
//           {/*
//             Mobile  (< sm):  2 columns
//             Tablet  (sm–lg): 3 columns
//             Desktop (≥ lg):  5 columns — all on one row
//           */}
//           <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
//             {companies.map(({ name, Logo }) => (
//               <div
//                 key={name}
//                 className="
//                   group relative overflow-hidden
//                   flex items-center justify-center
//                   p-4 sm:p-5
//                   opacity-50 hover:opacity-100
//                   hover:-translate-y-1
//                   transition-all duration-300
//                 "
//                 /* aspect-ratio keeps every cell the same height on all screens */
//                 style={{ aspectRatio: "200 / 80" }}
//               >
//                 {/* Subtle hover glow overlay */}
//                 <div className="
//                   absolute inset-0 opacity-0 group-hover:opacity-100
//                   bg-linear-to-br from-primary/8 to-transparent
//                   transition-opacity duration-300 pointer-events-none
//                 " />

//                 {/* SVG logo — fills the cell, viewBox handles proportions */}
//                 <div className="relative z-10 w-full h-full">
//                   <Logo />
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

/**
 * CompaniesWorked — inline SVG brand logos
 * Responsive grid: 2 cols (mobile) → 3 cols (sm) → 5 cols (lg)
 * Each logo cell is a fixed-ratio box so all logos are identical size.
 */

function PaystackLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Paystack" role="img" width="100%" height="100%">
      <rect x="8"  y="14" width="28" height="8" rx="4" fill="rgb(var(--foreground))"/>
      <rect x="8"  y="28" width="22" height="8" rx="4" fill="rgb(var(--foreground))"/>
      <rect x="8"  y="42" width="16" height="8" rx="4" fill="rgb(var(--foreground))"/>
      <text
        x="44" y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700" fontSize="22"
        fill="rgb(var(--foreground))" letterSpacing="-0.5"
      >paystack</text>
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Slack" role="img" width="100%" height="100%">
      <g transform="translate(8, 10)">
        <rect x="0"  y="0"  width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        <rect x="15" y="0"  width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        <rect x="0"  y="18" width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        <rect x="15" y="18" width="11" height="26" rx="5.5" fill="rgb(var(--foreground))"/>
        <rect x="0"  y="13" width="26" height="11" rx="5.5" fill="rgb(var(--foreground))"/>
      </g>
      <text
        x="48" y="42"
        fontFamily="'Lato', system-ui, sans-serif"
        fontWeight="700" fontSize="26"
        fill="rgb(var(--foreground))" letterSpacing="-0.3"
      >slack</text>
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Amazon" role="img" width="100%" height="100%">
      <text
        x="16" y="40"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700" fontSize="30"
        fill="rgb(var(--foreground))" letterSpacing="-0.5"
      >amazon</text>
      <path
        d="M 22 50 Q 78 62 148 49"
        stroke="rgb(var(--foreground))" strokeWidth="3"
        strokeLinecap="round" fill="none"
      />
      <path
        d="M 141 45 L 148 49 L 140 53"
        stroke="rgb(var(--foreground))" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function JumiaLogo() {
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Jumia" role="img" width="100%" height="100%">
      <text
        x="12" y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800" fontSize="30"
        fill="rgb(var(--foreground))" letterSpacing="3"
      >JUMIA</text>
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
      aria-label="Google" role="img" width="100%" height="100%">
      <text
        x="12" y="44"
        fontFamily="'Product Sans', 'Google Sans', system-ui, sans-serif"
        fontWeight="400" fontSize="34"
        fill="rgb(var(--foreground))" letterSpacing="-0.5"
      >Google</text>
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

          {/* ── Logo grid ──────────────────────────────────────────── */}
          {/*
            Mobile  (< sm):  2 columns
            Tablet  (sm–lg): 3 columns
            Desktop (≥ lg):  5 columns — all on one row
          */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-3 lg:gap-3">
            {companies.map(({ name, Logo }) => (
              <div
                key={name}
                className="
                  group relative overflow-hidden
                  flex items-center justify-center
                  p-2 sm:p-4 lg:p-5
                  opacity-100 md:opacity-50
                  md:hover:opacity-100
                  md:hover:border-primary/40
                  md:hover:-translate-y-1
                  transition-all duration-300
                "
                style={{ aspectRatio: "200 / 80" }}
              >
                {/* Subtle hover glow overlay */}
                <div className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 pointer-events-none
                " />

                {/* SVG logo — fills the cell, viewBox handles proportions */}
                <div className="relative z-10 w-full h-full">
                  <Logo />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}