import {Note} from '../bl/note.js';

export class NotesStorage {
    constructor() {
        this.storageKey = 'notesStorage';
        this.notes = this.getDummyData(); // FIXME: remove dummy data!
        this.store();
    }

    store(){
        localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
    }

    addNote(note) {
        note.id = this.findCurrentId(this.notes);
        this.notes.push(note);
        this.store();
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
        return this.notes.find(note => note.id == id);
    }

    updateNote(note) {
        const index = this.notes.findIndex(n => n.id == note.id);
        this.notes[index] = note;
        this.store();
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
            new Note(2, "2020-11-02", "2020-05-30", "CAS FEE Selbststudium", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 1),
            new Note(3, "2020-01-30", null, "Einkaufen", "Butter, Eier", 2),
        ];
    }
}