import { Op, where } from "sequelize";
import Todo from "../models/todo.model";

class TodoRepository {
  async getAllTodo() {
    return await Todo.findAll();
  }
  async getTodoById(id: number) {
   return await Todo.findAll({
        where: {
            id
        }
    });
  }

  async createTodo(formRequest: any) {
    await Todo.create(formRequest);
  }

  async deleteById(id: number) {
    return await Todo.destroy({
      where: {
        id
      }
    });
  }

  async updateTodo(id: number, formUpdate: any) {
    return await Todo.update(formUpdate, {
      where: {
        id,
      },
    });
  }
}

export default TodoRepository;
