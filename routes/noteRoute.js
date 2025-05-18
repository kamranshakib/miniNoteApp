import express from 'express';
import * as noteController from '../controllers/noteControllers.js'
const Router = express.Router()



Router.get('/',noteController.getAllNote);
Router.post('/',noteController.createNote)
Router.patch('/:id',noteController.updateNote)
Router.delete('/:id',noteController.deleteNote)
Router.get('/NoteStats',noteController.NoteStats)


export default Router;


