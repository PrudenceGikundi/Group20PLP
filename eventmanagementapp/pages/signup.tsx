import { useState } from "react";
import { SignUpForm } from "@/interface"; // Importing from interfaces
import Link from "next/link";

const Signup = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-8">
      <form
        onSubmit={handleSignup}
        className="bg-pink-200 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
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
          className="w-full bg-gray-600 text-pink-200 py-2 rounded hover:bg-pink-200 hover:text-gray-600 hover:border border-gray-600 rounded"
        >
          Sign Up
        </button>
        {/* Link to Login page */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue-600 hover:text-blue-800">Login</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
