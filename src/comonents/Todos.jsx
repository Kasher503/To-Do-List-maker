import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
  const notify = (message) => toast(message);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showcompleted, setshowcompleted] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  const save = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const timestamp = new Date().toLocaleString();
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false, timestamp }]);
    setTodo("");
    save();
    notify("Todo added successfully!");
  };

  const handleChange = (e) => setTodo(e.target.value);

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    save();
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    save();
    notify("Todo deleted successfully!");
  };

  const Edit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setTodo(todoToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id));
    save();
  };

  const Clear = () => {
    setTodos([]);
    save();
    notify("All todos cleared!");
  }

  const toggleShowCompleted = () => {
    setshowcompleted(!showcompleted);
  };

  return (
    <div className="max-w-screen-lg px-4 sm:px-6 lg:px-8 rounded-xl mx-auto my-3 py-5 bg-purple-400 min-h-[80vh] mb-10 mt-10">
      <ToastContainer />
      <h2 className="text-center font-bold text-4xl my-5 text-purple-100">
        iTask Manage your all todos at one page
      </h2>
      <h2 className=" text-lg text-purple-100 ml-3">Add Todos</h2>
      <div className="mb-3 flex flex-col sm:flex-row gap-6 items-center">
        <input
          type="text"
          className="w-full sm:w-1/2 rounded-full my-2 py-1 px-4"
          onChange={handleChange}
          value={todo}
        />
        <button
          className="bg-purple-500 hover:bg-purple-700 p-3 text-purple-100 font-bold px-4 rounded-full"
          onClick={handleAdd}
        >
          <MdSaveAlt className="text-xl font-bold" />
        </button>
      </div>
      <div className="flex items-center gap-2 mb-5">
        <input
          type="checkbox"
          className="form-checkbox"
          onChange={toggleShowCompleted}
          checked={showcompleted}
        />
        <label className="text-sm">Show Completed</label>
      </div>
      <h2 className="font-bold text-lg flex text-purple-100 ml-2">
        Your Todos
      </h2>
      {todos.length === 0 && (
        <div className="flex flex-col items-center text-2xl font-bold justify-center mt-10 text-purple-100">
          There are no todos to display
        </div>
      )}
      <div className="todos flex flex-col gap-5 mt-2">
        {todos
          .filter((item) => (showcompleted ? true : !item.isCompleted))
          .map((item) => (
            <div
              key={item.id}
              className="todo flex flex-col sm:flex-row justify-between sm:w-full lg:w-1/2"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => toggleCompleted(item.id)}
                  className="appearance-none rounded-full h-5 w-5 border border-gray-300 bg-white focus:outline-none"
                />
                <div
                  className={`${
                    item.isCompleted ? "line-through" : ""
                  } text-lg font-bold ml-2`}
                >
                  {item.todo}
                </div>
              </div>
              <div className="text-purple-100 text-sm mt-1 sm:mt-0">
                {item.timestamp}
              </div>
              <div className="buttons flex mt-3 sm:mt-0 h-full">
                <button
                  className="bg-purple-500 hover:bg-purple-700 p-3 mx-1 rounded-full text-purple-100 text-sm font-bold"
                  onClick={() => Edit(item.id)}
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  className="bg-purple-500 hover:bg-purple-700 p-3 mx-1 rounded-full text-purple-100 text-sm font-bold"
                  onClick={() => handleDelete(item.id)}
                >
                  <MdDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}
      </div>
      {todos.length !== 0 && (
      <button
        className="bg-purple-500 hover:bg-purple-700 p-3 mx-1 rounded-full text-purple-100 text-sm font-bold mt-10" 
        onClick={Clear}
      >
        Clear all
      </button>
      )}
    </div>
  );
};

export default Todos;
