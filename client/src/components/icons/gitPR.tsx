import * as React from "react"
import { SVGProps } from "react"
const GitPR = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M104 64a32 32 0 1 0-40 31v66a32 32 0 1 0 16 0V95a32.06 32.06 0 0 0 24-31Zm-48 0a16 16 0 1 1 16 16 16 16 0 0 1-16-16Zm32 128a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm120-31v-50.37a23.85 23.85 0 0 0-7-17L163.31 56H192a8 8 0 0 0 0-16h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0V67.31L189.66 105a8 8 0 0 1 2.34 5.66V161a32 32 0 1 0 16 0Zm-8 47a16 16 0 1 1 16-16 16 16 0 0 1-16 16Z" />
  </svg>
)
export default GitPR
