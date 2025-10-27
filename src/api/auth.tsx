

import axiosInstance from "./axiosInstance";

interface SignupData {
  username: string;
  email: string;
  password: string;
  retypePassword:string
}

interface LoginData {
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
    try{
    console.log("DATA", data)
  const response = await axiosInstance.post("/auth/register", data);
  console.log("RESsss", response)
  localStorage.setItem('accessToken', response.data.accessToken);
  return response.data;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch (error:any) {
throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
}
};




export const login = async (data: LoginData) => {
  try{
  const response = await axiosInstance.post("/auth/login", data);
  console.log("TOKEN AT LOGIN" , response.data.message.access_token)
  localStorage.setItem('access_token', response.data.message.access_token);
  
  return response.data;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch (error: any) {
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
}
};