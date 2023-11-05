import React from 'react';
import { AddItemForm } from '../components/AddItemForm';
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from '@storybook/react';

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
};
const callback = action(`Button 'add' was pressed inside the form`)
export const AddItemFormBaseExample = () => (
    <AddItemForm addItem={callback} />
);




// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

type Story = StoryObj<typeof AddItemForm>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        addItem: action('Button clicked inside form')
    },
};
