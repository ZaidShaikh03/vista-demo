import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./loader";

const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, [location]);

  return isLoading ? <Loader /> : children;
};

export default PageLoader;
