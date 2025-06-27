import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const OverdueIcon = ({ fill = "none", stroke = "#00A86B", ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={30}
    fill={fill}
    stroke={stroke}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.773}
      d="M14.75 9.977v6.205M25.481 10.958v8.084c0 1.323-.71 2.553-1.856 3.226l-7.02 4.054a3.738 3.738 0 0 1-3.722 0l-7.02-4.054a3.722 3.722 0 0 1-1.856-3.226v-8.084c0-1.323.71-2.553 1.856-3.226l7.02-4.054a3.738 3.738 0 0 1 3.723 0l7.02 4.054a3.737 3.737 0 0 1 1.855 3.226Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.364}
      d="M14.75 19.964v.118"
    />
  </svg>
);

export default OverdueIcon;
