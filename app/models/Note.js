import { generateId } from "../utils/GenerateId.js";

export class Note {
    constructor(data) {
        this.id = data.id ? data.id : generateId();
        this.created = data.created ? new Date(data.created) : new Date();
        this.updated = data.updated ? new Date(data.updated) : this.created;
        this.title = data.title;
        this.color = data.color;
        this.content = data.content ? data.content : '';
    }

    get ListItemHTML() {
        return /*html*/`
        <div class="selectable mb-2 d-flex align-items-start" onclick="app.NotesController.activate('${this.id}')">
            <i class="note-icon mdi mdi-circle-slice-8 ps-2 pe-4" style="color:${this.color}"></i>
            <p class="fw-bold fs-5 mb-1 me-2">${this.title}</p>
        </div>
        `
    }

    get ActiveItemHTML() {
        return /*html*/`
            <div class="row">
                <div class="col-4">
                    <div class="p-3">
                        <div class="mb-2 d-flex align-items-start">
                            <i class="note-icon mdi mdi-circle-slice-8 ps-2 pe-4" style="color:${this.color}"></i>
                            <p class="fw-bold fs-4 mb-1 me-2">${this.title}</p>
                        </div>
                        <div>
                            <p class="mb-0">Creation Date</p>
                            <p class="mt-0 text-secondary">${this.created.toLocaleString()}</p>
                        </div>
                        <div>
                            <p class="mb-0">Last Update</p>
                            <p class="mt-0 text-secondary">${this.updated.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div class="col-7">
                    <div class="pt-5">
                        <form class="mb-3" onsubmit="app.NotesController.updateActive(event)">
                            <textarea class="form-control" rows="20" name="content">${this.content}</textarea>
                            <div class="text-end">
                                <button type="submit" class="mt-2 btn btn-success">SAVE</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-1">
                    <div class="mt-5">
                        <button onclick="app.NotesController.deleteActive()" class="btn btn-danger"><i
                            class="fs-4 mdi mdi-delete"></i></button>
                    </div>
                </div>
            </div>
        `
    }
}