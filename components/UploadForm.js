import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const typeList = ["image/png", "image/jpeg"];
  const handleChange = (e) => {
    // console.log(e.target.files);
    let selectedImage = e.target.files[0];
    if (selectedImage && typeList.includes(selectedImage.type)) {
      setFile(selectedImage);
      setError(null);
    } else {
      setFile(null);
      setError("Please select image with '.png' or '.jpg/jpeg' file type.");
    }
  };
  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
};

export default UploadForm;
