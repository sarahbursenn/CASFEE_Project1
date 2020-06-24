import Datastore from 'nedb-promise';
import {Note} from '../public/scripts/bl/note';


export class NotesDbHandler {
    constructor() {
        this.db = new Datastore({filename: './data/notes.db', autoload: true});
    }

    async createNote(createdOn, finishedOn, title, noteText, importance){
        const note = new Note(createdOn, finishedOn, title, noteText, importance);
        return this.db.insert(note);
    }

    async updateNote(_id, createdOn, finishedOn, title, noteText, importance){
        const note = new Note(createdOn, finishedOn, title, noteText, importance);
        return await this.db.update({_id : _id}, note);
    }

    async getAllNotes(){
        return await this.db.cfind().exec();
    }

    async getNote(id){
        return this.db.findOne({_id: id});
    }
}
export const notesDbHandler = new NotesDbHandler();

