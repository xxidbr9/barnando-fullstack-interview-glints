import * as React from "react"
import { SVGProps } from "react"

const FavoriteFillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{
      display: "block",
      fill: props.fill,
      height: 24,
      width: 24,
      stroke: "#ffffff",
      strokeWidth: 2,
      overflow: "visible",
    }}
    {...props}
  >
    <path d="M16 28c7-4.733 14-10 14-17a6.977 6.977 0 0 0-2.05-4.95A6.981 6.981 0 0 0 23 4a6.979 6.979 0 0 0-4.949 2.05L16 8.101 13.95 6.05A6.981 6.981 0 0 0 9 4a6.979 6.979 0 0 0-4.949 2.05A6.978 6.978 0 0 0 2 11c0 7 7 12.267 14 17z" />
  </svg>
)

export default FavoriteFillIcon
