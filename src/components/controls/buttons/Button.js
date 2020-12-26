import React from 'react';

import './Button.scss';

const Button = ({children,type="submit"}) => {
    return (
        <>
            <button type={type} className="primary-button">{ children }</button>
        </>
    );
}

export default Button;