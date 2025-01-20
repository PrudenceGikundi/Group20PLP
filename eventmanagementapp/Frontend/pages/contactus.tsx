import { useState } from "react";
import { ContactForm } from "@/interface"; // Importing from the interfaces, similar to LoginForm
import Link from "next/link";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send the form data to an API)
  };

  return (
    <>
    <Header/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-600 p-8 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold text-pink-200 mb-4">Contact Us</h2>
          
          {/* Name Input */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Message Textarea */}
          <textarea
            placeholder="Your Message"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-200 text-gray-600 py-2 rounded hover:bg-gray-600 hover:text-pink-200 hover:border border-pink-200 rounded"
          >
            Submit
          </button>

          {/* Link to Privacy Policy */}
          <div className="text-center mt-4">
            <p className="text-pink-200">
              By submitting, you agree to our{" "}
              <Link href="/privacy-policy" legacyBehavior>
                <a className="text-blue-400 hover:text-blue-400">Privacy Policy</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
