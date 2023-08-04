import * as React from "react"

function Lock(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M6 8V6a6 6 0 0112 0v2h-2V6c0-2.206-1.795-4-4-4S8 3.794 8 6v2H6zm15 2v14H3V10h18zm-2 2H5v10h14V12z"
      />
    </svg>
  )
}

export default Lock
