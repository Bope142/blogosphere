export const formatDateTime = (dateTimeString) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString("fr-FR", options);
};
