import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StatsCards from "../Component/StatsCard";
import TaskTable from "../Component/TaskTable";
import { GoTasklist } from "react-icons/go";
import { AddAgentModal } from "../Component/AddAgentModel";
import { AgentTable } from "../Component/AgentTable";
import { NavLink } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { AssignTask } from "../services/oprations/task";
import { CiLogout } from "react-icons/ci";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/agents/add") {
      const closeModal = (e) => {
        if (e.target.id === "modalOverlay") {
          navigate("/agent");
        }
      };
      window.addEventListener("click", closeModal);
      return () => window.removeEventListener("click", closeModal);
    }
  }, [location, navigate]);
  const handleLogout = () => {
    localStorage.setItem("token", "");
    window.location.reload();
  };

  return (
    <div className="flex flex-1 bg-gray-50 min-h-screen  max-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative transition-transform duration-300`}
      >
        <div className="flex flex-col flex-grow pt-5  h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 font-bold text-center">
            MANAGER
            {/* Sidebar Toggle (Mobile) */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </button>
          </div>

          <hr className="border-gray-200 mt-4" />

          {/* Navigation */}
          <div className="flex flex-col flex-1 justify-between px-3 mt-6">
            <nav className="space-y-2">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white" // Active state
                      : "text-gray-900 hover:text-white hover:bg-indigo-600" // Inactive state
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </NavLink>
              <NavLink
                to="/agent"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white" // Active state
                      : "text-gray-900 hover:text-white hover:bg-indigo-600" // Inactive state
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Agents
              </NavLink>

              <NavLink
                to={"/agents/add"}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white" // Active state
                      : "text-gray-900 hover:text-white hover:bg-indigo-600" // Inactive state
                  }`
                }
              >
                <IoPersonAdd className="w-5 h-5 mr-4" />
                Add Agent
              </NavLink>

              <NavLink
                to={"/tasks/add"}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white" // Active state
                      : "text-gray-900 hover:text-white hover:bg-indigo-600" // Inactive state
                  }`
                }
              >
                <GoTasklist className="w-5 h-5 mr-4" />
                Add Task
              </NavLink>

              <button
                className={`flex items-center px-4 w-full py-2.5 text-sm font-medium rounded-lg transition-all duration-200 
                      bg-indigo-600 text-white  hover:scale-105  hover:transition-all
                      
                  `}
                onClick={() => {
                  AssignTask(navigate);
                }}
              >
                <GoTasklist className="w-5 h-5 mr-4" />
                Assign Tasks
              </button>
            </nav>

            <hr className="border-gray-200" />

            <div className="pb-4 mt-20">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center   w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
              >
                <CiLogout className="w-5 h-5 mr-4" /> Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <main className="p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between bg-gray-50  items-center">
              {" "}
              <h1 className="text-xl font-bold">Welcome to the Dashboard</h1>
              <button
                className="p-4 md:hidden  "
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
            </div>
            <div className="flex flex-col ">
              <StatsCards />
              <div className="overflow-auto max-w-screen h-full max-h-[60vh]">
                <Routes>
                  <Route path="/" element={<TaskTable />} />
                  <Route path="/agent" element={<AgentTable />} />
                  <Route path="/tasks/add" element={<AddAgentModal />} />
                  <Route path="/agents/add" element={<AddAgentModal />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
