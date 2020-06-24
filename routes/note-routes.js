import express from 'express';
const router = express.Router();
import {notesControllerBackend} from "../controller/notes-controller-backend";

router.get("/", notesControllerBackend.getAllNotes.bind(notesControllerBackend));
router.post("/", notesControllerBackend.createNote.bind(notesControllerBackend));
router.get("/:id/", notesControllerBackend.getNote.bind(notesControllerBackend));
router.put("/:id/", notesControllerBackend.updateNote.bind(notesControllerBackend));

export const noteRoutes = router;