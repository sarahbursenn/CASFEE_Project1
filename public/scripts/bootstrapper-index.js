import {NotesController} from './ui/notes-controller.js';
import {NotesStorageAjax} from './dl/notes-storage-ajax.js';

class BootstrapperIndex {
    static start() {
        const notesStorage = new NotesStorageAjax();
        new NotesController(notesStorage).action();
    }
}

document.addEventListener('DOMContentLoaded', BootstrapperIndex.start);