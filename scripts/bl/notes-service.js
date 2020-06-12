import {Note} from "./note.js";

export class NotesService {
    constructor(notesStorage) {
        this.notesStorage = notesStorage;
        this.notes = [];
    }

    loadData() {
        this.notes = this.notesStorage.getAll().map(n => new Note(n.id, n.createdOn, n.finishedOn, n.header, n.noteText, n.importance));
    }

    addNote(finishedOn, header, noteText, importance) {
        const note = new Note(this.notesStorage.currentId + 1, Date.now(), finishedOn, header, noteText, importance);
        this.notes.push(note);
        return note;
    }
}