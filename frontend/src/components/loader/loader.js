import React from "react";
import { GooeyCircleLoader } from "react-loaders-kit";
import ("./loader.css")

function Loader() {

  const loaderProps = {
    loading: true,
    size: 275,
    duration: 2,
    colors: ["#e8ecef", "#febe4c", "#042549"],
  };

  return (
    <div className="loader">
        <GooeyCircleLoader {...loaderProps} />
    </div>
  );
}

export default Loader;