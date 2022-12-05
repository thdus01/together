import React from 'react';

import './Button.css';

function Button({ btnName, spanStyle, btnStyle, customClickEvent }) {

    return (
        <button className='button-style' style={btnStyle} onClick={customClickEvent}>
            <span style={spanStyle}>
                {btnName}
            </span>
        </button>
    )

}

export default Button;