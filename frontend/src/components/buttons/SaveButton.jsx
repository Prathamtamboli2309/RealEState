import React from "react";

const SaveButton = ({ handleSavePlace }) => {
  return (
    <button onClick={handleSavePlace}>
      <img src="/save.png" alt="" />
      Save the Place
    </button>
  );
};

export default SaveButton;
