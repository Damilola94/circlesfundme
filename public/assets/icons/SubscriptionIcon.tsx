import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const SubscriptionIcon = ({ fill = "none",className = "", stroke = "#004C42", ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill={fill} {...props}>
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12.265c0 .77.6 1.4 1.33 1.4h1.5c.64 0 1.16-.55 1.16-1.22 0-.73-.32-.99-.79-1.16l-2.4-.84c-.48-.17-.8-.43-.8-1.16 0-.67.52-1.22 1.16-1.22h1.5c.74.01 1.34.63 1.34 1.4M10 13.715v.74M10 7.275v.78"
    />
    <path
      stroke={stroke}
      strokeLinecap="round"
      className={className}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.99 18.845a7.99 7.99 0 1 0 0-15.98 7.99 7.99 0 0 0 0 15.98ZM12.98 20.745c.9 1.27 2.37 2.1 4.05 2.1 2.73 0 4.95-2.22 4.95-4.95 0-1.66-.82-3.13-2.07-4.03"
    />
  </svg>
);

export default SubscriptionIcon;
