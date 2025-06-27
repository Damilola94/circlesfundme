import * as React from "react"
const SMSIcon = (props: any) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={24}
  fill="none"
  display="block"
  {...props}
  >
    <path
      stroke="#00A86B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8.75 19h-.5c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4Z"
    />
    <path
      stroke="#00A86B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.247 11h.008M12.245 11h.01M8.245 11h.008"
    />
  </svg>
)
export default SMSIcon
