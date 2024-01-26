import { useState } from 'react';

const useImageUpload = () => {
  const [image, setImageData] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    transformFileData(file);
  };

  const transformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageData(reader.result);
      };
    } else {
      setImageData('');
    }
  };

  return { image, handleImageUpload };
};

export default useImageUpload;
