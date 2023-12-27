"use client"
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

const KeyBinding = () => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === '/') {
            // Handle '/' key press
            console.log('Slash key pressed!');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                placeholder="Type here..."
            />
        </div>
    );
};

export default KeyBinding;