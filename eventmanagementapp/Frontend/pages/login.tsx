import { useState } from "react";
import { LoginForm } from "@/interface"; // Importing from the interfaces
import Link from "next/link";


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

// // frontend/pages/login.tsx
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       if (response.data.token) {
//         // Save the token in localStorage (or sessionStorage)
//         localStorage.setItem("token", response.data.token);

//         // Redirect to admin or normal page based on the role
//         if (response.data.user.role === "admin") {
//           router.push("/admin");
//         } else {
//           router.push("/");
//         }
//       }
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         {error && <p>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
