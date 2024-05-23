import { useState } from "react";
import "tailwindcss/tailwind.css"; // Ensure you have Tailwind CSS installed and configured

const TodoApp = () => {
  // State to manage the input value
  const [inputValue, setInputValue] = useState("");
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);
  // State to determine if a todo is being edited
  const [isEditing, setIsEditing] = useState(false);
  // State to keep track of the todo currently being edited
  const [currentTodo, setCurrentTodo] = useState(null);

  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(), // Unique ID for each todo
        text: inputValue,
      };
      setTodos([...todos, newTodo]); // Add the new todo to the list
      setInputValue(""); // Clear the input field
    }
  };

  // Function to delete a todo by ID
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id); // Filter out the todo to be deleted
    setTodos(updatedTodos); // Update the state with the new list
  };

  // Function to set up editing mode for a specific todo
  const editTodo = (todo) => {
    setIsEditing(true); // Enable editing mode
    setInputValue(todo.text); // Set the input field with the current todo text
    setCurrentTodo(todo); // Set the current todo being edited
  };

  // Function to update a todo's text
  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, text: inputValue } : todo
      )
    );
    setInputValue(""); // Clear the input field
    setIsEditing(false); // Disable editing mode
    setCurrentTodo(null); // Clear the current todo being edited
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-4">
          {/* Input field to enter a new todo or edit an existing one */}
          <input
            type="text"
            placeholder="Enter your work"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2 flex-grow mr-2 rounded"
          />
          {/* Button to add a new todo or update an existing one */}
          <button
            onClick={isEditing ? updateTodo : addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        {/* List of todos */}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <span className="flex-grow">{todo.text}</span>
              {/* Button to edit a todo */}
              <button
                onClick={() => editTodo(todo)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              {/* Button to delete a todo */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
