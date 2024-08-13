import { postReq } from "../../services/reqClient";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone_number:"",
        address:""
    });
    const [err, setErr] = useState("");
    const setUserName = (name:any)=>{
        setUserInfo({...userInfo,name:name});
    }
    const setPhoneNumber = (phone_number:any)=>{
        setUserInfo({...userInfo,phone_number:phone_number});
    }
    const setAddress = (address:any)=>{
        setUserInfo({...userInfo,address:address});
    }
    const setEmail = (email:any)=>{
        setUserInfo({...userInfo,email:email});
    }
    const setPassword = (password:any)=>{
        setUserInfo({...userInfo,password:password});
    }
    const setConfirmPassword = (confirmPassword:any)=>{
        setUserInfo({...userInfo,confirmPassword:confirmPassword});
    }
    const handleSignUp = async () => {
        console.log(userInfo);
        setErr("");
        if(!userInfo.email){ setErr("email"); toast.error("Please provide your email"); return;}
        if(!userInfo.name){ setErr("name"); toast.error("Please provide your name"); return;}
        if(!userInfo.phone_number){ setErr("phone_number");toast.error("Please provide your phone number");  return;}
        if(!userInfo.address){ setErr("address");toast.error("Please provide your address");  return;}
        if(!userInfo.password){ setErr("password");toast.error("Please provide your password");  return;}
        if(!userInfo.confirmPassword || userInfo.password !== userInfo.confirmPassword){ 
            setErr("cpd");
            toast.error("Password does not match");  
            return;
        }
        const res = await postReq("/api/auth/register", {
            email: userInfo.email,
            password: userInfo.password,
            name: userInfo.name,
            phone_number: userInfo.phone_number,
            address: userInfo.address
        });
        if (res.status === 401) {
            toast.error("Email already exists");
        } else {

            toast.success("Register Success");
            navigate("/login");
        }
    }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <TextField
              id="outlined-password-input"
              label="Email"
              type="email"
              error = {err.includes("email")}
              className="w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Username"
              type="name"
              error = {err.includes("name")}
              className="w-full"
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Phone Number"
              type="name"
              error = {err.includes("name")}
              className="w-full"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Address"
              type="name"
              error = {err.includes("name")}
              className="w-full"
              onChange={(e) => setAddress(e.target.value)}
            />

            
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              error = {err.includes("password")}
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              error = {err.includes("cpd")}
              className="w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account ? {" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
