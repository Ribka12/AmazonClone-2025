import React from "react";
import { BeatLoader } from "react-spinners";

function Loder() {
  return (
    <>
      <BeatLoader
        color="#46a6f0"
        size={20}
        margin={7}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    </>
  );
}

export default Loder;
