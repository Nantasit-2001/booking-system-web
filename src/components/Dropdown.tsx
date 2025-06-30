import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface DropdownProps {
    label: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
    onClear?: () => void; // Optional prop for clearing the selection
}

export interface DropdownRef {
    clearSelection: () => void;
}

const Dropdown = forwardRef<DropdownRef, DropdownProps>(({ label, options, selectedValue, onSelect, onClear }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Expose clearSelection function to parent component via ref
    useImperativeHandle(ref, () => ({
        clearSelection() {
            onSelect(''); // Clear the selection by setting it to an empty string or a default 'Select...'
            setIsOpen(false); // Close the dropdown after clearing
            if (onClear) {
                onClear(); // Call the optional onClear prop if provided
            }
        }
    }));

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left w-full">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id={`menu-button-${label.replace(/\s/g, '-')}`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className='flex items-center justify-between w-full'>
                        {selectedValue || `Select ${label}`} {/* Display selectedValue or a default prompt */}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </button>
            </div>
            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`menu-button-${label.replace(/\s/g, '-')}`}
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {options.map((option) => (
                            <a
                                key={option}
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                role="menuitem"
                                tabIndex={-1}
                                id={`menu-item-${option.replace(/\s/g, '-')}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSelect(option);
                                    setIsOpen(false);
                                }}
                            >
                                {option}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default Dropdown;