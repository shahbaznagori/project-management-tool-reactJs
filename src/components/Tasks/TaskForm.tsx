import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createTask, updateTask } from "../../api/tasks";
import { useNavigate, useSearchParams } from "react-router-dom";
import Head from "../Head";
import * as Yup from "yup";

interface TaskFormProps {
  onSuccess?: () => void;
}

const taskSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string().max(500, "Description is too long"),
  status: Yup.string().oneOf(["todo", "in-progress", "done"], "Invalid status"),
  dueDate: Yup.date()
    .required("Due date is required")
    .min(new Date(), "Due date cannot be in the past"),
});

const TaskForm = ({ onSuccess }: TaskFormProps) => {
  const editTask = useSelector((state: any) => state.editTask.task);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const taskId: string | null = searchParams.get("taskId");
  const projectId: string | null = searchParams.get("projectId");

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
    taskId: taskId,
    projectId: projectId,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editTask) {
      setForm(editTask);
    } else {
      setForm({
        title: "",
        description: "",
        status: "todo",
        dueDate: "",
        taskId: taskId,
        projectId: projectId,
      });
    }
  }, [editTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await taskSchema.validate(form, { abortEarly: false });
      setErrors({}); // Clear previous errors

      if (editTask?._id) {
        await updateTask(editTask._id, form);
      } else {
        await createTask(form);
      }

      if (onSuccess) onSuccess();
      navigate(`/tasks?id=${projectId}`); // navigate back to task list
    } catch (err: any) {
      if (err.inner) {
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((e: any) => {
          if (e.path) formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div className="container">
      <Head
        title={editTask ? editTask.title : "Add Task"}
        onAction2={() => navigate(`/tasks?id=${projectId}`)}
      />
      <div className="py-22">
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded mb-4 bg-white space-y-2 max-w-md mx-auto"
        >
          <div>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>

          <div>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate ? new Date(form.dueDate).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            {editTask?._id ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
