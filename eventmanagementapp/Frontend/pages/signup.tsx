import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if the email is already signed up
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      const parsedUser = JSON.parse(existingUser);
      if (parsedUser.email === email) {
        alert("You are already signed up. Please log in.");
        router.push("/login");
        return;
      }
    }

    // Save user data in localStorage
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to login page after successful sign-up
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-pink-200 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
