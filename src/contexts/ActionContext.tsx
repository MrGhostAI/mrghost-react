import React, {
  useState,
  createContext,
  FunctionComponent,
  ReactNode,
} from "react";

interface FunctionDetails {
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
  functions: FunctionDetails[];
  registerFunction: (fnDetails: FunctionDetails) => void;
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
