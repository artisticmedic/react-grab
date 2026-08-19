import type { Component } from "solid-js";

interface IconTextProps {
  size?: number;
  class?: string;
}

export const IconText: Component<IconTextProps> = (props) => {
  const size = () => props.size ?? 14;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size()}
      height={size()}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <polyline points="2.2 3.9 2.2 2.2 9.8 2.2 9.8 3.9" />
      <line x1="4.4" y1="9.8" x2="7.6" y2="9.8" />
      <line x1="6" y1="2.2" x2="6" y2="9.8" />
    </svg>
  );
};
