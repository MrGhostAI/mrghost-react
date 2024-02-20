# HappyML Browser Side Actions

This package enables the execution of browser side actions for a HappyML chatbot.

### Installation

```bash
npm install @happyml/browser-side-actions
```

### Usage

```javascript
import { ChatWidget } from "@happyml/browser-side-actions";
```

### Example

```javascript
import React from "react";
import { ChatWidget } from "@happyml/browser-side-actions";

function App() {
  const notify = () => toast("Wow so easy!");

  return <ChatWidget botId="your-bot-id" chatId="your-chat-id" />;
}
```

### ChatWidget Properties

| Property | Type     | Required | Description                                                                       |
| -------- | -------- | -------- | --------------------------------------------------------------------------------- |
| `botId`  | `string` | Yes      | Unique identifier for the HappyML chatbot.                                        |
| `chatId` | `string` | No       | Identifier for an existing chat session. Set to `null` or omit for a new session. |
