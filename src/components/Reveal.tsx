import { ReactNode, CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

// Content renders immediately — no scroll-triggered fade, so the
// background photography is never left uncovered mid-animation.
export default function Reveal({
  children,
  className = "",
  style,
  as: Tag = "div",
}: RevealProps) {
  // @ts-ignore
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}
