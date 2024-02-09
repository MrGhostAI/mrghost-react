import { useContext, useEffect } from 'react';
import { ActionContext } from '../components/ActionContext';

// Define the type for the AI function registration object
interface AIAction {
  name: string;
  description: string;
  parameters: Object;
  fn: Function;
}

export const useRegisterAction = (aiAction: AIAction) => {
  const { registerFunction, deregisterFunction } = useContext(ActionContext);

  useEffect(() => {
    console.log(`Registering function: ${aiAction.name}`);
    registerFunction(aiAction.name, aiAction.description, aiAction.parameters, aiAction.fn);

    return () => {
      deregisterFunction(aiAction.name);
    };
  }, []); // dependencies should include all relevant fields from aiAction
};
