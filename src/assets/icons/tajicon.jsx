import React from "react";

const tajicon = ({ fill, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_306_4904)">
        <mask
          id="mask0_306_4904"
          maskUnits="userSpaceOnUse"
          x="2"
          y="4"
          width="22"
          height="22"
        >
          <path
            d="M3.83301 5.8335H22.1663"
            stroke="white"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.417 5.8335H6.58366C6.0774 5.8335 5.66699 6.2439 5.66699 6.75016V23.2502C5.66699 23.7564 6.0774 24.1668 6.58366 24.1668H19.417C19.9233 24.1668 20.3337 23.7564 20.3337 23.2502V6.75016C20.3337 6.2439 19.9233 5.8335 19.417 5.8335Z"
            fill="white"
            stroke="white"
            stroke-width="1.83333"
            stroke-linejoin="round"
          />
          <path
            d="M11.167 18.6665H14.8337V24.1665H11.167V18.6665Z"
            stroke="black"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.875 9.5H9.79167M8.875 12.25H9.79167M12.5417 9.5H13.4583M12.5417 12.25H13.4583M16.2083 9.5H17.125M16.2083 12.25H17.125"
            stroke="black"
            stroke-width="1.83333"
            stroke-linecap="round"
          />
          <path
            d="M3.83301 24.1665H22.1663"
            stroke="white"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.8333 18.6665H15.75C16.003 18.6665 16.2129 18.4593 16.1643 18.2109C15.9113 16.9093 14.5909 15.9165 13 15.9165C11.4096 15.9165 10.0887 16.9088 9.83565 18.2109C9.78707 18.4593 9.99698 18.6665 10.25 18.6665H11.1667"
            stroke="black"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </mask>
        <g mask="url(#mask0_306_4904)">
          <path d="M2 4H24V26H2V4Z" fill={fill ? fill : "#DADADA"} />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_306_4904">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(2 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default tajicon;
