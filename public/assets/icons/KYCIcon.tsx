import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const KYCIcon = ({ fill = "none", className = "",stroke = "#00A86B", ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={29} height={30} fill={fill} {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      className={className}
      strokeLinejoin="round"
      strokeWidth={1.773}
      d="M20.16 25.636H8.34c-4.726 0-5.908-1.181-5.908-5.909v-9.454c0-4.728 1.182-5.91 5.909-5.91h11.818c4.727 0 5.91 1.182 5.91 5.91v9.454c0 4.727-1.183 5.91-5.91 5.91ZM16.614 10.273h5.909M17.796 15h4.727M20.16 19.727h2.363"
    />
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.773}
      d="M10.114 14.16a2.14 2.14 0 1 0 0-4.277 2.14 2.14 0 0 0 0 4.278ZM14.25 20.117a3.57 3.57 0 0 0-3.238-3.214 9.122 9.122 0 0 0-1.797 0 3.58 3.58 0 0 0-3.238 3.214"
    />
  </svg>
);

export default KYCIcon;
