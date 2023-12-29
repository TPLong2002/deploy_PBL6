import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function ImageUpload({ onImageUpload, itemId }) {
  const [image, setImage] = useState(null);
  const [ImageUpload, setImageUpload] = useState(null);
  const cloud_name = "dte2ps5qs";
  const preset_key = "jfxz5xk3";

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUpload(reader.result);
      setImage(file);
    };

    reader.readAsDataURL(file);
    // const file = acceptedFiles[0];
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleAddImage = async () => {
    // const reader = new FileReader();

    // reader.onload = () => {
    //   setImageUpload(reader.result);
    // };

    // reader.readAsDataURL(file);
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset_key); // Replace with your Cloudinary upload preset

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      await axios.post(
        "http://api.shopiec.shop/api/imageitems",
        [
          {
            itemId,
            image: data.secure_url,
          },
        ],
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      onImageUpload({ id: 0, image: ImageUpload });
      setImageUpload(null);
      setImage(null);
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="border-2 p-4 hover:cursor-pointer">
        <input {...getInputProps()} />
        <p>Kéo và thả hoặc nhấn để tải lên ảnh</p>
      </div>
      {image && (
        <div className="mt-4">
          <img
            src={ImageUpload}
            alt="Tải lên ảnh"
            className="max-w-full max-h-96"
          />
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
