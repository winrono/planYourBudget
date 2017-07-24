export function formatDate(date) {
    let convertedDate;
    if (!(date instanceof Date)) {
        convertedDate = new Date(date)
    }
    else {
        convertedDate = date
    }
    if (convertedDate == "Invalid Date") {
        return date
    }
    return convertedDate.getFullYear() + "-" + (convertedDate.getMonth() + 1) + "-" + convertedDate.getDate()
}