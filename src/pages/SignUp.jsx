import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // A navigáláshoz

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ne frissítse az oldalt

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered: ", user);

      // Átirányítás a főoldalra, ha sikeres a regisztráció
      navigate("/");
    } catch (err) {
      setError("Hiba a regisztráció során: " + err.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Sign Up
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
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
              Sign Up
            </button>
            <Link to={"/"}>
              <p className="text-indigo-600 hover:underline">
                Create an account here!
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
