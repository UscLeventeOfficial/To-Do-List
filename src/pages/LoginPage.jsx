import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; // Ha van navigálás

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Megakadályozza, hogy az oldal újratöltődjön

    const auth = getAuth();

    try {
      // Bejelentkezés a Firebase Authentication használatával
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Ha sikeres, átirányítás a főoldalra
    } catch (error) {
      // Specifikus hibák kezelése
      if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email");
      } else {
        setError("Login failed, please try again");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-xl border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              required
            />
            <button
              type="button"
              onClick={() => {
                setIsVisible(!visible);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {visible ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-xl shadow-md hover:bg-green-600 transition duration-200 font-bold"
          >
            Login
          </button>
          <Link to={"/signup"}>
            <p className="text-indigo-600 hover:underline">
              Create an account here!
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
