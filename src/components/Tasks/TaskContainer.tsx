import { useNavigate } from "react-router-dom";
import { setTask } from "../../utils/editTaskSlice";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../api/tasks";
import { useEffect, useState } from "react";

interface Task {
  _id: string;
  projectId?: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface TaskContainerProps {
  tasks: Task[];
}

const TaskContainer = ({ tasks }: TaskContainerProps) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const statusClasses = {
    todo: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    done: "bg-green-100 text-green-700",
  };

  const handleEdit = (task: Task) => {
    dispatch(setTask(task));
    navigate(`/tasks/edit?taskId=${task._id}&projectId=${task.projectId}`);
  };

  const handleDelete = async (task: Task) => {
    await deleteTask(task._id);
    const updated = filteredTasks.filter((t) => t._id !== task._id);
    setFilteredTasks(updated);
  };

  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No tasks available
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer flex flex-col gap-2"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h2>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  statusClasses[task.status as keyof typeof statusClasses]
                }`}
              >
                {task.status.replace("-", " ")}
              </span>
            </div>

            <p className="text-gray-600 text-sm">{task.description}</p>
            <p className="text-gray-500 text-xs">Due: {task.dueDate}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(task)}
                className="self-end mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task)}
                className="self-end mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
