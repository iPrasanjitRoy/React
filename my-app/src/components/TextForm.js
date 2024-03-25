import React, { useState } from 'react';

export default function TextForm() {
    const [text, setText] = useState("ENTER YOUR TEXT");

    const buttonClicked = () => {
        console.log(text);
        let newText = text.toUpperCase();
        setText(newText);
    }

    const buttonOnChange = (event) => {
        console.log(event.target.value);
        setText(event.target.value);
    }

    return (
        <>
            <div className='form'>
                <h1>Convert To Upper Case</h1>

                <label htmlFor="YourText">Your Text:</label>
                <textarea id="YourText" name="YourText" rows="5" value={text} onChange={buttonOnChange} required></textarea>

                <button type="button" onClick={buttonClicked}>Convert Upper Case </button>

            </div>

            <div className='form'>
                <h1>YOUR TEXT Summery </h1>
                <p>{/*} {text.split(" ").length} WORDS AND {text.length} Characters {*/}</p>
                <p>{text.trim() === "" ? "0 WORDS" : text.split(" ").length + " WORDS"} AND {text.length} Characters</p>
                <h2> Preview </h2>
                <p>{text}</p>
            </div>
        </>
    );
}

