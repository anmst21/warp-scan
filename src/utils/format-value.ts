export function formatTimestamp(timestamp: string | Date): string {
  const timestampDate = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - timestampDate.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffSec < 60) return "now";
  if (diffMin < 60) return `${diffMin}min`;
  if (diffHr < 24) return `${diffHr}h`;
  if (diffDay < 7) return `${diffDay}d`;
  if (diffWeek < 4) return `${diffWeek}w`;
  return `${diffMonth}m`;
}

export function formatCoinPrice(price: string): string {
  const number = parseFloat(price); // Convert the string to a number
  const formattedNumber = number.toFixed(2);
  return String(formattedNumber);
}
