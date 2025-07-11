import React, { useRef } from 'react';

interface ImageUploadDisplayProps {
  images: File[]; // ✅ เปลี่ยนจาก string[] เป็น File[]
  onImagesChange: (newImages: File[]) => void;
}

const ImageUploadDisplay: React.FC<ImageUploadDisplayProps> = ({ images, onImagesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = () => {
    if (images.length >= 4) {
      alert('You can add a maximum of 4 images.');
      return;
    }
    fileInputRef.current?.click(); // เปิด dialog
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const total = images.length + selectedFiles.length;

      if (total > 4) {
        alert('You can upload up to 4 images only.');
        return;
      }

      const newImages = [...images, ...selectedFiles];
      onImagesChange(newImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      alert('You must have at least 1 image.');
      return;
    }
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {images.map((file, index) => (
          <div key={index} className="relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden group">
            <img
              src={URL.createObjectURL(file)}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="cursor-pointer absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        {images.length < 4 && (
          <div
            onClick={handleAddImage}
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs mt-1">Add Image</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadDisplay;
