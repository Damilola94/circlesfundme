import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const ProfileCardIcon = ({
  fill = "none",
  stroke = "#163300",
  className = "",
  width = 24,
  height = 24,
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 118 118"
    fill={fill}
    {...props}
  >
    <path
      d="M68.8334 44.25H88.5"
      stroke={stroke}
      strokeWidth={8.5}
      strokeLinecap="round"
      className={className}
    />
    <path
      d="M68.8334 61.4583H83.5834"
      stroke={stroke}
      strokeWidth={8.5}
      strokeLinecap="round"
      className={className}
    />
    <path
      d="M83.5834 14.75H34.4167C20.8397 14.75 9.83337 25.7563 9.83337 39.3333V78.6667C9.83337 92.2437 20.8397 103.25 34.4167 103.25H83.5834C97.1604 103.25 108.167 92.2437 108.167 78.6667V39.3333C108.167 25.7563 97.1604 14.75 83.5834 14.75Z"
      stroke={stroke}
      strokeWidth={8.5}
      strokeLinejoin="round"
      className={className}
    />
    <path
      d="M24.5834 78.6667C30.5242 65.9763 52.6684 65.1414 59 78.6667"
      stroke={stroke}
      strokeWidth={8.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    />
    <path
      d="M51.625 44.25C51.625 49.681 47.2225 54.0833 41.7917 54.0833C36.3609 54.0833 31.9584 49.681 31.9584 44.25C31.9584 38.8192 36.3609 34.4167 41.7917 34.4167C47.2225 34.4167 51.625 38.8192 51.625 44.25Z"
      stroke={stroke}
      strokeWidth={8.5}
      className={className}
    />
  </svg>
);

export default ProfileCardIcon;
