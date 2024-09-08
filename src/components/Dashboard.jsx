import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../api/axios_instance';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [first, setFirst] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        await instance({
          // url of the api endpoint (can be changed)
          url: "/user/todos/",
          method: "GET",
        }).then((response) => {
          // handle success
          const userTodos = response.data.todos.reverse();
          setTodos(userTodos)
        });
      } catch (error) {
        console.log(error);

        alert("Login Require To Access Dashboard")
        navigate("/login")
      }
    }
    getData()
  }, [first])


  const handleAddTodo = async () => {
    if (task.trim() === '') return;
    const newTodo = { todo: task, isCompleted: false };
    setTask('');

    try {
      await instance({
        url: "/user/todos/",
        method: "PUT",
        data: newTodo,
      })
        .then((response) => {
          // handle success
          setFirst(!first)
        });
    } catch (error) {
      // handle error
      if (error.response) {
        console.error('Server Response:', error.response.data);
        alert(error.response.data)
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
    }
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
    setTask(todo.todo);
  };

  const handleUpdateTodo = async () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, todo: task } : todo
      )
    );
    setTask('');
    setIsEditing(false);
    setCurrentTodo({});

    try {
      await instance({
        url: "/user/todos/",
        method: "PATCH",
      })
        .then((response) => {
          // handle success
          setFirst(!first)
        });
    } catch (error) {
      // handle error
      if (error.response) {
        console.error('Server Response:', error.response.data);
        alert(error.response.data)
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
    }
  };

  // To Handle Delete
  const handleDeleteTodo = async (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    // To Delete In Server

    try {
      await instance({
        url: `/user/todos/${id}/`,
        method: "DELETE",
      })
        .then((response) => {
          // handle success
          setFirst(!first)
        });
    } catch (error) {
      // handle error
      if (error.response) {
        console.error('Server Response:', error.response.data);
        alert(error.response.data)
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
    }
  };

  const handleToggleComplete = async (todo) => {
    setTodos(
      todos.map((e) =>
        e.id === todo.id ? { ...e, completed: !e.completed } : e
      ))

    const updatedTodo = {
      todo: todo.todo,
      isCompleted: !todo.isCompleted,
      id: todo.id
    }

    try {
      await instance({
        url: "/user/todos/",
        method: "PATCH",
        data: updatedTodo,
      })
        .then((response) => {
          // handle success
          setFirst(!first)
        });
    } catch (error) {
      // handle error
      if (error.response) {
        console.error('Server Response:', error.response.data);
        alert(error.response.data)
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-72px)] bg-gray-100 px-4 bg-gradient-to-r flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">To-Do Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
          <div className="mb-4">
            <input
              type="text"
              value={task || ""}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a task"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={isEditing ? handleUpdateTodo : handleAddTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>

        <ul className="mt-6 w-full max-w-4xl h-[60%] overflow-y-scroll bg-white p-4 rounded-lg shadow-lg custom-scrollbar">
          {todos.map((todo, i) => (
            <li key={i} className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleComplete(todo)}
                  className="mr-3"
                />
                <span
                  className={`text-lg ${todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}
                >
                  {todo.todo}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTodo(todo)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
