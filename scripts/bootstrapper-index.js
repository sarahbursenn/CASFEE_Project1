import {NotesStorage} from './dl/notes-storage.js';
import {NotesController} from "./ui/notes-controller.js";

class BootstrapperIndex {
    static start() {
        const notesStorage = new NotesStorage();
        new NotesController(notesStorage).action();
    }
}

document.addEventListener('DOMContentLoaded', BootstrapperIndex.start);