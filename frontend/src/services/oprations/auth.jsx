import { authEndpoits } from "../Apis";
import axios from "axios";
import toast from "react-hot-toast";

const { SIGNIN_API, SIGNUP_API } = authEndpoits;

export const signIn = async (email, password, navigate) => {
  // Show loading toast
  const toastId = toast.loading("Processing...");

  try {
    const response = await axios.post(SIGNIN_API, { email, password });

    // Save token and show success message
    const { token } = response.data;

    localStorage.setItem("token", token);

    toast.success("LogIn Successfully", { id: toastId });
    navigate("/");
  } catch (error) {
    // Handle error
    console.log(error);
    toast.error(error.response?.data?.message || "Login Failed", {
      id: toastId,
    });
  }
};

export const signUp = async (data, navigate) => {
  const toastId = toast.loading("Signing Up...");

  try {
    const response = await axios.post(SIGNUP_API, {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirm_password,
    });

    toast.success("Sign Up Successfully!", { id: toastId });
    navigate("/signin");
  } catch (error) {
    toast.error(error.response?.data?.message || "SignUp Failed", {
      id: toastId,
    });
  }
};
