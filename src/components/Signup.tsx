import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { signup } from "../api/auth";

interface SignupData {
  username: string;
  email: string;
  password: string;
  retypePassword:string
}

const Signup = () => {

  const navigate = useNavigate()
   
 const signupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Retype Password is required"),
});


  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });

const handleSignupClick = async () => {
  try {
    await signupSchema.validate(form, { abortEarly: false }); 
    console.log("Validation passed:", form);
      const data:SignupData = {
          username:form.username,
          email:form.email,
          password:form.password,
          retypePassword:form.retypePassword

      }
    const response =await signup(data);
    console.log(response);
         navigate('/project');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
          alert(`${err.success}: ${err.message}`);
    }
};


   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container enter ">
        <div className="flex justify-center-safe py-30">
        <div className="signupForm border border-black ">
        <h2 className="text-2xl font-bold mb-6 text-center pt-2">Sign Up</h2>
  <div className="mb-4 flex flex-col">
          <label className="mb-1 font-medium mx-9">Email</label>
          <input
            className="border border-gray-500 px-3 py-2 rounded mx-9"
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex flex-col ">
          <label className="mb-1 font-medium mx-9">Name</label>
          <input
            className="border border-gray-500 px-3 py-2 rounded mx-9"
            type="text"
            name="username"
            value={form.username}
            placeholder="Enter Name"
            onChange={handleChange}
          />
        </div>

 <div className="mb-4 flex flex-col">
          <label className="mb-1 font-medium mx-9">Password</label>
          <input
            className="border border-gray-500 px-3 py-2 rounded mx-9"
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={handleChange}
          />
        </div>
<div className="mb-6 flex flex-col">
          <label className="mb-1 font-medium mx-9">Retype Password</label>
          <input
            className="border border-gray-500 px-3 py-2 rounded mx-9"
            type="password"
            name="retypePassword"
            value={form.retypePassword}
            placeholder="Retype Password"
            onChange={handleChange}
          />
        </div>
      <button 
      onClick={handleSignupClick}
      className=" mx-50 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition px-3">
      Sign Up
    </button>
    <p className="text-center mt-3">
  Already have an account?{" "}
  <Link to="/" className="text-blue-500 hover:underline">
    Login here
  </Link>
</p>
      </div>
        
      </div>
    </div>
  );
};

export default Signup;
