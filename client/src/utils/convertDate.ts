export const getDaysAndHoursAndMinutesFromMilliseconds = (milliseconds: number): string => {
  if (isNaN(milliseconds) || milliseconds < 0) {
    return "N/A";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let result = "";
  if (days > 0) {
    result += `${days}d `;
  }
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0) {
    result += `${minutes}m`;
  }

  return result.trim();
};