// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://agent-manger-vgju.vercel.app";
// const BASE_URL = "http://localhost:5001";
export const authEndpoits = {
  SIGNUP_API: `${BASE_URL}/api/auth/signUp`,
  SIGNIN_API: `${BASE_URL}/api/auth/login`,
};

export const agentEndpoints = {
  GET_ALL_AGENTS: `${BASE_URL}/api/agent`,
  CREATE_AGENT: `${BASE_URL}/api/agent/create-agent`,
};

export const taskEndpoints = {
  UPLOAD_CSV: `${BASE_URL}/api/task/upload-file`,
  GET_ALL_ASSIGNED: `${BASE_URL}/api/task/assigned-task`,
  ASSIGN_TASK: `${BASE_URL}/api/task/task-assign`,
};
