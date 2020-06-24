import {Note} from "../bl/note.js";
import {NotesRestService} from "./notes-rest-service.js";

export class NotesStorageAjax {
    constructor() {
        this.notesRestService = new NotesRestService();
    }

    async createNote(note) {
        await this.notesRestService.createNote(note);
    }

    async getAllNotes(orderBy, filterBy) {
        const notes = await this.notesRestService.getAllNotes();

        const sortFunction = Note.getSortFunction(orderBy);
        let sortedNotes = [...notes].map(n => this.fromAjaxToNote(n)).sort(sortFunction);
        if (filterBy) {
            return sortedNotes;
        }
        return sortedNotes.filter(note => !note.finishedOn);
    }

    async getNote(id) {
        return this.fromAjaxToNote(await this.notesRestService.getNote(id));
    }

    async updateNote(note) {
        await this.notesRestService.updateNote(note);
    }

    fromAjaxToNote(n){
        const note = new Note(n.createdOn, n.finishedOn, n.title, n.noteText, n.importance);
        note._id = n._id;
        return note;
    }
}