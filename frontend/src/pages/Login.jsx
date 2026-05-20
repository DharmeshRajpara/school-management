import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    if (!email && !password) {
      return toast.error("Allfeild are reuired");
    }
    if (!email) {
      return toast.error("please email is reuired");
    }
    if (!password) {
      return toast.error("please password is reuired");
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/user/student-login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("student-token", result.token);

          if (result.message == "student login successfully") {
            toast.success(result.message);
            Navigate("/student");
          }
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("invalid");
      });
  }

  return (
    <div className=" bg-gray-50 ">
      <div className=" flex justify-center items-center h-screen  ">
        <div className="  w-full mx-4 max-w-md  shadow p-5 bg-white border rounded-2xl  ">
          <div className="text-center flex gap-3 flex-col items-center">
            <h1 className="text-4xl">student login</h1>
          </div>
          <form action="" className="mt-4">
            <div className="flex flex-col mt-4">
              <label htmlFor="">email</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="shadow focus:border-blue-400 outline-none p-2 rounded-xl mt-1 border bg-gray-50"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="">password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="shadow focus:border-blue-400 outline-none p-2 rounded-xl mt-1 border bg-gray-50"
              />
            </div>

            <button
              onClick={(e) => submit(e)}
              className="bg-blue-300 w-full mt-4 p-2 rounded-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
