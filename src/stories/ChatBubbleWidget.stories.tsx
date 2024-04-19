import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BubbleChat } from "../components/Chat";
import { ActionProvider, useRegisterFunction } from "../index";

function ChatActionStory({
  botId,
  chatUserId,
}: {
  botId: string;
  chatUserId: string;
}) {
  return (
    <ActionProvider>
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
  const [color, setColor] = React.useState("white" as string);
  useRegisterFunction(({name}
  : {name: string}
  ) => {
    console.log(`Hello, ${name}!`);
  }, [], {
    name: "greet",
    description: "A function that greets the world.",
    properties: {
      name: {
        type: "string",
        description: "The name of the user to greet.",
      },
    },
  });

  useRegisterFunction(({color}
  : {color: string}
  ) => {
    console.log(`Changing background color to ${color}`);
    setColor(color);
  }, [], {
    name: "change-background-color",
    description: "A function that changes the background color of the website.",
    properties: {
      color: {
        type: "string",
        description: "Any CSS color value (e.g. 'red', '#ff0000', 'rgb(255, 0, 0)').",
      },
    },
  });

  return (
    <>
      <div style={{ 
        height: "100svh",
        width: "100svw", 
        backgroundColor: color, 
        position: "absolute",
        zIndex: -1, 
        transition: "background-color 2s ease-in-out"
      }} />
      <div style={{ height: "95vh", overflow: "hidden" }}>
        <BubbleChat botId={botId} userId={chatUserId} domain={'https://monkey-bright-closely.ngrok-free.app'} />
      </div>
    </>
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
