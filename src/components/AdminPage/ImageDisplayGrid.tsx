// components/ImageDisplayGrid.tsx
import React from 'react';

interface ImageDisplayGridProps {
  images: string[];
}

const ImageDisplayGrid: React.FC<ImageDisplayGridProps> = ({ images }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((url, index) => (
        <div key={index} className="w-32 h-32 border rounded overflow-hidden">
          <img src={url} alt={`Room image ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default ImageDisplayGrid;
