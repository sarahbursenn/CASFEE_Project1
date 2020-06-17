import {DateFormatter} from '../bl/date-formatter.js';
import {Note} from '../bl/note.js';
import {Cookies} from '../utils/cookies.js';

const id_btn_span_sort_by_finished = 'btn_span_sort_by_finished';
const id_btn_span_sort_by_created = 'btn_span_sort_by_created';
const id_btn_span_sort_by_importance = 'btn_span_sort_by_importance';
const id_btn_span_show_finished = 'btn_span_show_finished';
const class_sort_asc = 'btn_sort_num_asc';
const class_sort_desc = 'btn_sort_num_desc';
const class_div_sort_icon = 'btn_span_right';
const class_btn_show_on = 'btn_show_on';
const class_btn_show_off = 'btn_show_off';

export class NotesController {
    constructor(notesStorage) {
        this.notesStorage = notesStorage;

        this.notesTemplate = Handlebars.compile(document.getElementById('note-entry-template').innerHTML);
        this.noteComponent = document.getElementById('div_note_components');

        this.body = document.getElementsByTagName('body')[0];

        this.slctStyle = document.getElementById('slct_style');
        this.newNoteButton = document.getElementById('btn_new_note');
        this.btnSortByFishedOn = document.getElementById('btn_sort_by_finished');
        this.btnSortByCreatedOn = document.getElementById('btn_sort_by_created');
        this.btnSortByImportance = document.getElementById('btn_sort_importance');
        this.btnShowFinished = document.getElementById('btn_show_finished');
        this.divNoteComponents = document.getElementById('div_note_components');

        this.divPopUp = document.getElementById('div_note_popup');
        this.divFormHeader = document.getElementById('div_form_header');
        this.inptFormCreatedOn = document.getElementById('form_inpt_created_on');
        this.btnFormOk = document.getElementById('form_btn_ok');
        this.btnFormCancel = document.getElementById('form_btn_cancel');
    }

    showNotes(orderBy, filterBy) {
        const notes = this.notesStorage.getNotes(orderBy, filterBy);
        this.noteComponent.innerHTML = this.notesTemplate({notes: notes});
    }

    initEventHandler() {
        this.btnSortByFishedOn.addEventListener('click', (event) => {
            this.sortBtnClicked(id_btn_span_sort_by_finished);
        });

        this.btnSortByCreatedOn.addEventListener('click', (event) => {
            this.sortBtnClicked(id_btn_span_sort_by_created);
        });

        this.btnSortByImportance.addEventListener('click', (event) => {
            this.sortBtnClicked(id_btn_span_sort_by_importance);
        });

        this.btnShowFinished.addEventListener('click', (event) => {
            this.showBtnClicked();
        });

        this.newNoteButton.addEventListener('click', (event) => {
            this.openForm('Neue Notiz...');
        });

        this.slctStyle.addEventListener('change', (event) => {
            const newStyle = this.slctStyle.value;
            this.setNewStyle(newStyle);
            this.writeCookies(CookieEnum.style, newStyle);
        });

        this.divNoteComponents.addEventListener('click', (event) => {
            const noteId = event.target.dataset.noteId;
            const note = this.notesStorage.getNoteById(noteId);
            this.fromBeanToForm(note);
            this.openForm(false);
        });

        this.btnFormOk.addEventListener('click', (event) => {
            event.preventDefault();
            const note = this.fromFormToBean();
            if (note.id) {
                this.notesStorage.updateNote(note);
            } else {
                this.notesStorage.addNote(note);
            }
            this.divPopUp.style.display = "none";
            this.showNotes(this.getOrderByInfo(), this.isShowFinishedOn());
        });

        this.btnFormCancel.addEventListener('click', (event) => {
            this.divPopUp.style.display = "none";
        });
    }


    renderView() {
        this.applyCookies();
        this.showNotes(this.getOrderByInfo(), this.isShowFinishedOn());
    }

    action() {
        this.initEventHandler();
        this.renderView();
    }

    /*
        Helper Methods
     */
    getElementById(elementId) {
        return document.getElementById(elementId);
    }

    elementIdAndSortDirectionToEnum(elementId, sortDirection) {
        let sortBy = 0;
        if (elementId.includes(id_btn_span_sort_by_finished)) {
            sortBy += SortEnum.btn_span_sort_by_finished;
        } else if (elementId.includes(id_btn_span_sort_by_created)) {
            sortBy += SortEnum.btn_span_sort_by_created;
        } else if (elementId.includes(id_btn_span_sort_by_importance)) {
            sortBy += SortEnum.btn_span_sort_by_importance;
        }

        if (sortDirection.includes(class_sort_asc)) {
            sortBy += SortEnum.btn_sort_num_asc;
        } else if (sortDirection.includes(class_sort_desc)) {
            sortBy += SortEnum.btn_sort_num_desc;
        }
        return sortBy;
    }

    writeCookies(key, value) {
        document.cookie = `${key}=${value}; expires=${DateFormatter.getDateForCookies()}`;
    }

    applyCookies() {
        const cookies = new Cookies(document.cookie);

        // Style
        this.setNewStyle(cookies.style);
        this.slctStyle.value = cookies.style;

        // Sort By
        this.toggleSortIcon(cookies.sortBy[0], cookies.sortBy[1]);

        // Filter By
        this.toggleShowIcon(!cookies.filterBy);
    }

    /*
     *    Bean from/to Form
     */
    fromBeanToForm(note) {
        this.getElementById('form_inpt_id').value = note.id;
        this.getElementById('form_inpt_title').value = note.header;
        this.getElementById('form_inpt_created_on').value = DateFormatter.dateToHtmlString(note.createdOn);
        this.getElementById('form_inpt_finished_on').value = DateFormatter.dateToHtmlString(note.finishedOn);
        this.getElementById('form_slct_importance').value = note.importance;
        this.getElementById('form_txt_note_text').value = note.noteText;
    }

    fromFormToBean() {
        const note = new Note(
            this.getElementById('form_inpt_id').value,
            DateFormatter.htmlStringToDate(this.getElementById('form_inpt_created_on').value),
            DateFormatter.htmlStringToDate(this.getElementById('form_inpt_finished_on').value),
            this.getElementById('form_inpt_title').value,
            this.getElementById('form_txt_note_text').value,
            this.getElementById('form_slct_importance').value);
        return note;
    }


    /*
     *   Form Handling
     */
    openForm(isNew) {
        let headerText = 'Notiz bearbeiten...';
        if (isNew) {
            this.inptFormCreatedOn.value = DateFormatter.dateToHtmlString(new Date());
            headerText = 'Neue Notiz...';
        }
        this.divFormHeader.innerHTML = `<h2>${headerText}</h2>`;
        this.divPopUp.style.display = "block";
    }

    /*
     *  Methods for Style Handling
     */
    setNewStyle(newStyle) {
        const otherStyles = StyleEnum.getStyles();
        const bodyClassList = this.body.classList;
        otherStyles.forEach(val => bodyClassList.remove(val));
        bodyClassList.add(newStyle);
    }

    /*
     *   Methods for Button's Show Icon Handling
     */

    toggleShowIcon(isShowOn = null) {
        const divWithShowInfo = document.getElementById(id_btn_span_show_finished);
        if (isShowOn == null) {
            isShowOn = this.isShowOn(divWithShowInfo);
        }
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
        return this.isShowOn(document.getElementById(id_btn_span_show_finished));
    }

    showBtnClicked() {
        const filterBy = this.toggleShowIcon();
        this.showNotes(this.getOrderByInfo(), filterBy);
        this.writeCookies(CookieEnum.filterBy, filterBy);
    }

    /*
     *   Methods for Button's Sort Icon Handling
     */

    toggleSortIcon(elementId, sortDirection = null) {
        const divWithSortInfo = document.getElementById(elementId);
        if (!sortDirection) {
            sortDirection = this.findOutSortDirection(divWithSortInfo);
        }
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

    getOrderByInfo() {
        let element = document.getElementsByClassName(class_sort_asc)[0];
        let orderBy = SortEnum.btn_span_sort_by_created_asc;
        if (element) {
            orderBy = this.elementIdAndSortDirectionToEnum(element.id, class_sort_asc);
        } else {
            element = document.getElementsByClassName(class_sort_desc)[0];
            if (element) {
                orderBy = this.elementIdAndSortDirectionToEnum(element.id, class_sort_desc);
            }
        }
        return orderBy;
    }

    sortBtnClicked(elementId) {
        const sortDirection = this.toggleSortIcon(elementId);
        const sortBy = this.elementIdAndSortDirectionToEnum(elementId, sortDirection);
        this.showNotes(sortBy, this.isShowFinishedOn());
        this.writeCookies(CookieEnum.sortBy, sortBy);
    }
}