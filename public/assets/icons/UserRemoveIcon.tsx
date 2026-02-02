import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

const UserRemoveIcon = ({
  width = 22,
  height = 22,
  fill = "#00A86B",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 328 328"
    width={width}
    height={height}
    fill={fill}
    {...props}
  >
    <g>
      <path d="M223 116.75c-34.488 0-65.144 16.716-84.297 42.47-7.763-1.628-15.695-2.47-23.703-2.47-63.411 0-115 51.589-115 115 0 8.284 6.716 15 15 15h125.596c19.247 24.348 49.031 40 82.404 40 57.897 0 105-47.103 105-105s-47.103-105-105-105Z" />
      <path d="M253 206.75h-60c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15h60c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15Z" />
      <path d="M115 126.75c34.601 0 62.751-28.149 62.751-62.749C177.751 29.4 149.601 1.25 115 1.25 80.399 1.25 52.25 29.4 52.25 64.001c0 34.6 28.149 62.749 62.75 62.749Z" />
    </g>
  </svg>
);

export default UserRemoveIcon;
