import * as React from "react"
import { SVGProps } from "react"

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{
      display: "block",
      height: "100%",
      width: "100%",
    }}
    {...props}
  >
    <path d="M16 .7C7.563.7.7 7.563.7 16S7.563 31.3 16 31.3 31.3 24.437 31.3 16 24.437.7 16 .7zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4A6.507 6.507 0 0 1 9.5 14c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1-3.019 5.491 12.42 12.42 0 0 1 6.452 4.4C23.605 26.816 20.021 28.7 16 28.7z" />
  </svg>
)

export default UserIcon
