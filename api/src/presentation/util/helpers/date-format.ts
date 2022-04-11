const padValue = (value: any, padding: number = 2) => {
    return value.toString().padStart(2, "0");
};

export const formatDate = (date: Date): string => {
    let returnDate = "";
    returnDate += padValue(date.getDate()) + "/";
    returnDate += padValue(date.getMonth() + 1) + "/";
    returnDate += padValue(date.getFullYear(), 4);

    returnDate +=
        " " + padValue(date.getHours()) + ":" + padValue(date.getMinutes());
    returnDate += ":" + padValue(date.getSeconds());

    return returnDate;
};
