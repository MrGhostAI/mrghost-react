import { useContext } from "react";
import { ActionContext } from "../contexts/ActionContext";

export const useRegisterFunction = () => {
  const { registerFunction } = useContext(ActionContext);
  return registerFunction;
};

export const useDeregisterFunction = () => {
  const { deregisterFunction } = useContext(ActionContext);
  return deregisterFunction;
};
