import { useState } from "react";
import { LoginForm } from "@/interface"; // Importing from the interfaces
import Link from "next/link";
import Header from "@/components/layouts/Header";

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <>
    <Header/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-gray-600 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-pink-200 mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-full bg-pink-200 text-gray-600 py-2 rounded hover:bg-gray-600 hover:text-pink-200 hover:border border-pink-200 rounded"
        >
          Login
        </button>
         {/* Link to Sign Up page */}
         <div className="text-center mt-4">
          <p className="text-pink-200">
            Don't have an account?{" "}
            <Link href="/signup" legacyBehavior>
              <a className="text-blue-400 hover:text-blue-400">Sign Up</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
