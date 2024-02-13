import React, { useState, createContext, FunctionComponent, ReactNode } from 'react';

// Define the shape of the functions state
interface FunctionsMap {
    [key: string]: Function;
}

// Define the context type
interface ActionContextType {
    functions: FunctionsMap;
    registerFunction: (name: string, description: string, parameters: Object, fn: Function) => void;
    deregisterFunction: (name: string) => void;
}

// Create the context with a default value
export const ActionContext = createContext<ActionContextType>({
    functions: {},
    registerFunction: () => {},
    deregisterFunction: () => {}
});

// Define the props for the provider component
interface ActionProviderProps {
    children: ReactNode;
}

export const ActionProvider: FunctionComponent<ActionProviderProps> = ({ children }) => {
    const [functions, setFunctions] = useState<FunctionsMap>({});

    const registerFunction = (name: string, description: string, parameters: Object, fn: Function) => {
        console.log(`Registering function: ${name}`);
        setFunctions(prevFunctions => ({ ...prevFunctions, [name]: { description, parameters, fn } }));
    };

    const deregisterFunction = (name: string) => {
        setFunctions(prevFunctions => {
            const { [name]: _, ...rest } = prevFunctions;
            return rest;
        });
    };

    return (
        <ActionContext.Provider value={{ functions, registerFunction, deregisterFunction }}>
            {children}
        </ActionContext.Provider>
    );
};
