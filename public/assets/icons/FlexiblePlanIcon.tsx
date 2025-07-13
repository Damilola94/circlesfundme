import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

const FlexiblePlanIcon: React.FC<SvgProps> = ({ color = "#00A86B", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <mask
      id="a"
      width={27}
      height={27}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{ maskType: "luminance" }}
    >
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={1.77}
        d="M1.36 7.675h16.81v9.733a.885.885 0 0 1-.884.885H2.244a.885.885 0 0 1-.885-.885V7.675Z"
      />
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={1.77}
        d="M1.36 3.693a.885.885 0 0 1 .884-.884h15.042a.885.885 0 0 1 .885.884v3.982H1.359V3.693Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.77}
        d="m6.227 12.984 2.654 2.655 5.309-5.31"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.77}
        d="M6.227 1.481v3.54m7.078-3.54v3.54"
      />
    </mask>
    <g mask="url(#a)">
      <rect x={-1} y={-1} width={22} height={22} fill={color} />
    </g>
  </svg>
);

export default FlexiblePlanIcon;
