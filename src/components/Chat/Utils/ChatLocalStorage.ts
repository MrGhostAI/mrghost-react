
function getKeyName(botId: string, key: string) : string {
  return `${botId}-${key}`;
}

export function getChatLocalStorage(botId: string, key: string) : string | null {
  console.debug('getting chat local storage', getKeyName(botId, key));
  return localStorage.getItem(getKeyName(botId, key));
}

export function saveChatLocalStorage(botId: string, key: string, value: string) : void {
  console.debug('setting chat local storage', getKeyName(botId, key));
  return localStorage.setItem(getKeyName(botId, key), value);
}

export function removeChatLocalStorage(botId: string, key: string) : void {
  console.debug('removing chat local storage', getKeyName(botId, key));
  return localStorage.removeItem(getKeyName(botId, key));
}