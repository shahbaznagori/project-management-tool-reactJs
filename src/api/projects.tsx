import axiosInstance from "./axiosInstance";

interface CreateProjectDto{
  title:string,
  description:string,
  status:string,
}

interface UpdateProjectDto{
  title:string,
  description:string,
  status:string,
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getProjects = async () => {
    try{
    console.log("TOEKEN" , localStorage.getItem('access_token'))
  const response = await axiosInstance.get("/project");
  console.log("RES", response)
  return response.data.message;

}catch (error:any) {
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
}
};

export const createProject = async (data: CreateProjectDto) => {
    try{
      console.log("DATA",data)
  const response = await axiosInstance.post("/project/create", data);
  console.log("RES", response)
  return response.data.message;

}catch (error:any) {
  console.log(error.response?.data); // <-- this is your backend error
  throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
}
};

export const updateProject = async (id: string, data: UpdateProjectDto) => {
    try{
  const response = await axiosInstance.put(`/project/${id}`, data);
  console.log("RES", response)
  return response.data.message;

}catch (error:any) {
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
}
};



export const deleteProject = async (id: string) => {
    try{
  const response = await axiosInstance.delete(`/project/${id}`);
  console.log("RES", response)
  return response.data.message;

}catch (error:any) {
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
}
};
