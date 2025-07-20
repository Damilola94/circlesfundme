import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const LoanIcon = ({
  fill = "none",
  className = "",
  stroke = "#00A86B",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={30}
    fill={fill}
    {...props}
  >
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.773}
      d="M13.025 20.744v2.4c0 2.032-1.891 3.675-4.22 3.675-2.328 0-4.23-1.643-4.23-3.676v-2.399c0 2.033 1.89 3.475 4.23 3.475 2.329 0 4.22-1.454 4.22-3.475Z"
    />
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.773}
      d="M13.023 17.494c0 .59-.166 1.134-.45 1.607-.697 1.146-2.127 1.867-3.781 1.867-1.655 0-3.085-.733-3.782-1.867a3.1 3.1 0 0 1-.45-1.607c0-1.017.474-1.927 1.23-2.589.768-.673 1.82-1.075 2.99-1.075 1.17 0 2.222.414 2.99 1.075.78.65 1.253 1.572 1.253 2.589Z"
    />
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.773}
      d="M13.025 17.494v3.25c0 2.032-1.891 3.474-4.22 3.474-2.328 0-4.23-1.453-4.23-3.474v-3.25c0-2.033 1.89-3.676 4.23-3.676 1.17 0 2.222.414 2.99 1.076.757.661 1.23 1.583 1.23 2.6ZM26.318 13.783v2.434c0 .65-.52 1.182-1.182 1.206H22.82c-1.276 0-2.446-.934-2.553-2.21a2.374 2.374 0 0 1 .71-1.927 2.356 2.356 0 0 1 1.701-.709h2.458a1.213 1.213 0 0 1 1.182 1.206Z"
    />
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.773}
      d="M2.682 13.227v-2.363c0-3.215 1.938-5.46 4.952-5.839a6.29 6.29 0 0 1 .957-.07h10.636c.308 0 .603.011.887.059 3.049.354 5.022 2.611 5.022 5.85v1.713h-2.458c-.662 0-1.264.26-1.702.71a2.374 2.374 0 0 0-.709 1.926c.107 1.276 1.277 2.21 2.553 2.21h2.316v1.713c0 3.546-2.363 5.91-5.909 5.91h-2.954"
    />
  </svg>
);

export default LoanIcon;
