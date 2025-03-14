import { taskEndpoints } from "../Apis";
import axios from "axios";
import toast from "react-hot-toast";

const { UPLOAD_CSV, GET_ALL_ASSIGNED, ASSIGN_TASK } = taskEndpoints;

export const FileUpload = async (file, navigate) => {
  const toastId = toast.loading("Uploading...");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized! Please login.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(UPLOAD_CSV, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("File Uploaded", { id: toastId });
    navigate("/");
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);
    toast.error("Upload failed. Please try again!", { id: toastId });
  }
};

export const GetAllAssignedTasks = async () => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      toast.error("Unauthorized! Please login.");
      return;
    }

    const response = await axios.get(GET_ALL_ASSIGNED, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(
      "Fetch Assigned Tasks Error:",
      error.response?.data || error.message
    );
    toast.error("Something went wrong!");
  }
};

export const AssignTask = async (navigate) => {
  const toastId = toast.loading("Assigning Task...");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized! Please login.");
      navigate("/login");
      return;
    }

    console.log("Assigning Task with Token:", token);

    await axios.post(
      ASSIGN_TASK,
      {},
      {
        // <-- Fixed missing headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Task Assigned", { id: toastId });
    navigate("/");
  } catch (error) {
    console.error("Assign Task Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "No Pending Tasks", {
      id: toastId,
    });
  }
};
