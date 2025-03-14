import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import CSVUpload from "./CSVUpload";
import AddAgentForm from "./AddAgentForm.jsx";
export const AddAgentModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 bg-black/40 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {location.pathname == "/agents/add" ? <AddAgentForm /> : <CSVUpload />}
        <button
          onClick={() => navigate("/agent")}
          className="mt-4 w-full max-w-sm bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
