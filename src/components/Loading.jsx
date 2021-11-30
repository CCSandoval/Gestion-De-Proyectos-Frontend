import React from "react";
import Loader from "react-loader-spinner";
const Loading = () => {
  return (
    <Loader
      className="relative top-1/2 left-1/2 transform -translate-x-1/2, -translate-y-1/2"
      type="RevolvingDot"
      color="#000"
      height={100}
      width={100}
    />
  );
};

export default Loading;
