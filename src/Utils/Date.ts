

export const GetHumanDate = (dateString : string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedDate;
}

export function getHumanReadableDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  // Check if the date is today or yesterday
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Format the time part
  const timeOptions: Intl.DateTimeFormatOptions
  = { hour: 'numeric', minute: '2-digit', hour12: true };
  const formattedTime = date.toLocaleString('en-US', timeOptions);

  if (isToday) {
    return `Today at ${formattedTime}`;
  } else if (isYesterday) {
    return `Yesterday at ${formattedTime}`;
  } else {
    // Format the date part for other days
    const dateOptions : Intl.DateTimeFormatOptions
     = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', dateOptions);
    return `${formattedDate} at ${formattedTime}`;
  }
}

export function getTimeAgoString(dateString : string) : string {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  
  const secondsPast: number = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.round(secondsPast)} seconds ago`;
  }

  if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)} minutes ago`;
  }

  if (secondsPast <= 86400) {
    return `${Math.round(secondsPast / 3600)} hours ago`;
  }

  const daysAgo: number = Math.round(secondsPast / 86400);

  if (daysAgo > 30) {
    return date.toLocaleString();
  }

  return `${Math.round(secondsPast / 86400)} days ago`;
}
