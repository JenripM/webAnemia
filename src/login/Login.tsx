// src/Components/Login.js
"use client";
import React,{useState} from "react";
import {signIn} from "next-auth/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [] = useState(null);

  const handleGoogleLogin = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    alert("Por google");
  };

  const handleTraditionalLogin = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    alert("Datos de login: " + username + "--" + password);
  };

  return (
    <section className="mx-5 my-2 mb-8 flex h-screen flex-col items-center justify-center space-y-10 md:m-0 md:flex-row md:space-x-16 md:space-y-0">
      <div className="max-w-sm lg:max-w-lg xl:max-w-xl">
        <img
          src="/images/login-image.png"
          alt="Sample image"
        />
      </div>
      <div className="mb-4 max-w-sm md:w-1/3">
        <div className="max-w-sm px-6 sm:px-0">
            <button type="button" className="mb-2 mr-2 inline-flex w-full items-center justify-between rounded-lg 
            bg-[#000000] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#A9A9A9]/90 
            focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"  
            onClick={async()=>{ const result= await signIn("google",{callbackUrl:"/dasboard"  ,redirect: false });
              console.log(result);

            }}><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" ><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" ></path></svg>Sign up with Google<div></div></button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <div className="">
          <input
            className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mt-4 w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-between text-sm font-semibold">
            <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>
          <div className="flex items-center justify-center text-center md:text-left">
            <button
              className="mt-4 rounded bg-[#000000] px-4 py-2 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#A9A9A9]/90"
              type="button"
             
            >
              Login
            </button>
          </div>
        {/* <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div> */}
        </div>
      </div>
    </section>
  );
};

export default Login;