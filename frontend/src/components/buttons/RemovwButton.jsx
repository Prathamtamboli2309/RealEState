import React from "react";

const RemoveButton = ({ handleRemovePlace }) => {
  return (
    <button onClick={handleRemovePlace}>
      <img src="/save.png" alt="" />
      Remove from Saved
    </button>
  );
};

export default RemoveButton;
