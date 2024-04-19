import showdown from 'showdown';

const converter = new showdown.Converter();

export function convertToHTML(text : string) : string {
  text = converter.makeHtml(text);
  // add target="_blank" to all links
  text = text.replace(/<a /g, '<a target="_blank" rel="noopener"');
  return text;
}

export function capitalizeRoleName(role : string) : string {
  if (!role) return '';
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function getSenderName(message : any, bot : any) : string {
  let senderName =
    message.sender?.firstName ||
    message.sender?.name ||
    message.sender?.data?.name;
  if (message.role === 'ai') {
    senderName = bot?.name;
  }
  if (!senderName) {
    senderName = capitalizeRoleName(message.role);
  }
  return senderName;
}

export const areEqual = (prevProps : any, nextProps : any) : boolean => {
    // Only re-render if message.text has changed
    return prevProps.message.text === nextProps.message.text;
  };