"use client";
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowPopup(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowPopup(false);
    };

    if (!showPopup) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
            <div>
                We use cookies to improve your experience. By using our site, you agree to our use of cookies.
            </div>
            <button onClick={handleAccept} className="bg-blue-500 text-white px-4 py-2 rounded">
                Accept
            </button>
        </div>
    );
};

export default CookieConsent;