import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const CommunicationIcon = ({
  fill = "none",
  className = "",
  stroke = "#004C42",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill={fill}
    {...props}
  >
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8.5 19.229H8c-4 0-6-1-6-6v-5c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4Z"
    />
    <path
      stroke={stroke}
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 8.228h10M7 13.229h6"
    />
  </svg>
);

export default CommunicationIcon;
