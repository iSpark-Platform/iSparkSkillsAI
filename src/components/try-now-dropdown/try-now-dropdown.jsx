import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const TryNowDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div 
            className="try-now-dropdown-wrapper"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            <button 
                ref={buttonRef}
                className="edu-btn btn-medium try-now-btn try-now-btn-custom"
            >
                Try Now <i className="icon-4"></i>
            </button>
            
            <div 
                ref={dropdownRef}
                className={`try-now-dropdown ${showDropdown ? 'show' : ''}`}
            >
                <div className="dropdown-wrapper">
                    <ul className="dropdown-menu-items">
                        <li>
                            <Link href="/login">
                                <span className="dropdown-item">
                                    <i className="icon-56"></i>
                                    Login
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact-us">
                                <span className="dropdown-item">
                                    <i className="icon-64"></i>
                                    Join as Instructor
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TryNowDropdown;