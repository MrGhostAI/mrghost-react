'use client';

import { useContext, useEffect } from "react";
import { ActionContext } from "../contexts/ActionContext";

export const useRegisterFunction = (
  func: Function,
  deps: any[] = [],
  schema: { name?: string, description?: string, parameters?: any } = {}
) => {
  const { registerFunction, deregisterFunction } = useContext(ActionContext);

  useEffect(() => {
    const fnDetails = {
      name: schema?.name || func.name,
      description: schema?.description || '',
      parameters: schema?.parameters || {
        type: 'object',
        properties: {},
      },
      fn: func,
    };

    registerFunction(fnDetails);

    return () => {
      deregisterFunction(fnDetails.name);
    }
  }, deps);
};
