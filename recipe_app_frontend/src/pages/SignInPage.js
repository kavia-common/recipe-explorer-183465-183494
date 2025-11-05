import React from "react";

/**
 * PUBLIC_INTERFACE
 * SignInPage renders the pixel-perfect Sign In screen (11:235) using an iframe to guarantee
 * isolation of styles and to allow the bundled static HTML to resolve its CSS/JS and image paths
 * exactly as generated. This prevents any global CSS conflicts and preserves absolute positioning.
 */
export default function SignInPage() {
  // The assets are served from the CRA public root at runtime when placed under /assets in project root.
  // We must reference the HTML using the same relative path so that its internal links to CSS/JS/images work.
  const src = "/assets/sign-in-11-235.html";

  // Wrapper removes any default margins/paddings to ensure pixel-perfect rendering with no extra space.
  const wrapperStyle = {
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "transparent",
    minHeight: "calc(100vh - 0px)",
  };

  // Frame is sized to the screen width/height defined by the extracted design (375x812),
  // and no borders or extra spacing to ensure visual parity.
  const frameStyle = {
    width: 375,
    height: 812,
    border: "none",
    display: "block",
    overflow: "hidden",
  };

  return (
    <div style={wrapperStyle} aria-label="Sign In Screen">
      <iframe
        title="Sign In 11:235"
        src={src}
        style={frameStyle}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
