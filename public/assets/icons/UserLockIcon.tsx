import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const UserLockIcon = ({
  fill = "none",
  stroke = "#00A86B",
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />

    <path
      className={className}
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14v8H4a8 8 0 0 1 8-8z"
    />

    <path
      className={className}
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"
    />

    <path
      className={className}
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 17h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1z"
    />

    <path
      className={className}
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 17v-1a1 1 0 0 0-2 0v1h2z"
    />
  </svg>
);

export default UserLockIcon;
