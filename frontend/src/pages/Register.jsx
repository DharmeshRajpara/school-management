import { KeyRound } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function Register() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState(
    location.state?.lastRollnumber + 1 || 1,
  );
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();
  // console.log(role, 88889899999999);

  // console.log(location.state, 8);

  function submit(e) {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw;
    if (role === "student") {
      raw = JSON.stringify({
        role: role,
        email: email,
        name: name,
        password: password,
        rollNumber: role === "student" && rollNumber,
      });
    } else {
      console.log(role, 88);

      raw = JSON.stringify({
        role: role,
        email: email,
        name: name,
        password: password,
      });
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/user/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "register successfully") {
          toast.success(result.message);

          setName("");
          setEmail("");
          setPassword("");
          setRole("");
          // setRollNumber("")
          navigate("/admin");
        } else {
          toast.error(result.message);
          if (result.message == "rollnumber  already exists") {
            setRollNumber(rollNumber + 1);
          }
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
      <div className=" bg-gray-50 flex justify-center items-center">
        <div className="  w-full mx-4 max-w-md flex justify-center items-center h-screen  ">
          <div className=" shadow p-8  bg-white border rounded-2xl  ">
            <div className="text-center flex gap-3 flex-col items-center">
              <KeyRound className="w-20" />
              <h1 className="text-4xl">School Managements</h1>
              <p> Register</p>
            </div>
            <form action="" className="mt-4">
              <div className="flex flex-col ">
                <label htmlFor="">LOGIN AS</label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  name=""
                  value={role}
                  id=""
                  aria-placeholder="sdsd"
                  className="shadow border bg-gray-50 p-2 rounded-xl outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="student">student</option>
                  <option value="faculty">faculty</option>
                </select>
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="">name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="shadow p-2 rounded-xl mt-1 border bg-gray-50"
                />
              </div>
              {role === "student" ? (
                <div className="flex flex-col mt-4">
                  <label htmlFor="">Roll Number</label>
                  <input
                    type="Number"
                    disabled
                    value={rollNumber}
                    onChange={(e) => {
                      setRollNumber(e.target.value);
                    }}
                    className="shadow p-2 rounded-xl mt-1 border bg-gray-50"
                  />
                </div>
              ) : null}
              <div className="flex flex-col mt-4">
                <label htmlFor="">email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="shadow p-2 rounded-xl mt-1 border bg-gray-50"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="">password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="shadow p-2 rounded-xl mt-1 border bg-gray-50"
                />
              </div>

              <button
                onClick={(e) => submit(e)}
                className="bg-blue-300 w-full mt-4 p-2 rounded-xl"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
