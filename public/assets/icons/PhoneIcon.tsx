import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

const PhoneIcon: React.FC<SvgProps> = ({ color = "#00A86B", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    viewBox="0 0 11 17"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill={color}
        d="M9.016.56h-7a1.5 1.5 0 0 0-1.5 1.5v13a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5v-13a1.5 1.5 0 0 0-1.5-1.5Zm-3.5 15a.999.999 0 1 1 0-2 .999.999 0 1 1 0 2Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.516.56h10v16h-10z" />
      </clipPath>
    </defs>
  </svg>
);

export default PhoneIcon;
