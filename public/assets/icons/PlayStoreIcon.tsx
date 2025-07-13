import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

const PlayStoreIcon: React.FC<SvgProps> = ({ color = "#004C42", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={20}
    fill="none"
    viewBox="0 0 19 20"
    {...props}
  >
    <path
      fill={color}
      d="m1.137 1.51 8.74 8.571-8.675 8.65a2.1 2.1 0 0 1-.326-.613 2.5 2.5 0 0 1 0-.755V2.643c-.026-.395.065-.79.26-1.133m12.506 4.833L10.79 9.169 2.153.676c.28-.097.58-.124.873-.078.46.126.9.32 1.302.573l7.816 4.325c.508.273 1.003.56 1.498.847Zm-2.852 4.663 2.84 2.788-2.059 1.146-6.279 3.49c-.52.287-1.042.561-1.55.874a1.802 1.802 0 0 1-1.472.195l8.52-8.493Zm7.36-.925a1.92 1.92 0 0 1-.99 1.72l-2.346 1.302-3.087-3.022 3.1-3.074c.795.443 1.577.886 2.358 1.303a1.89 1.89 0 0 1 .965 1.771Z"
    />
  </svg>
);

export default PlayStoreIcon;
