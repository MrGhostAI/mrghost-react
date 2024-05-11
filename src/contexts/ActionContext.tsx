'use client';

import * as React from "react";
import { BotProvider } from "./BotContext";
import { ChatProvider } from "./ChatProvider";

export interface ParametersSchema {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description: string;
    };
  };
}

export interface ActionResponse {
  action: string;
  params: {
    [key: string]: string;
  };
}

export interface FunctionDetails {
  /**
   * The name of the function.
   */
  name: string;
  /**
   * A description of the function.
   */
  description: string;
  /**
   * The parameters that the function accepts.
   */
  parameters: ParametersSchema;
  /**
   * The function to be executed.
   */
  fn: Function;
}

interface ActionContextType {
  /**
   * The list of functions that have been registered.
   */
  functions: FunctionDetails[];
  /**
   * Register a new function.
   * @param fnDetails - The details of the function to register.
   * @returns
   */
  registerFunction: (fnDetails: FunctionDetails) => void;
  /**
   * Deregsiter a function.
   * @param name - The name of the function to deregister.
   * @returns
   */
  deregisterFunction: (name: string) => void;
  /**
   * Register a new context.
   * @param context - The name of the context to register.
   * @returns
   */
  registerContext: (context: string) => void;
  /**
   * Deregister a context.
   * @param context - The name of the context to deregister.
   * @returns
   */
  deregisterContext: (context: string) => void;
}

export const ActionContext = React.createContext<ActionContextType>({
  functions: [],
  registerFunction: () => {},
  deregisterFunction: () => {},
  registerContext: () => {},
  deregisterContext: () => {},
});

interface ActionProviderProps {
  botId: string;
  domain?: string;
  chatId?: string | null;
  userId?: string | null;
  children: React.ReactNode;
}

/**
 * A provider that allows users to register/de-register custom functions for use in the chat bot.
 */
export const ActionProvider: React.FunctionComponent<ActionProviderProps> = ({
  botId,
  domain = "https://app.mrghost.ai",
  chatId = null,
  userId = null,
  children,
}) => {
  const [functions, setFunctions] = React.useState<FunctionDetails[]>([]);
  const [contexts, setContexts] = React.useState<string[]>([]);

  const registerFunction = (fn: FunctionDetails) => {
    setFunctions((prevFunctions) => [...prevFunctions, fn]);
  };

  const deregisterFunction = (name: string) => {
    setFunctions((prevFunctions) =>
      prevFunctions.filter((func) => func.name !== name)
    );
  };

  const registerContext = (context: string) => {
    setContexts((prevContexts) => [...prevContexts, context]);
  }

  const deregisterContext = (context: string) => {
    setContexts((prevContexts) =>
      prevContexts.filter((ctx) => ctx !== context)
    );
  }

  return (
    <ActionContext.Provider
      value={{ functions, registerFunction, deregisterFunction, registerContext, deregisterContext }}
    >
      <BotProvider botId={botId} domain={domain}>
        <ChatProvider
          domain={domain}
          botId={botId}
          chatId={chatId}
          botUserId={userId}
          preview={false}
          additionalFunctions={functions}
          contexts={contexts}
        >
          {children}
        </ChatProvider>
      </BotProvider>
    </ActionContext.Provider>
  );
};

/**
 * A hook that allows users to access to states in the actions.
 * @returns An action context store.
 */
export const useActionContext = () => {
  const context = React.useContext(ActionContext);
  if (!context) {
    throw new Error("useActionContext must be used within an ActionProvider");
  }
  return context;
};
