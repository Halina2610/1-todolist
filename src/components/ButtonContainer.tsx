import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import {FilterValuesType} from "../AppWithRedux";

type ButtonContainerProps = {
    filter: FilterValuesType;
    onClick: () => void;
    color: 'inherit' | 'primary' | 'secondary';
    variant: 'text' | 'outlined';
    children: React.ReactNode;
};

export const ButtonContainer: React.FC<ButtonContainerProps> = React.memo(
    ({ filter, onClick, color, variant, children }) => {
        const handleClick = useCallback(() => {
            onClick();
        }, [onClick]);

        return (
            <Button
                variant={variant}
                onClick={handleClick}
                color={color}
            >
                {children}
            </Button>
        );
    }
);