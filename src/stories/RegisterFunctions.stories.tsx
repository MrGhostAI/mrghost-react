import React, { useState, useContext } from 'react';
import type { Meta, StoryObj } from "@storybook/react";

import { useRegisterAction, ActionProvider, ActionContext } from '..';


interface ParagraphProps {
  text: string;
  id: number;
}

export const Paragraph: React.FC<ParagraphProps> = ({ text, id }) => {
  const [color, setColor] = useState<string>('black');

  const handleChangeColor = (newColor: string) => {
    setColor(newColor);
  };

  console.log(`change color of paragraph ${id}`);

  useRegisterAction({
    name: `change color of paragraph ${id}`,
    description: 'Change the color of the paragraph',
    parameters: {
      newColor: {
        type: 'string',
        description: 'The new color for the paragraph',
      },
    },
    fn: handleChangeColor,
  });

  return (
    <p style={{ color }} onClick={() => handleChangeColor('blue')}>
      {text}
    </p>
  );
};

const TestChatBubble = () => {
  const { functions } = useContext(ActionContext);
  return (
    <>
    <h3>Test Chat Bubble Functions</h3>
    <ul>
      {Object.keys(functions).map((name) => (
        <li key={name} onClick={() => functions[name].fn('red')}>
          {name}
        </li>
      ))
      }
    </ul>
    </>
  );
}

const TestComponent = () => {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  return (
    <ActionProvider>
      <button onClick={() => setParagraphs((prev) => [...prev, 'another paragraph'])}>Add paragraph</button>
      <div>
        {paragraphs.map((p, i) => (
          <>
            <Paragraph key={i} text={`${p} ${i}`} id={i} />
            <button onClick={() => setParagraphs((prev) => prev.filter((_, index) => index !== i))}>Remove</button>
          </>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', padding: '10px' }}>
        <TestChatBubble />
      </div>
    </ActionProvider>
    );
}

export default {
  title: 'Stories/RegisterFunctions',
  component: TestComponent,
} as Meta;

type Story = StoryObj<typeof TestComponent>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};