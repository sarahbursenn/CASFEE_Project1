import {Note} from '../bl/note.js';

export class NotesStorage {
    constructor() {
        this.storageKey = 'notesStorage';
        const notes = JSON.parse(localStorage.getItem(this.storageKey) || "[ ]");
        this.notes = this.getDummyData(); // FIXME: remove dummy data!
        localStorage.setItem(this.storageKey, JSON.stringify(notes));
        this.currentId = this.findCurrentId(this.notes);
    }

    addNote(note) {

    }

    getNotes(orderBy, filterBy) {
        const sortFunction = Note.getSortFunction(orderBy);
        let sortedNotes = [...this.notes].sort(sortFunction);
        if (filterBy) {
            return sortedNotes;
        }
        return sortedNotes.filter(note => !note.finishedOn);
    }

    getNoteById(id) {

    }

    updateNote(note) {
        // FIXME
    }


    /*
        FIXME remove all those methods
     */
    getAll() {
        return this.notes;
    }

    getAllSorted(sortFunction) {
        return [...this.notes].sort(sortFunction);
    }

    findCurrentId(notes) {
        return notes.reduce((acc, n) => {
            return ((n.id > acc) ? n.id : acc);
        });
    }

    getDummyData() {
        return [
            new Note(1, "2020-05-06", "2020-06-21", "Mami anrufen", "079 123 45 67", 3),
            new Note(2, "2020-11-02", "2020-05-30", "CAS FEE Selbststudium", "HTML für die note App erstellen", 1),
            new Note(3, "2020-01-30", null, "Einkaufen", "Butter, Eier", 2),
        ];
    }
}