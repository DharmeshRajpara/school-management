import React from "react";

import Admin from "./Admin";

import Student from "./Student";
import Facultys from "./Facultys";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav className="flex justify-center items-center gap-5 h-screen">
        <Link to="/admin-login" className="border py-2 px-4">
          admin
        </Link>
        <Link to="/student-login" className="border py-2 px-4">
          student
        </Link>
        <Link to="/faculty-login" className="border py-2 px-4">
          faculty
        </Link>
      </nav>
    </>
  );
}

export default Home;
