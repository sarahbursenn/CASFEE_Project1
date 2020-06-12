import {DateFormatter} from '../bl/date-formatter.js';

const id_btn_div_sort_by_finished = 'btn_div_sort_by_finished';
const id_btn_div_sort_by_created = 'btn_div_sort_by_created';
const id_btn_div_sort_by_importance = 'btn_div_sort_by_importance';
const id_btn_div_show_finished = 'btn_div_show_finished';
const class_sort_asc = 'btn_sort_num_asc';
const class_sort_desc = 'btn_sort_num_desc';
const class_div_sort_icon = 'btn_div_right';
const class_btn_show_on = 'btn_show_on';
const class_btn_show_off = 'btn_show_off';

export class NotesController {
    constructor(notesStorage, notesService) {
        this.notesStorage = notesStorage;
        this.notesService = notesService;

        Handlebars.registerHelper("formatDate", function (date) {
            return new DateFormatter(date).format();
        });

        Handlebars.registerHelper("blubber", function (number) {
            let i = 0;
            let result = "";
            while (i < number) {
                result += "!";
                i++;
            }
            return result;
        });

        this.notesTemplate = Handlebars.compile(document.getElementById('note-entry-template').innerHTML);
        this.noteComponent = document.getElementById('div_note_components');

        this.newNoteButton = document.getElementById('btn_new_note');
        this.btnSortByFishedOn = document.getElementById('btn_sort_by_finished');
        this.btnSortByCreatedOn = document.getElementById('btn_sort_by_created');
        this.btnSortByImportance = document.getElementById('btn_sort_importance');
        this.btnShowFinished = document.getElementById('btn_show_finished');
    }

    showNotes(notes) {
        if (!notes) {
            notes = this.notesService.notes;
        }
        this.noteComponent.innerHTML = this.notesTemplate({notes: notes});
    }

    initEventHandler() {
        this.btnSortByFishedOn.addEventListener('click', (event) => {
            this.sortBtnClicked(id_btn_div_sort_by_finished);
        });

        this.btnSortByCreatedOn.addEventListener('click', (event) => {
            this.sortBtnClicked(id_btn_div_sort_by_created);
        });

        this.btnSortByImportance.addEventListener('click', (event) => {
            this.sortBtnClicked(id_btn_div_sort_by_importance);
        });

        this.btnShowFinished.addEventListener('click', (event) => {
            this.showBtnClicked();
        });

        this.newNoteButton.addEventListener('click', (event) => {
        });
    }


    renderView() {
        this.showNotes();
    }

    action() {
        this.initEventHandler();
        this.notesService.loadData();
        this.renderView();
    }

    /*
        Helper Methods
     */
    elementIdAndSortDirectionToEnum(elementId, sortDirection) {
        let sortBy = 0;
        if (elementId.includes('finished')) {
            sortBy += SortEnum.byFinished;
        } else if (elementId.includes('created')) {
            sortBy += SortEnum.byCreated;
        } else if (elementId.includes('importance')) {
            sortBy += SortEnum.byImportance;
        }

        if (sortDirection.includes('asc')) {
            sortBy += SortEnum.asc;
        } else if (sortDirection.includes('desc')) {
            sortBy += SortEnum.desc;
        }
        return sortBy;
    }

    /*
        Methods for Button's Show Icon Handling
     */

    toggleShowIcon() {
        const divWithShowInfo = document.getElementById(id_btn_div_show_finished);
        const isShowOn = this.isShowOn(divWithShowInfo);
        if (isShowOn) {
            divWithShowInfo.classList.remove(class_btn_show_on);
            divWithShowInfo.classList.add(class_btn_show_off);
        } else {
            divWithShowInfo.classList.remove(class_btn_show_off);
            divWithShowInfo.classList.add(class_btn_show_on);
        }
        return !isShowOn;
    }

    isShowOn(divWithShowInfo) {
        return divWithShowInfo.classList.contains(class_btn_show_on);
    }

    isShowFinishedOn() {
        return this.isShowOn(document.getElementById(id_btn_div_show_finished));
    }

    showBtnClicked(){
        let element = document.getElementsByClassName(class_sort_asc)[0];
        let sortBy = 0;
        if(element){
            sortBy = this.elementIdAndSortDirectionToEnum(element.id, class_sort_asc);
        }else{
            element = document.getElementsByClassName(class_sort_desc)[0];
            sortBy = this.elementIdAndSortDirectionToEnum(element.id, class_sort_desc);
        }
        const filterBy = this.toggleShowIcon();
        this.showNotes(this.notesStorage.getNotes(sortBy, filterBy));
    }

    /*
        Methods for Button's Sort Icon Handling
     */

    toggleSortIcon(elementId) {
        const divWithSortInfo = document.getElementById(elementId);
        const sortDirection = this.findOutSortDirection(divWithSortInfo);
        this.removeSortIcons();
        divWithSortInfo.classList.add(sortDirection);
        return sortDirection;
    }

    findOutSortDirection(divWithSortInfo) {
        // if it is already sorted asc -> sort desc
        if (divWithSortInfo.classList.contains(class_sort_asc)) {
            return class_sort_desc;
        }
        // if it is not sorted or sorted desc -> sort asc
        return class_sort_asc;
    }

    removeSortIcons() {
        [...document.getElementsByClassName(class_div_sort_icon)]
            .forEach(el => el.classList.remove(class_sort_asc, class_sort_desc));
    }

    sortBtnClicked(elementId) {
        const sortDirection = this.toggleSortIcon(elementId);
        this.showNotes(this.notesStorage.getNotes(this.elementIdAndSortDirectionToEnum(elementId, sortDirection), this.isShowFinishedOn()));
    }
}