export const formatDate = (date: Date | string) => {
    const dateObject = typeof date === "string" ? new Date(date) : date;
    const defaultMainFormat: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    const dateString = dateObject.toLocaleDateString(
        "ru-RU",
        defaultMainFormat
    );
    return dateString;
};
