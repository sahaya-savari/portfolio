import { Text3DFlip } from "../magicui/text-3d-flip";

export default function HeroName() {
  return (
    <Text3DFlip
      className="text-[clamp(1.75rem,7vw,6.5rem)] font-heading font-semibold tracking-tight text-white inline-flex flex-wrap justify-center md:justify-start leading-[0.95] drop-shadow-[0_2px_24px_rgba(255,255,255,0.22)]"
      textClassName="text-white"
      flipTextClassName="text-white/85"
      staggerDuration={0.035}
      rotateDirection="top"
    >
      Sahaya Savari F
    </Text3DFlip>
  );
}
