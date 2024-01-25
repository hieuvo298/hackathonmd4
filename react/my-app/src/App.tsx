import React, { useEffect, useState } from "react";
import "./App.css";
import { MdDelete, MdEditSquare } from "react-icons/md";
import axios from "axios";
import { Modal } from "antd";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySucces } from "./config/toastify.config";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  const showModal = (id: number) => {
    setEditTodoId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (editTodoId !== null) {
      handleEdit(editTodoId);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/todo");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [content, setContent] = useState<string>("");

  const handleEdit = async (id: any) => {
    try {
      if (!content.trim()) {
        notifyError("Please enter content to update");
      } else {
        await axios.patch(`http://localhost:8000/api/v1/todo/update/${id}`, {
          content,
        });
        notifySucces("Updated successfully");
        fetchData();
        setContent("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const choice = window.confirm("are you sure you want to delete");
      if (choice) {
        await axios.delete(`http://localhost:8000/api/v1/todo/delete/${id}`);
        notifySucces("Deleted successfully");
        fetchData();
      }
    } catch (error) {
      notifyError("error deleting ");
      console.error("Error:", error);
    }
  };

  const handleAddTodo = async () => {
    try {
      if (!content.trim()) {
        notifyError("Please enter content to add");
      } else {
        await axios.post("http://localhost:8000/api/v1/todo/create-todo", {
          content,
        });
        notifySucces("Added successfully");
        fetchData();
        setContent("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <header className="header-page">
        <p>Note app</p>
      </header>
      <div className="content-add-todo">
        <h5>Title</h5>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="add-todo"
          id="add-todo"
          placeholder="Take a note"
        ></textarea>
        <span className="add-btn" onClick={handleAddTodo}>
          +
        </span>
      </div>
      <div className="list-todo-container">
        {data.map((todo) => (
          <div key={todo.id} className="list-todo">
            <p>{todo.content}</p>
            <div className="edit-update-btn">
              <button onClick={() => handleDelete(todo.id)}>
                <MdDelete className="delete-icon" />
              </button>
              <button onClick={() => showModal(todo.id)}>
                <MdEditSquare className="edit-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Edit todo"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="edit-todo"
          id="edit-todo"
          placeholder="Edit note"
        ></textarea>
      </Modal>
    </div>
  );
}

export default App;
