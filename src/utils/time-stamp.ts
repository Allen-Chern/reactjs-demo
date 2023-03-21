export function getTimeStamp(date?: Date) {
  if (date) {
    return new Date(date).getTime().toString();
  }

  return "";
}
