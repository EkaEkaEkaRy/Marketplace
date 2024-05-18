import React, { useState } from 'react';
import s from './image_add.module.css'

const ImageUploader = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  return (
    <div> 
      <input type="file" accept="image/*" onChange={handleImageUpload} className={s.input}
      />
      {imageFile && (
        <div>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            style={{ width: '15rem', height: '15rem', marginTop: '1rem' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;