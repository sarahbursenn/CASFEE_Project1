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
            case SortEnum.byFinishedAsc:
                return Note.compareFinishedOnAsc;
            case SortEnum.byFinishedDesc:
                return Note.compareFinishedOnDesc;
            case SortEnum.byCreatedAsc:
                return Note.compareCreatedOnAsc;
            case SortEnum.byCreatedDesc:
                return Note.compareCreatedOnDesc;
            case SortEnum.byImportanceAsc:
                return Note.compareImportanceAsc;
            case SortEnum.byImportanceDesc:
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
