import {notesDbHandler} from '../services/notes-db-handler.js'

export class NotesControllerBackend {

    async getAllNotes(req, res) {
        res.json(await notesDbHandler.getAllNotes());
    };

    async createNote(req, res) {
        res.json(await notesDbHandler.createNote(req.body.createdOn, req.body.finishedOn, req.body.title, req.body.noteText, req.body.importance));
    };

    async getNote(req, res) {
        res.json(await notesDbHandler.getNote(req.params.id));
    };

    async updateNote(req, res) {
        res.json(await notesDbHandler.updateNote(req.params.id, req.body.createdOn, req.body.finishedOn, req.body.title, req.body.noteText, req.body.importance));
    };
}

export const notesControllerBackend = new NotesControllerBackend();