import axiosInstance from "./axiosInstance";

interface CreateTaskDto{
    title: string,
    description?: string,
    status?: string,
    dueDate: Date,
    projectId: string,
    userId?: string
}

interface UpdateTaskDto{
    title?: string,
    description?: string,
    status?: string,
    dueDate?: Date,
    projectId?: string,
    userId?: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getTasks = async (data:{projectId:string}) => {
  try {
    const response = await axiosInstance.get("/tasks/getAll/"+data.projectId);
    return response.data.message;
  } catch (error: any) {
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
  }
};


export const createTask = async (data: CreateTaskDto) => {
  try {
    const response = await axiosInstance.post("/tasks/create", data);
    return response.data.message;
  } catch (error:any) {
    console.log(error.response?.data); // <-- this is your backend error
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
  }
};

export const updateTask = async (id: string, data: UpdateTaskDto) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    return response.data.message;
  } catch (error:any) {
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
  }
};
export const deleteTask = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data.message;
  } catch (error:any) {
    throw {
      success: false,
      message: error.response?.data?.message || 'Something went wrong'
    };
  }
};



