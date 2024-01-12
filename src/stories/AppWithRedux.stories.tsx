import type {Meta, StoryObj} from '@storybook/react';
import {App} from "../App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: "App With Redux Stories ",
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}
// More on how to set up stories at:
type Story = StoryObj<typeof App>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {}
