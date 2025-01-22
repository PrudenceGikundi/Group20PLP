import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState<string>(""); // Store email input
  const [password, setPassword] = useState<string>(""); // Store password input
  const [error, setError] = useState<string>(""); // Store error message
  const router = useRouter(); // To navigate after successful login

  // Check if the user is already signed up (in localStorage)
  const checkUserInLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Get the user stored in localStorage
    const storedUser = checkUserInLocalStorage();

    // Check if the entered email and password match the stored user data
    if (!storedUser) {
      setError("User not found. Please sign up first.");
      return;
    }

    if (storedUser.email !== email || storedUser.password !== password) {
      setError("Incorrect credentials. Please try again.");
      return;
    }

    // If credentials match, navigate to the home page
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-pink-200 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Log In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-600 text-pink-200 py-2 rounded hover:bg-pink-200 hover:text-gray-600 hover:border border-gray-600"
        >
          Log In
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
