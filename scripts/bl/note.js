export class Note {
    constructor(id, createdOn, finishedOn, header, noteText, importance) {
        this.id = id;
        this.createdOn = this.getSafeDate(createdOn);
        this.finishedOn = this.getSafeDate(finishedOn);
        this.header = header;
        this.noteText = noteText;
        this.importance = importance;
    }

    getSafeDate(date) {
        if (!date) {
            return null;
        }
        if (date instanceof Date) {
            return date;
        } else {
            return new Date(date.toString());
        }
    }

    static getSortFunction(sortByEnum){
        switch (sortByEnum) {
            case SortEnum.btn_span_sort_by_finished_asc:
                return Note.compareFinishedOnAsc;
            case SortEnum.btn_span_sort_by_finished_desc:
                return Note.compareFinishedOnDesc;
            case SortEnum.btn_span_sort_by_created_asc:
                return Note.compareCreatedOnAsc;
            case SortEnum.btn_span_sort_by_created_desc:
                return Note.compareCreatedOnDesc;
            case SortEnum.btn_span_sort_by_importance_asc:
                return Note.compareImportanceAsc;
            case SortEnum.btn_span_sort_by_importance_desc:
                return Note.compareImportanceDesc;
            default:
                throw Error("Wrong Sorting Function");

        }
    }

    static compareFinishedOnAsc(n1, n2) {
        return compare(n1.finishedOn, n2.finishedOn);
    }

    static compareFinishedOnDesc(n1, n2) {
        return compare(n2.finishedOn, n1.finishedOn);
    }

    static compareCreatedOnAsc(n1, n2) {
        return compare(n1.createdOn, n2.createdOn);
    }

    static compareCreatedOnDesc(n1, n2) {
        return compare(n2.createdOn, n1.createdOn);
    }

    static compareImportanceAsc(n1, n2) {
        return compare(n1.importance, n2.importance);
    }

    static compareImportanceDesc(n1, n2) {
        return compare(n2.importance, n1.importance);
    }
}
