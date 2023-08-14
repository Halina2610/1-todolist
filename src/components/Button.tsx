import React from 'react';
type ButtonPropsType = {
    text: string
}
export const Button = (props: ButtonPropsType) => {
    return <button >{props.text}</button>
};

