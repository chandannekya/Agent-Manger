import { agentEndpoints } from "../Apis";
import axios from "axios";
const { GET_ALL_AGENTS, CREATE_AGENT } = agentEndpoints;
import toast from "react-hot-toast";

export const GetAllAgents = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(GET_ALL_AGENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const AddAgent = async (data, navigate) => {
  const toastId = toast.loading("Creating....");
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      CREATE_AGENT,
      {
        name: data.name,
        email: data.email,
        mobile: data.countryCode + data.mobile,
        password: data.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Agent Created", { id: toastId });
    navigate("/");
  } catch (error) {
    toast.error(error.message, { id: toastId });
  }
};
