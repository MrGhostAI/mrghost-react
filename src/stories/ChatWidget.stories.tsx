import type { Meta, StoryObj } from "@storybook/react";

import { ChatWidget } from "../components";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ChatWidget> = {
  component: ChatWidget,
};

export default meta;
type Story = StoryObj<typeof ChatWidget>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
