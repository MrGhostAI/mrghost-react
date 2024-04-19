import React from "react";

const DOMAIN = process.env.NODE_ENV === 'development' ? 'https://monkey-bright-closely.ngrok-free.app' : 'https://app.mrghost.ai';

interface Bot {
  // Assuming the structure of your Bot data, add actual properties used
}

interface BotUser {
  // Assuming the structure of your BotUser data, add actual properties used
}

interface BotContextType {
  bot: any | null;
  setBot: (bot: any | null) => void;
  myBotUser: any | null;
  setMyBotUser: (user: any | null) => void;
}

// Define the initial state with proper types
const botContextDefault: BotContextType = {
  bot: null,
  setBot: () => {},
  myBotUser: null,
  setMyBotUser: () => {},
};

export const BotContext : React.Context<BotContextType> = React.createContext<BotContextType>(botContextDefault);

const getBot = (botId: string, setBot: (bot: Bot | null) => void) => {
  fetch(`${DOMAIN}/api/bots/${botId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("got bot", data.data);
    if (data.success) {
      setBot(data.data as Bot);
    } else {
      setBot(null);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    setBot(null);
  });
};

const getMyBotUser = (botId: string, setMyBotUser: (user: BotUser | null) => void) => {
  fetch(`${DOMAIN}/api/bots/${botId}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
    if (data.data) {
      setMyBotUser(data.data as BotUser);
    } else {
      setMyBotUser(null);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    setMyBotUser(null);
  });
};

export const BotProvider = ({ botId, children } : { botId: string; children: React.ReactNode }) => {
  const [bot, setBot] = React.useState<Bot | null>(null);
  const [myBotUser, setMyBotUser] = React.useState<BotUser | null>(null);

  console.log('BotProvider botId', botId);

  React.useEffect(() => {
    console.log('BotProvider use effect botId', botId);
    getBot(botId, setBot);
    getMyBotUser(botId, setMyBotUser);
  }, [botId]);

  React.useEffect(() => {
    console.log('BotProvider bot', bot);
  }, [bot]);

  return (
    <BotContext.Provider value={{ bot, setBot, myBotUser, setMyBotUser }}>
      {children}
    </BotContext.Provider>
  );
};
