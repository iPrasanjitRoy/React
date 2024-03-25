import React, { useState } from 'react';

export default function DarkMode() {

    const [myStyle, setMyStyle] = useState({
        color: 'black',
        backgroundColor: 'white',
        border: '2px solid white'
    });

    const [buttonText, setButtonText] = useState('Enable Dark Mode');

    const toggleDarkMode = () => {
        if (myStyle.color === 'black') {
            setMyStyle({
                color: 'white',
                backgroundColor: 'black',
                border: '2px solid white',
            });
            setButtonText('Enable Light Mode');
        } else {
            setMyStyle({
                color: 'black',
                backgroundColor: 'white',
            });
            setButtonText('Enable Dark Mode');
        }
    };

    return (
        <div style={myStyle} className='Darkcontainer'> 
            <h1>Dark Mode Demo</h1>
            <p>THIS IS A SIMPLE DARK MODE DEMO</p>
            <button onClick={toggleDarkMode}>{buttonText}</button>
        </div>
    );
}
