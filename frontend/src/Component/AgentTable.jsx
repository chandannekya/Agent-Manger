import React, { useEffect, useState } from "react";
import { GetAllAgents } from "../services/oprations/agent";

export const AgentTable = () => {
  const [agents, setAgents] = useState([]); // Clearer naming

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await GetAllAgents();

        console.log(response);

        // Ensure the response structure is correct before accessing data
        if (response && response.data) {
          setAgents(response.data.data || []); // Fallback to empty array
        } else {
          setAgents([]);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
        setAgents([]); // Handle API failure gracefully
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900">Name</th>
            <th className="px-4 py-2 font-medium text-gray-900">Email</th>
            <th className="px-4 py-2 font-medium text-gray-900">Mobile No.</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {agents.length > 0 ? (
            agents.map((entry, index) => (
              <tr key={entry._id || index}>
                {" "}
                {/* Use unique ID if available */}
                <td className="px-4 py-2 font-medium text-gray-900">
                  {entry.name || "N/A"}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {entry.email || "N/A"}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {entry.mobile || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
