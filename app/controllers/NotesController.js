import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawListItems() {
    const items = AppState.notes
    let template = /*html*/`
        <p class="fs-5 mb-0 p-2 text-secondary">JOT Count: <span>${items.length}</span></p>
    `
    items.forEach(i => template += i.ListItemHTML)
    template += /*html*/`
        <form onsubmit="app.NotesController.create(event)"
        class="mb-3 d-flex align-items-center justify-content-between">
        <input class="mx-1" type="color" name="color" value="#2fd7f9">
        <input type="text" class="form-control mx-2" placeholder="New JOT" minlength="3" maxlength="15" name="title" required
        aria-label="Title" aria-describedby="newNoteTitle">
        <button type="submit" class="mx-1 btn btn-success"><i class="mdi mdi-plus"></i></button>
        </form>
    `
    setHTML('list-items', template)
}

function _drawActiveItem() {
    let template;
    if (AppState.activeNote === null) {
        template = /*html*/`<p class="fs-3 p-3">Create a new JOT${!AppState.notes.length ? ' to get started.' : ' or select one from the list.'}</p>`
    }
    else {
        template = AppState.activeNote.ActiveItemHTML
    }
    setHTML('active-item', template)
}

function _drawAll() {
    _drawListItems()
    _drawActiveItem()
}

export class NotesController {
    constructor() {
        _drawAll()
        AppState.on('notes', _drawListItems)
        AppState.on('activeNote', _drawActiveItem)
    }

    create(event) {
        event.preventDefault()
        let form = event.target
        let formData = getFormData(form)
        notesService.create(formData)
        form.reset()
        Pop.toast(`${formData.title} has been created.`, 'success', 'top', 5000)
    }

    activate(id) {
        notesService.activate(id)
    }

    updateActive(event) {
        event.preventDefault()
        notesService.updateActive(getFormData(event.target))
        Pop.toast(`${AppState.activeNote.title} has been saved.`, 'success', 'top', 5000)
    }

    async deleteActive() {
        let userConfirmedDelete = await Pop.confirm(
            `Are you sure?`,
            'Warning: This action cannot be reversed.',
            `Delete ${AppState.activeNote.title} Forever`,
            'var(--bs-danger)'

        )
        if (userConfirmedDelete) {
            let activeNoteTitle = AppState.activeNote.title
            notesService.deleteActive()
            Pop.toast(`${activeNoteTitle} was permanently deleted.`, 'success', 'top', 5000)
        }
        else {
            Pop.toast(`${AppState.activeNote.title} remains saved.`, 'info', 'top', 5000)
        }
    }

}