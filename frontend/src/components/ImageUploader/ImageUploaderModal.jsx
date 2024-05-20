// ImageUploaderModal.jsx

import React from "react";

const ImageUploaderModal = ({ isOpen, onClose }) => {
  const handleFileUpload = (event) => {
    const files = event.target.files;
    // Handle file upload logic here
    console.log("Uploaded files:", files);
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Image Uploader</h2>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default ImageUploaderModal;
