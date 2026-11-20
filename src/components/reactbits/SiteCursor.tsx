// Site-wide particle swarm cursor (browser-only, loaded lazily after the first mouse move on desktop).
import SwarmCursor from "./SwarmCursor";

export default function SiteCursor() {
  return (
    <SwarmCursor
      className="fixed inset-0 pointer-events-none z-[9999]"
      count={150}
      size={2.4}
      shape="dot"
      spread={75}
      speed={0.85}
      swirl={0.5}
      tail={0.4}
      trail={0.5}
      wander={0.35}
      depth={0.5}
      color="#a5b4fc"
      accentColor="#38bdf8"
      clickEffect="burst"
      idle="roam"
      targets="a, button, [role='button'], input, textarea, select, .cursor-target, [data-swarm-target], [data-crosshair-target]"
    />
  );
}
