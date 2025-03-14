import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddAgent } from "../services/oprations/agent";
const AddAgentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    countryCode: "+91", // Default to India
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AddAgent(formData, navigate);
    // Here, you can send data to the backend API
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Agent</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              onChange={handleChange}
              name="password"
              placeholder="********"
            />
          </div>

          {/* Mobile Number Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobile"
            >
              Mobile Number
            </label>
            <div className="flex">
              <select className="border border-gray-300 px-2 py-2 rounded-l-md focus:outline-none focus:border-indigo-500">
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
              </select>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-indigo-500"
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="9876543210"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgentForm;
