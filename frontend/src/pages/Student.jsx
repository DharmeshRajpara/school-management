import { CircleCheckBig, CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Student() {
  const [calendarDate, setCakenderDate] = useState(new Date());
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const totaldate = [];
  const [presentdate, setPresentdate] = useState([]);
  const [data, setData] = useState();
  const Navigate = useNavigate();

  const [name, setName] = useState();
  // console.log(year, month + 1, firstDay, daysInMonth, today);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("student-token")}`,
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/student/me", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //  console.log(result,78787877777777)
        setName(result);
        if (result.message == "invalid or expired token") {
          localStorage.removeItem("student-token");
          Navigate("/student-login");
        }
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(name?.rollNumber, 56);
  // console.log(item?.date?.split("-")[0],56);
  console.log(presentdate, 66);

  // let dates = [];
  // let date1 = [];

  useEffect(() => {
    if (!name?.Data) return;

    const dates = name?.Data?.map((item) => Number(item?.date?.split("-")[0]));

    // for (let j = 0; j < name?.Data?.length; j++) {
    //   date.push(Number(name.Data[j].date.split("-")[0]));
    // }

    // const date1 = data?.apdata?.map((item) =>
    //   Number(item?.date?.split("-")[0]),
    // );
    // console.log(date1[0], 777);

    // const date2 = data?.apdata?.map((item) =>  Number(item?.rollNumber));
    // console.log(date1, 777);

    // console.log(date1, 7);
    // console.log(date2, 7);
    setPresentdate(dates);
  }, [name]);

  for (let i = 1; i <= daysInMonth + firstDay; i++) {
    if (totaldate.length < firstDay) {
      totaldate.push(" ");
    } else {
      if (presentdate) {
        totaldate.push(i - firstDay);
      }
    }
  }
  console.log(presentdate, 88);
  function logoutfunction() {
    toast.success("Logout successful");
    Navigate("/student-login");
    localStorage.removeItem("student-token");
  }
  console.log(data, 777777);

  return (
    <>
      <div className=" pt-5 flex flex-col items-center mx-4 bg-gray-50">
        <div className=" flex justify-between  max-w-5xl w-full ">
          <div onClick={logoutfunction} className="text-2xl cursor-pointer">
            logout
          </div>
          <div className=" flex items-end flex-col">
            <div className="text-3xl">{name?.name}</div>
            <div className="text-xl">Roll Number: {name?.rollNumber}</div>
          </div>
        </div>
        <div className="shadow bg-white text-center flex justify-center w-full max-w-5xl rounded-2xl flex-col gap-4 items-center  py-10">
          <div
            className={` ${presentdate?.includes(today.getDate()) ? "text-green-600" : "text-red-600"} `}
          >
            {" "}
            {presentdate?.includes(today.getDate()) ? (
              <CircleCheckBig width={100} height={100} />
            ) : (
              <CircleX className="w-16 h-16 md:w-24 md:h-24" />
            )}
          </div>
          <h1
            className={`text-3xl ${presentdate?.includes(today.getDate()) ? "text-green-300" : "text-red-300"} font-bold`}
          >
            {presentdate?.includes(today.getDate())
              ? "You're Present!"
              : "You're absent!"}
          </h1>
          <p>{today.toDateString()}</p>
        </div>

        <div className="grid bg-white w-full max-w-5xl my-3 grid-cols-7 px-4 py-5  shadow p-2 border rounded-2xl">
          {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((index, i) => {
            return (
              <div key={i} className="text-center py-3">
                <p>{index}</p>
              </div>
            );
          })}
          {totaldate.map((index, i) => {
            return (
              <div
                key={i}
                className={`text-center  cursor-pointer ${
                  presentdate?.includes(index)
                    ? "bg-green-600"
                    : today.getDate() < index
                      ? "bg-white"
                      : index == " "
                        ? ""
                        : "bg-red-300"
                } 
            rounded-2xl  p-2 md:p-5 m-1`}
              >
                <p>{index}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Student;
