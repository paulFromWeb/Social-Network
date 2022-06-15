import React from 'react';

const MyButton = ({ children, ...props }) => {
    return (
        <button type="submit" {...props}>{children}</button>
    );
};

export default MyButton;