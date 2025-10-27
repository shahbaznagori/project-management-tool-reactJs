import { useState } from "react";
import * as Yup from "yup";
import { login } from "../api/auth";
import { Link, useNavigate } from 'react-router-dom';


interface LoginData {
//   username: string;
  email: string;
  password: string;
//   retypePassword:string
}


const Login = () => {
      const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginClick = async () => {
    try {
      await loginSchema.validate(form, { abortEarly: false });
      
       const data:LoginData = {
        //   username:form.username,
          email:form.email,
          password:form.password,
        //   retypePassword:form.retypePassword

      }
          const response =await login(data);
      
      console.log("Login data:",response);
          navigate('/project');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
          alert(`${err.success}: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-center py-20">
        <div className="loginForm border border-black p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <div className="mb-4 flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter Email"
              onChange={handleChange}
              className="border border-gray-500 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter Password"
              onChange={handleChange}
              className="border border-gray-500 px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-center">
          <button
            onClick={handleLoginClick}
            className=" bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition p-4"
          >
            Login
          </button>
            </div>
          <p className="text-center mt-3">
            Don't have an account? <span className="text-blue-500">
                <Link to="/singup" className="text-blue-500 hover:underline">
    Register Here
  </Link>
            </span>
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
