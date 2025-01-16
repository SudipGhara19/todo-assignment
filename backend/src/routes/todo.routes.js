import express from 'express';
import { addTodo, deleteTodo, getAllTodos, updateTodo, updateTodoState } from '../controllers/test.controller.js';

const todoRoutes = express.Router();

todoRoutes.post('/addTodo', addTodo);
todoRoutes.get('/getAll', getAllTodos);
todoRoutes.put('/update', updateTodo);
todoRoutes.put('/updateState/:id', updateTodoState);
todoRoutes.delete('/deleteTodo/:id', deleteTodo);

export default todoRoutes;