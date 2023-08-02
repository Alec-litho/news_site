import React from "react";

function Account(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      data-name="Layer 1"
      viewBox="0 0 24 30"
      {...props}
    >
      <path d="M12 2a10 10 0 00-5.56 18.31A10 10 0 0022 12 10.016 10.016 0 0012 2zM7.56 18.65a5.838 5.838 0 01-.56-.42V18a5 5 0 015-5 3 3 0 113-3 3 3 0 01-3 3 4.985 4.985 0 015 5v.23a5.838 5.838 0 01-.56.42 8.089 8.089 0 01-8.88 0z"></path>
      <text
        y="39"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
        fontSize="5"
        fontWeight="bold"
      >
      </text>
      <text
        y="44"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
        fontSize="5"
        fontWeight="bold"
      >
      </text>
    </svg>
  );
}

export default Account;