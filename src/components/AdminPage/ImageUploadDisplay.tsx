// components/ImageUploadDisplay.tsx
import React, { useState } from 'react';

interface ImageUploadDisplayProps {
    images: string[]; // Array of image URLs
    onImagesChange: (newImages: string[]) => void;
}

const ImageUploadDisplay: React.FC<ImageUploadDisplayProps> = ({ images, onImagesChange }) => {
    const [currentImages, setCurrentImages] = useState<string[]>(images);

    // Mock function to simulate adding an image
    const handleAddImage = () => {
        if (currentImages.length < 4) {
            const newImage = `https://via.placeholder.com/150/CCCCCC/000000?text=Image+${currentImages.length + 1}`;
            const updatedImages = [...currentImages, newImage];
            setCurrentImages(updatedImages);
            onImagesChange(updatedImages);
        } else {
            alert("You can add a maximum of 4 images.");
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const updatedImages = currentImages.filter((_, index) => index !== indexToRemove);
        if (updatedImages.length < 1) {
             alert("You must have at least 1 image.");
             return;
        }
        setCurrentImages(updatedImages);
        onImagesChange(updatedImages);
    };

    // This would be where actual file upload logic would go
    const handleUploadImages = () => {
        alert("Simulating image upload...");
        // In a real application, you'd open a file picker here
    };

    return (
        <div>
            <div className="flex flex-wrap gap-4 mb-4 items-center">
                {currentImages.map((imgUrl, index) => (
                    <div key={index} className="relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden group">
                        <img src={imgUrl} alt={`Room Image ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                            disabled={currentImages.length <= 1} // Disable if only one image left
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                {currentImages.length < 4 && (
                    <div
                        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors"
                        onClick={handleAddImage} // Use handleAddImage for quick mock addition
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
            <button
                onClick={handleUploadImages}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-100 text-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span>Upload Images</span>
            </button>
        </div>
    );
};

export default ImageUploadDisplay;