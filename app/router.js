import { NotesController } from "./controllers/NotesController.js";
import { NotesView } from "./views/NotesView.js";

export const router = [
  {
    path: '',
    controller: NotesController,
    view: NotesView
  }
]