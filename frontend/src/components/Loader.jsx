// Loader.js
import React from "react";
import loaderGif from "../assets/loader.gif"; // Adjust the path to your loader GIF

const Loader = () => (
  <div className="loader">
    <img src={loaderGif} alt="Loading..." width="100px" height="100px" />
  </div>
);

export default Loader;
