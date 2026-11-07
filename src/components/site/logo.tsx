export function AcsfLogo({
  variant = "navy",
  className = "",
  showTagline = true,
}: {
  variant?: "navy" | "white";
  className?: string;
  showTagline?: boolean;
}) {
  const main = variant === "white" ? "#ffffff" : "#182052";
  const red = "#e30613";
  return (
    <svg
      viewBox={showTagline ? "0 0 356 66" : "0 0 320 44"}
      className={className}
      role="img"
      aria-label="ACSF Assurances, Conseils & Services Financiers"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Accent rouge incliné */}
        <path
          d="M6 34 L 20 6 L 27 6 L 13 34 Z"
          fill={red}
        />
        {/* Mot-symbole ACSF */}
        <text
          x="34"
          y="34"
          fontFamily="var(--font-inter), Arial, sans-serif"
          fontSize="34"
          letterSpacing="1.5"
          fill={main}
          fontWeight="800"
          fontStyle="italic"
        >
          ACSF
        </text>
        {showTagline && (
          <>
            <text
              x="35"
              y="52"
              fontFamily="var(--font-inter), Arial, sans-serif"
              fontSize="9.4"
              letterSpacing="2.1"
              fill={red}
              fontWeight="700"
            >
              ASSURANCES
            </text>
            <text
              x="130"
              y="52"
              fontFamily="var(--font-inter), Arial, sans-serif"
              fontSize="9.4"
              letterSpacing="1.6"
              fill={main}
              fontWeight="500"
            >
              CONSEILS &amp; SERVICES FINANCIERS
            </text>
          </>
        )}
      </g>
    </svg>
  );
}
