'use client';

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ChatApp } from "../components";
import { ActionContext, ActionProvider } from "../contexts/index";

function ChatActionStory({
  botId,
  chatUserId,
}: {
  botId: string;
  chatUserId: string;
}) {
  return (
    <ActionProvider botId={botId} userId={chatUserId}>
      <WidgetStory botId={botId} chatUserId={chatUserId} />
    </ActionProvider>
  );
}

function WidgetStory({
  botId,
  chatUserId,
}: {
  botId: string;
  chatUserId: string;
}) {
  const { registerFunction } = React.useContext(ActionContext);
  React.useEffect(() => {
    console.log("registering function...");
    registerFunction({
      name: "greet",
      fn: (name: string) => {
        console.log(`Hello, ${name}!`);
      },
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user to greet.",
          },
        },
      },
      description: "A function that greets the user.",
    });
  }, []);

  return (
    <div style={{ height: "95vh", overflow: "hidden" }}>
      <ChatApp botId={botId} userId={chatUserId} domain={'https://monkey-bright-closely.ngrok-free.app'} />
    </div>
  );
}

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ChatActionStory> = {
  component: ChatActionStory,
};

export default meta;
type Story = StoryObj<typeof ChatActionStory>;

export const FirstStory: Story = {
  // harded code values for now 😬
  args: {
    botId: "66124d189831d51b235a175d",
    chatUserId: "",
  },
};
