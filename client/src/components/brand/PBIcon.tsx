import * as React from "react"
import { SVGProps } from "react"
const PBIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 64 64",
    }}
    viewBox="0 0 64 64"
    {...props}
  >
    <path
      d="M19.59 54H17.9a5.46 5.46 0 0 1-5.46-5.46V14.46A5.46 5.46 0 0 1 17.9 9h1.69a5.46 5.46 0 0 1 5.46 5.46v34.08A5.46 5.46 0 0 1 19.59 54z"
      style={{
        fill: "#58ae58",
      }}
    />
    <path
      d="M34.49 49.99H32.8a5.46 5.46 0 0 1-5.46-5.46V27.09a5.46 5.46 0 0 1 5.46-5.46h1.69a5.46 5.46 0 0 1 5.46 5.46v17.43a5.456 5.456 0 0 1-5.46 5.47z"
      style={{
        fill: "#9989c0",
      }}
    />
    <path
      d="M48.54 40.26h-1.69a5.46 5.46 0 0 1-5.46-5.46V14.46A5.46 5.46 0 0 1 46.85 9h1.69C51.55 9 54 11.45 54 14.46V34.8a5.46 5.46 0 0 1-5.46 5.46z"
      style={{
        fill: "#eb5c54",
      }}
    />
  </svg>
)
export default PBIcon
