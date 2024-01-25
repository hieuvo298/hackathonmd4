import express, { Request, Response } from "express";
import TodoService from "../services/todo.service";

const todoController = express.Router();
const todoService = new TodoService();

todoController.get("/", async (req, res) => {
  try {
    const data = await todoService.getAllTodo();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "error server" });
  }
});
todoController.get("/:id",async(req,res) => {
    try {
    const userId=Number(req.params.id);
    const data =await todoService.getTodoById(userId);
    res.status(200).json(data);
    } catch (error) {
     res.status(500).json({ error: error});   
    }
})
todoController.post("/create-todo", async (req: Request, res: Response) => {
  try {
    const newStudent = {
      content: req.body.content,
    };
    await todoService.createTodo(newStudent);
    res.status(201).json({ msg: "Create successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Server Error" });
  }
});
todoController.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await todoService.deleteTodoById(id);
    if (!result) {
      res.status(404).json({ msg: "To do  not found" });
    } else {
      res.status(204).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Server Error" });
  }
});
todoController.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateStudent = { ...req.body };
    const result = await todoService.updateTodo(id, updateStudent);
    if (result[0] === 0) {
      res.status(404).json({ msg: "To do not found" });
    } else {
      res.status(200).json({ msg: "Update successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Server Error" });
  }
});

export default todoController;
