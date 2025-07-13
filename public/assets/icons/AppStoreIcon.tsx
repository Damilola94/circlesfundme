import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

const AppStoreIcon: React.FC<SvgProps> = ({ color = "#004C42", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={19}
    fill="none"
    viewBox="0 0 16 19"
    {...props}
  >
    <path
      fill={color}
      d="M13.05 17.356c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35-4.88-5.03-4.16-12.69 1.38-12.97 1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01ZM8.03 4.326c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"
    />
  </svg>
);

export default AppStoreIcon;
