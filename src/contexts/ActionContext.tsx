import React, {
  useState,
  createContext,
  FunctionComponent,
  ReactNode,
} from "react";

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
}

export const ActionContext = createContext<ActionContextType>({
  functions: [],
  registerFunction: () => {},
  deregisterFunction: () => {},
});

interface ActionProviderProps {
  children: ReactNode;
}

/**
 * A provider that allows users to register/de-register custom functions for use in the chat bot.
 */
export const ActionProvider: FunctionComponent<ActionProviderProps> = ({
  children,
}) => {
  const [functions, setFunctions] = useState<FunctionDetails[]>([]);

  const registerFunction = (fn: FunctionDetails) => {
    setFunctions((prevFunctions) => [...prevFunctions, fn]);
  };

  const deregisterFunction = (name: string) => {
    setFunctions((prevFunctions) =>
      prevFunctions.filter((func) => func.name !== name)
    );
  };

  return (
    <ActionContext.Provider
      value={{ functions, registerFunction, deregisterFunction }}
    >
      {children}
    </ActionContext.Provider>
  );
};

/**
 * A hook that allows users to access to states in the actions.
 * @returns An action context store.
 */
export const useAction = () => {
  const context = React.useContext(ActionContext);
  if (!context) {
    throw new Error("useAction must be used within an ActionProvider");
  }
  return context;
};
