import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

const SecurityIcon: React.FC<SvgProps> = ({ color = "#00A86B", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    viewBox="0 0 15 19"
    {...props}
  >
    <path
      fill={color}
      d="M13.024 7.745h-.97V5.023s0-4.538-4.538-4.538-4.538 4.538-4.538 4.538v2.722h-.97A1.751 1.751 0 0 0 .255 9.497v7.396a1.751 1.751 0 0 0 1.751 1.742h11.017a1.751 1.751 0 0 0 1.752-1.752V9.498a1.752 1.752 0 0 0-1.752-1.752Zm-8.23-2.269c0-1.36 0-3.176 2.722-3.176s2.722 1.815 2.722 3.176v2.27H4.793v-2.27Zm2.722 9.53a1.815 1.815 0 1 1 0-3.631 1.815 1.815 0 0 1 0 3.63Z"
    />
  </svg>
);

export default SecurityIcon;
