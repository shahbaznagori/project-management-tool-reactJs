/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { deleteProject, getProjects } from "../../api/projects";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProject } from "../../utils/editProjectSlice";

interface Project {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  description: string;
  status: string;
  tasks: string[];
}

const Project = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [projects, setProjects] = useState<Project[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const response = await getProjects();
      console.log("Projects:", response);
      setProjects(response);
      setFilteredProjects(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("Error fetching projects:", error);
      alert(`Error fetching projects: ${error.message}`);
    }
  };

  const handleSearch = async () => {
    try {
      const filtered = projects.filter((p) =>
        p.title?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProjects(filtered);
    } catch (error: any) {
      console.error("Error filtering projects:", error);
      alert(`Error filtering projects: ${error.message}`);
    }
  };

  const handleViewDetails = (id: string) => {
    try{
    navigate(`/tasks?id=${id}`);
  } catch (error: any) {
      console.error("Error filtering projects:", error);
      alert(`Error View details: ${error.message}`);
    }
  }

  const handleEditProject = (id: string, project: Project) => {
    try{
    dispatch(setProject(project)); // pre-fill edit form
    navigate(`/projects/edit/${id}`);
  } catch (error: any) {
      console.error("Error filtering projects:", error);
      alert(`Error edit project: ${error.message}`);
    }
  }

  const handleDeleteProject = async (id: string) => {
    try{
     await deleteProject(id);
    getAllProjects();
  } catch (error: any) {
      alert(`Error delete project: ${error.message}`);
    }
  }

  if (!filteredProjects || filteredProjects.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        
        <h1 className="text-xl font-medium">No Projects Available</h1>
      </div>
    );
  }
return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
    <div className="border border-gray-200 rounded-2xl p-6 mb-10 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <h1 className="font-semibold text-xl mb-4 text-gray-800 tracking-tight">
        Search Your Project
      </h1>
      <div className="flex items-center">
        <input
          className="flex-1 border border-gray-300 p-3 rounded-l-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-700"
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="border border-gray-300 p-3 rounded-r-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 cursor-pointer"
          onClick={handleSearch}
        >
          🔍
        </button>
      </div>
    </div>

    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center tracking-tight">
        Projects Overview
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 p-6 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition">
                {project.title}
              </h2>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  project.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {project.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-6 line-clamp-3">
              {project.description || "No description available."}
            </p>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <p>
                <span className="font-medium text-gray-700">Created:</span>{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-3">
                <button
                  className="text-blue-600 hover:text-blue-700 font-bold transition cursor-pointer
                  px-2
                  "
                  onClick={() => handleViewDetails(project._id)}
                >
                  View →
                </button>
                <button
                  className="text-amber-600 hover:text-amber-700 font-bold transition cursor-pointer"
                  onClick={() => handleEditProject(project._id, project)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-700 font-bold transition cursor-pointer"
                  onClick={() => handleDeleteProject(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default Project;
