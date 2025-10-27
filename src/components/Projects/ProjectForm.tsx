import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createProject, updateProject } from "../../api/projects";
import { useNavigate } from "react-router-dom";
import Head from "../Head";
import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string().max(500, "Description is too long"),
  status: Yup.string().oneOf(["active", "completed"], "Invalid status"),
});

const ProjectForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const editProject = useSelector((state: any) => state.editProject.project);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editProject) {
      setForm(editProject);
    } else {
      setForm({ title: "", description: "", status: "active" });
    }
  }, [editProject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await projectSchema.validate(form, { abortEarly: false });
      setErrors({}); // Clear errors if valid

      if (editProject?._id) {
        const res = await updateProject(editProject._id, form);
        console.log(res);
      } else {
        const res = await createProject(form);
        console.log(res);
      }

      navigate("/project");
      if (onSuccess) onSuccess();
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
        title={editProject?._id ? editProject.title : "Add Project"}
        onAction2={() => navigate("/project")}
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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            {editProject?._id ? "Update Project" : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
