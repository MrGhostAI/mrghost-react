import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ActionContext, ActionProvider } from "../contexts/index";
import { BubbleChat } from "../components/Chat";

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
  const { registerFunction } = React.useContext(ActionContext);
  const [color, setColor] = React.useState("white" as string);
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

  React.useEffect(() => {
    console.log("registering function...");
    registerFunction({
      name: "change-background-color",
      fn: ({color}: {color: string}) => {
        console.log(`Changing background color to ${color}`);
        setColor(color);
        return "success"
      },
      parameters: {
        type: "object",
        properties: {
          color: {
            type: "string",
            description: "Any CSS color value (e.g. 'red', '#ff0000', 'rgb(255, 0, 0)').",
          },
        },
      },
      description: "A function that changes the background color of the website.",
    });
  }, []);

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
