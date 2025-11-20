"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
interface DropdownOption {
    value: string;
    label: string;
}

interface SimpleDropdownProps {
    options: DropdownOption[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
    options,
    onSelect,
    placeholder = "اختر"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(placeholder);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (value: string, label: string) => {
        console.log("Selected:", value, label);
        setSelectedLabel(label);
        onSelect(value);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    textAlign: 'right' as const,
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#D9AA52';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                }}
            >
                <span>{selectedLabel}</span>
                <span style={{ 
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    fontSize: '12px'
                }}>
                <FaChevronDown size={16}/>
                </span>
            </div>
            
            {isOpen && (
                <div 
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '4px',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        zIndex: 1000,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                >
                    {options.map((option, index) => (
                        <div
                            key={option.value || `option-${index}`}
                            onClick={() => handleSelect(option.value, option.label)}
                            style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                textAlign: 'right',
                                borderBottom: '1px solid #f7fafc',
                                backgroundColor: selectedLabel === option.label ? '#edf2f7' : 'white',
                                transition: 'background-color 0.2s ease',
                                fontSize: '15px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f7fafc';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = selectedLabel === option.label ? '#edf2f7' : 'white';
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SimpleDropdown;