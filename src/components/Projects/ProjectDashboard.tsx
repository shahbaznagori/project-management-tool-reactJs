
import { useDispatch } from "react-redux";
import { clearProject } from "../../utils/editProjectSlice";
import Head from "../Head";
import Project from "./Project";
import { useNavigate } from "react-router-dom";

const ProjectDashboard = () => {

   const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddProject = () => {
      dispatch(clearProject()); 
    navigate("/projects/add");
  };

 const handleLogout = () => {
    navigate("/")
  };


  return (
    <div className="container mx-auto p-4">
      <Head actionName="Add Project" 
      onAction={handleAddProject}
      actionName2="Logout"
      onAction2={handleLogout}

      />
      
    <Project />
    </div>
  );
};

export default ProjectDashboard;
