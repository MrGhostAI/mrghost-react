# Mr. Ghost

This package enables the use of a Mr. Ghost AI assistant as well as the execution of browser side actions.

### Installation

```bash
npm i mrghost
```

### Usage

```javascript
import { ChatWidget } from "mrghost";
```

### Example

```javascript
import { ChatWidget } from "mrghost";

function App() {
  return <ChatWidget botId="your-bot-id" userId="your-user-id" chatId="your-chat-id" />;
}
```

### ChatWidget Properties

| Property | Type     | Required | Description                                                                       |
| -------- | -------- | -------- | --------------------------------------------------------------------------------- |
| `botId`  | `string` | Yes      | Unique identifier for the Mr. Ghost chatbot.                                        |
| `userId` | `string` | No       | Identifier for an existing bot user. Set to `null` or omit for a new bot user to be created if your user permissions allow new users. |
| `chatId` | `string` | No       | Identifier for an existing chat session. Set to `null` or omit for a new session. |