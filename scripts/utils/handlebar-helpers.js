import {DateFormatter} from "../bl/date-formatter.js";

Handlebars.registerHelper('formatDate', function (date) {
    return DateFormatter.format(date);
});

Handlebars.registerHelper('renderNoteText', function (noteText) {
    return noteText.split('\n').join('<br>');
});

Handlebars.registerHelper('renderImportance', function (number) {
    let i = 0;
    let result = '';
    while (i < number) {
        result += '!';
        i++;
    }
    return result;
});