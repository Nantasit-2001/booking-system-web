import React, { useState, useEffect } from "react";

interface CardImageProps {
    images: string[];
    className?: string;
    heightClass?: string; // e.g. "h-56 md:h-96"
}

const CardImage: React.FC<CardImageProps> = ({
    images,
    className = "",
    heightClass = "h-56 md:h-96",
}) => {
    const [current, setCurrent] = useState(0);

    const prevImage = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // เพิ่ม useEffect สำหรับ auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div id="gallery" className={`relative w-full ${className}`}>
            {/* Carousel wrapper */}
            <div className={`relative ${heightClass} overflow-hidden rounded-2xl`}>
                {!images?null:images.map((img, idx) => {
                    // Determine slide position for animation
                    let classNames =
                        "absolute inset-0 transition-all duration-700 ease-in-out";
                    if (idx === current) {
                        classNames += " opacity-100 translate-x-0 z-20";
                    } else if (
                        idx === (current === 0 ? images.length - 1 : current - 1)
                    ) {
                        classNames += " opacity-0 -translate-x-full z-10";
                    } else if (
                        idx === (current === images.length - 1 ? 0 : current + 1)
                    ) {
                        classNames += " opacity-0 translate-x-full z-10";
                    } else {
                        classNames += " opacity-0";
                    }
                    return (
                        <div
                            key={img}
                            className={classNames}
                            data-carousel-item={idx === current ? "active" : undefined}
                        >
                            <img
                                src={img}
                                className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={prevImage}
                aria-label="Previous"
            >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-2 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-2 h-2 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={nextImage}
                aria-label="Next"
            >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-2 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-2 h-2 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default CardImage;