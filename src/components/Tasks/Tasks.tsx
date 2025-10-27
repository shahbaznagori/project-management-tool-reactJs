import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTasks } from "../../api/tasks";
import Head from "../Head";
import TaskContainer from "./TaskContainer";
import { useDispatch } from "react-redux";
import { clearTask } from "../../utils/editTaskSlice";
import FilterStatus from "../FilterStatus";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const Tasks = () => {
  const [searchParams] = useSearchParams({});
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projectId: string | null = searchParams.get("id");

  const onFilterChange = (category: string) => {
    console.log("FILTER", category, tasks);

    if (!category || category === "All") {
      setFilteredTasks(tasks); 
      return;
    }

    const filtered = tasks.filter(
      (task: Task) => task.status.toLowerCase() === category.toLowerCase()
    );
    setFilteredTasks(filtered);
  };

  const handleAddProject = () => {
    console.log("ADDING PROJEt")
    dispatch(clearTask());
    navigate(`/tasks/add?projectId=${projectId}`);
  };

  useEffect(() => {
    if (projectId == null) return;
    getAllTasks(projectId);
  }, [projectId]);

  const getAllTasks = async (projectId: string) => {
    const fetchedTasks = await getTasks({ projectId });
    setTasks(fetchedTasks);
    setFilteredTasks(fetchedTasks); 
  };

  if (!projectId || filteredTasks.length === 0) {
    return (
      <div className="container">
        <Head actionName="Add Task" onAction={handleAddProject} 
        onAction2={() => navigate("/project")}
        />
        <FilterStatus
        categories={[ "todo", "in-progress", "done"]}
        onFilterChange={onFilterChange}
      />

        <div className="text-center text-gray-500 p-4">
          <h1>No tasks availableee</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Head actionName="Add Task" 
       onAction={handleAddProject}
       actionName2="Go Back"
       onAction2={() => navigate("/project")}
       />

      <FilterStatus
        categories={[ "todo", "in-progress", "done"]}
        onFilterChange={onFilterChange}
      />

      <div className="space-y-4">
        <TaskContainer tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default Tasks;
