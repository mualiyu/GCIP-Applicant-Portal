import React from "react";
import "./styles/loading.css";
import ClipLoader from "react-spinners/ClipLoader";

import LoadingImage from "../assets/Images/load.gif";
// import { DotLoader } from "react-spinners";
import {MoonLoader} from "react-spinners";
interface LoadingProps {
  loading: boolean;
  size: 60
}

export default function Loading({ loading, size}: LoadingProps) {
  return (
    <div className={`loading ${loading ? "active" : null}`}>
      {/* <img src={LoadingImage} /> */}
      <MoonLoader color="#006438"
      loading={loading}
      size={size}
      speedMultiplier={0.6}
      aria-label="Loading Spinner"
      data-testid="loader" />
      {/* <DotLoader
        color='#33745d'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
     
    </div>
  );
}
