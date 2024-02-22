import React, {
  useState,
  createContext,
  FunctionComponent,
  ReactNode,
} from "react";

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
  parameters: Object;
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

  console.log(`functions in context: ${functions}`);

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
