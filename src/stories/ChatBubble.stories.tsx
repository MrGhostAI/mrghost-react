import type { Meta, StoryObj } from "@storybook/react";

import { ChatBubble } from "../components";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ChatBubble> = {
  component: ChatBubble,
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
