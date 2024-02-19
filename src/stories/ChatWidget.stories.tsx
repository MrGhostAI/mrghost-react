import type { Meta, StoryObj } from "@storybook/react";

import { ChatWidget } from "../components";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ChatWidget> = {
  component: ChatWidget,
};

export default meta;
type Story = StoryObj<typeof ChatWidget>;

export const FirstStory: Story = {
  // harded code values for now 😬
  args: {
    botId: "65b80bd8e0c7a0bb5501ca56",
    chatUserId: "65b807e2e0c7a0bb5501ca36",
  },
};
