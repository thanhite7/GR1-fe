import { Divider } from "antd";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider, LoginButton } from "react-facebook";
import { postReq } from "../../services/reqClient";
import TextField from "@mui/material/TextField";
import { loadGapiInsideDOM } from "gapi-script";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [err, setErr] = useState("");
  const client_id =
    "833250630024-lphorpd6u9hnj419e5lhqt1d88bgn4c6.apps.googleusercontent.com";
  const handleLoginWithGoogle = async (credentialResponse: any) => {
    console.log("check credential: ", credentialResponse);
    const res = await postReq("/auth/google",{"credentials":credentialResponse.credential});
    const res_json = await res.json();
    Cookies.set("auth_token", res_json.jwt_token);
    toast.success("Login Success");
    navigate("/dashboard");
  };
  const handleLogin = async () => {
    if(!email){ toast.error("Email is required"); return;}
    if(!password){ toast.error("Password is required"); return;}
    const res = await postReq("/api/auth/login", {
      email: email,
      password: password,
    });
    if (res.status === 404) {
      toast.error("Email does not exists");
    } else if (res.status === 401) {
      toast.error("Password is incorrect");
    } else {
      const res_json = await res.json();
      Cookies.set("auth_token", res_json.jwt_token);
      toast.success("Login Success");
      navigate("/dashboard");
    }
  };
  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <TextField
              id="outlined-password-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              className="w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={handleLogin}
            >
              Sign in
            </button>
            <Divider>Or Sign In with</Divider>
            <GoogleOAuthProvider clientId={client_id}>
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
