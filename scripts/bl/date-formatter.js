export class DateFormatter {
    constructor() {
    }

    static dateToHtmlString(date) {
        return date.toISOString().substr(0, 10);
    }

    static htmlStringToDate(htmlString) {
        if (htmlString == "") {
            return null;
        }
        return DateFormatter.truncDate(new Date(htmlString));
    }

    static format(date) {
        if (DateFormatter.isToday(date)) {
            return "Heute";
        }
        return DateFormatter.getFormattedDate(date);
    }

    static getFormattedDate(date) {
        if (date instanceof Date) {
            const options = {year: '2-digit', month: '2-digit', day: '2-digit'};
            const dateTimeFormat = new Intl.DateTimeFormat('de-CH', options);
            return dateTimeFormat.format(date);
        }
        return "";
    }

    static isToday(date) {
        return (compare(DateFormatter.getToday(), DateFormatter.truncDate(date)) === 0);
    }

    static getToday() {
        return DateFormatter.truncDate(new Date());
    }

    static truncDate(date) {
        if (date instanceof Date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }
        return null;
    }

    static getDateForCookies() {
        const hundertEightyDaysInMillis = 180 * 24 * 60 * 60 * 1000;
        return new Date(Date.now() + hundertEightyDaysInMillis).toUTCString();
    }
}