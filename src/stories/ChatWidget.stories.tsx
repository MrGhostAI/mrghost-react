import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ChatWidget } from "../components";
import { ActionContext, ActionProvider} from "../contexts/index";

function ChatActionStory({ botId, chatUserId }: { botId: string; chatUserId: string }) {

  return (
    <ActionProvider>
      <WidgetStory botId={botId} chatUserId={chatUserId} />
    </ActionProvider>
  );
}

function WidgetStory({ botId, chatUserId }: { botId: string; chatUserId: string }) {
  const {registerFunction} = React.useContext(ActionContext);
  React.useEffect(() => {
    console.log("registering function...");
    registerFunction({
      name: "greet",
      fn: () => {
        console.log("Hello, world!");
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

  return <ChatWidget botId={botId} chatUserId={chatUserId} />;
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
    botId: "65b80bd8e0c7a0bb5501ca56",
    chatUserId: "65b807e2e0c7a0bb5501ca36",
  },
};
