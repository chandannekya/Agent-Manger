import { useEffect, useState } from "react";
import { GetAllAssignedTasks } from "../services/oprations/task";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await GetAllAssignedTasks();

        if (response && response.data) {
          console.log(response.data.tasks);
          setTasks(response.data.tasks || []);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className=" ">
      <table className="min-w-full  divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900">Task</th>
            <th className="px-4 py-2 font-medium text-gray-900">Agent Name</th>
            <th className="px-4 py-2 font-medium text-gray-900">Mobile No.</th>
            <th className="px-4 py-2 font-medium text-gray-900">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.length > 0 ? (
            tasks.map((entry, index) => (
              <tr key={entry._id || index}>
                <td className="px-4 py-2 font-medium text-gray-900">
                  {entry.name || "N/A"}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {entry.agentId?.name || "Unassigned"}{" "}
                  {/* Handle missing agent */}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {entry.agentId?.mobile || "N/A"}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {entry.note || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                No assigned tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
