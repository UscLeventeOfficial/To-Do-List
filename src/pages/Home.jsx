import { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [todoDate, setTodoDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "todos")
        );
        const todoList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodo(todoList);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => setInput(e.target.value);
  const handleDateChange = (e) => setTodoDate(e.target.value);

  const handleTaskAdd = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated!");
      return;
    }

    if (input.trim() !== "" && todoDate.trim() !== "") {
      try {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "todos"),
          {
            task: input,
            date: todoDate,
            userId: user.uid,
          }
        );

        setTodo([
          ...todo,
          {
            id: docRef.id,
            task: input,
            date: todoDate,
          },
        ]);
        setInput("");
        setTodoDate("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleDelete = async (id) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid, "todos", id));
        setTodo(todo.filter((task) => task.id !== id));
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen py-16 px-8 relative">
      {/* Kijelentkezés gomb a jobb oldalon */}
      <button
        onClick={handleSignOut}
        className="absolute top-8 right-8 bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition duration-200"
      >
        Sign Out
      </button>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full sm:w-96">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            To-Do List
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your task..."
              value={input}
              onChange={handleInputChange}
              className="border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="date"
              className="border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={todoDate}
              onChange={handleDateChange}
              required
            />
            <button
              onClick={handleTaskAdd}
              className="bg-green-500 text-white py-2 rounded-xl shadow-md hover:bg-green-600 transition duration-200"
            >
              Add Task
            </button>
          </div>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {todo.map((task) => (
              <li
                key={task.id}
                className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-150"
              >
                <span className="font-semibold text-xl w-full truncate">
                  {task.task}
                </span>
                <span className="text-gray-500">{task.date}</span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
