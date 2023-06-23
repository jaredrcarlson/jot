import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { saveState } from "../utils/Store.js"

function _save(key) {
    saveState(key, AppState[key])
    AppState.emit(key)
}

class NotesService {
    create(data) {
        const newNote = new Note(data)
        AppState.notes.push(newNote)
        _save('notes')
        this.activate(newNote.id)
    }

    activate(id) {
        AppState.activeNote = AppState.notes.find(n => n.id == id)
    }

    updateActive(data) {
        AppState.activeNote.content = data.content
        AppState.activeNote.updated = new Date()
        _save('notes')
        AppState.emit('activeNote')
    }

    deleteActive() {
        let i = AppState.notes.findIndex(n => n.id == AppState.activeNote.id)
        AppState.notes.splice(i, 1)
        _save('notes')
        AppState.activeNote = null
    }
}

export const notesService = new NotesService()