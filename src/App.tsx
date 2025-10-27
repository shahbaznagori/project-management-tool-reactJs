import './App.css'
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectDashboard from './components/Projects/ProjectDashboard';
import Tasks from './components/Tasks/Tasks';
import ProjectForm from './components/Projects/ProjectForm';
import store from "./utils/store"
import { Provider } from 'react-redux';
import TaskForm from './components/Tasks/TaskForm';
import TaskContainer from './components/Tasks/TaskContainer';
import Signup from './components/Signup';




const appRouter = createBrowserRouter([
  {
    path:"/",
     element:<Login/>,
  },
  {
    path:"/singup",
     element:<Signup/>,
  },
  {
    path:'/project',
    element:<ProjectDashboard/>,
  },
  {
    path:"/tasks",
    element:<Tasks/>,
  },
  {
     path:"/projects/add",
     element:<ProjectForm  />
  },
  {
     path:"/projects/edit/:id",
     element:<ProjectForm />
  },
  {
     path:"/tasks/add",
     element:<TaskForm  />
  },
  {
     path:"/tasks/edit",
     element:<TaskForm />
  },
  {
     path:"/tasks/data",
     element:<TaskContainer tasks={[]} />
  }
 ])

function App() {

  return (
     <Provider store={store}>
      <div>
      <RouterProvider router={appRouter}/>

      </div>
      </Provider>
  )
}

export default App
