export class DateFormatter {
    constructor(date) {
        this.date = date;
        const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
        this.dateTimeFormat = new Intl.DateTimeFormat('de-CH', options);
    }

    format(){
        if(DateFormatter.isToday(this.date)){
            return "Heute";
        }
        return this.getFormattedDate();
    }

    getFormattedDate(){
        if(this.date instanceof Date){
            return this.dateTimeFormat.format(this.date);
        }
        return "";
    }

    static isToday(date){
        return (compare(DateFormatter.getToday(), DateFormatter.truncDate(date)) === 0);
    }

    static getToday(){
        return DateFormatter.truncDate(new Date());
    }

    static truncDate(date){
        if(date instanceof Date){
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }
        return null;
    }
}