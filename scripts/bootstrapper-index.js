import {NotesService} from "./bl/notes-service.js";
import {NotesStorage} from './dl/notes-storage.js';
import {NotesController} from "./ui/notes-controller.js";

class BootstrapperIndex {
    static start() {
        const notesStorage = new NotesStorage();
        const notesService = new NotesService(notesStorage);
        new NotesController(notesStorage, notesService).action();
    }
}

document.addEventListener('DOMContentLoaded', BootstrapperIndex.start);