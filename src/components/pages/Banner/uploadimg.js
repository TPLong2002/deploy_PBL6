import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageUpload({ onImageUpload }) {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleAddImage = () => {
    if (image) {
      onImageUpload(image);
      setImage(null);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-2 p-4 hover:cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Kéo và thả hoặc nhấn để tải lên ảnh</p>
      </div>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Tải lên ảnh" className="max-w-full max-h-96" />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300"
            onClick={handleAddImage}
          >
            Thêm ảnh
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
