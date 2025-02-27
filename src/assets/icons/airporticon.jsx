

import React from "react";

const airporticon = ({ fill, height, width }) => {
  return (
 
<svg
  width={width}
      height={height} viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.5641 0L25.9051 1.39157L16.9219 9.90393L23.6434 13.9322L27.1906 12.1501L29 13.1591L25.302 16.5609L23.945 21.6716L22.1357 20.5892L21.9849 16.7155L15.2634 12.7686L12.2478 25L9.90683 23.527V9.44007L1.22512 4.17478C0.241068 3.62957 -0.362035 2.70177 0.241068 1.61947C0.844171 0.691679 1.89964 0.691679 2.88361 1.31021L11.5653 6.5755L23.5641 0Z" 
 fill={fill ? fill : "#DADADA"} />
</svg>

  );
};

export default airporticon;
