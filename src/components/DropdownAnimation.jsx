import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const ExpandableBox = ({ isExpanded, children }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isExpanded ? height : 0,
        opacity: isExpanded ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

export default ExpandableBox;
