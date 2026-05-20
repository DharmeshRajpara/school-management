import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React, { useEffect, useState } from "react";
import { CircleCheckBig, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Facultys() {
  const [statusStudent, setstatusStudent] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [ab, setAb] = useState(false);
  const [search, setSearch] = useState("");
  const [sdata, setSdata] = useState("");
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState("");
  const [rollnumbers, setRollnumbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("faculty-token")}`,
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/faculty/me", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "invalid or expired token") {
          localStorage.removeItem("faculty-token");
          navigate("/faculty-login");
        }
        setName(result);
      })

      .catch((error) => console.error(error));

    const myHeaderss = new Headers();
    myHeaderss.append("Content-Type", "application/json");
    myHeaderss.append(
      "Authorization",
      `Bearer ${localStorage.getItem("facultytoken")}`,
    );

    const requestOptionss = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8080/api/v1/faculty/allstudent?page=${page}&limit=5&${search ? "q=" + search : ""}`,
      requestOptionss,
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setTotalpage(result?.totalPages);
      })
      .catch((error) => console.error(error));
  }, [ab, sdata, page]);

  console.log(totalpage, 88);

  function logoutfunction() {
    // console.log(new Date().toDateString());
    localStorage.removeItem("faculty-token");
    navigate("/faculty-login");
  }

  if (data?.apdata) {
    data?.apdata?.forEach((item) => {
      const d = new Date();
      const d1 = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      // console.log(item.date)
      if (item.date == d1) {
        rollnumbers.push(item.rollNumber);
      }
    });
  }

  let d = new Date();
  function absentprasentfunction(rollNumber) {
    setstatusStudent(!statusStudent);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      date: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear(),
      rollNumber: rollNumber,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/faculty/AddPresent", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAb(!ab);
        if (result.message === "add present") {
          return toast.success(result.message);
        } else {
          return toast.error(result.message);
        }
      })
      .catch((error) => console.error(error));
  }

  //     const filteredStudents = data?.students?.filter((item) =>
  //   item?.name?.toLowerCase().includes(search.toLowerCase()) ||
  //   item?.rollNumber?.toString().includes(search)
  // );

  function searchfunction(e) {
    setSearch(e.target.value);
    setTimeout(() => {
      setSdata(e.target.value);
    }, 2000);
  }
  return (
    <>
      <div className="bg-gray-50 flex flex-col items-center mx-4 min-h-screen pt-5">
        <div className=" flex justify-between items-center my-2 px-2  w-full max-w-5xl  ">
          <div onClick={logoutfunction} className="text-2xl cursor-pointer">
            logout
          </div>
          <div className=" flex items-end flex-col">
            <div className="text-3xl">{name?.name}</div>
            {/* <div className="text-xl"> roll no:101</div> */}
          </div>
        </div>
        <div className="bg-white  border w-full max-w-5xl shadow max-h-screen overflow-hidden  rounded-2xl">
          <div className="flex justify-between flex-col md:flex-row bg-gray-50  py-5 px-5">
            <div className="text-2xl">student list</div>
            <div className="flex border items-center bg-white pl-2 rounded-xl">
              <Search width={16} />
              <input
                type="text"
                placeholder="Search Students"
                className=" outline-none max-w-md w-full p-2 pl-3"
                value={search}
                onChange={(e) => searchfunction(e)}
              />
            </div>
          </div>
          <hr />
          <div className="w-full">
            <table className="w-full">
              <thead className="bg-gray-50 ">
                <tr>
                  <th className="w-[10%] py-4">Roll</th>
                  <th className=" w-[50%] px-10 text-start py-4">NAME</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.students?.map((item, index) => {
                  return (
                    <tr className="text-center border-y " key={index}>
                      <td className="  py-4">{item?.rollNumber}</td>
                      <td className=" text-start py-4 px-10">{item?.name}</td>
                      <td className="py-4">
                        <span
                          className={`${rollnumbers?.includes(item?.rollNumber.toString()) ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"} rounded-2xl px-2 p-1`}
                        >
                          {rollnumbers?.includes(item?.rollNumber.toString())
                            ? "present"
                            : "Absent"}
                        </span>
                      </td>
                      <td className="flex py-4 justify-center">
                        {" "}
                        <CircleCheckBig
                          onClick={() =>
                            absentprasentfunction(item?.rollNumber)
                          }
                        />{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex mt-3 justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                />
              </PaginationItem>

              {[...Array(totalpage)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={page === index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (page < totalpage) {
                      setPage(page + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default Facultys;
