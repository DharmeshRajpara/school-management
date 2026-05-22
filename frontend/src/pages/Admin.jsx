import { SquareMenu } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  ArrowLeft,
  CircleCheckBig,
  Info,
  Search,
  TrendingUp,
  User,
  UserCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

function Admin() {
  // const [statusStudent, setstatusStudent] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [chartData, setChartData] = useState();
  // const [ab, setAb] = useState(false);
  const [rollnumbers, setRollnumbers] = useState([]);
  // const navigator = useNavigate();
  // const [totalpage, setTotalpage] = useState();

  const navigate = useNavigate();
  // console.log(chartData, 877);

  useEffect(() => {
    const myHeaders1 = new Headers();
    myHeaders1.append("Content-Type", "application/json");
    myHeaders1.append(
      "Authorization",
      `Bearer ${localStorage.getItem("admin-token")}`,
    );

    const requestOptions1 = {
      method: "GET",
      headers: myHeaders1,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/user/chartData", requestOptions1)
      .then((response) => response.json())
      .then((result) => setChartData(result))
      .catch((error) => console.error(error));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8080/api/v1/user/allstudent`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        // setTotalpage(result?.totalPages);
      })
      .catch((error) => console.error(error));
  }, []);
  // console.log(chartData?.data, 8873);

  // console.log(data?.  ,77866)
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("admin-token")}`,
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/user/me", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "invalid or expired token") {
          localStorage.removeItem("admin-token");
          navigate("/admin-login");
        }
        setName(result);
      })
      .catch((error) => console.error(error));
    // console.log(name, 89);
    if (data?.apdata) {
      // data?.apdata?.forEach((item) =>{
      const d = new Date();
      const d1 = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      // console.log(item.date)
      // if(item.date == d1  ) {
      //    rollnumbers.push(item.rollNumber)
      // }

      const todayRollNumbers = data?.apdata
        ?.filter((item) => item.date === d1)
        ?.map((item) => item.rollNumber.toString());

      setRollnumbers(todayRollNumbers); 
      // rollnumbers.push(todayRollNumbers);

      // });
    }
  }, [data]);

  // const filteredStudents = data?.students?.filter(
  //   (item) =>
  //     item?.name?.toLowerCase().includes(search.toLowerCase()) ||
  //     item?.rollNumber?.toString().includes(search),
  // );

  // console.log(filteredStudents, 7777777);

  // console.log(data?.students);

  function Registerfunction() {
    navigate("/Register", {
      state: {
        lastRollnumber: data?.lastRollNumber,
      },
    });
  }



  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  };

  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={name} />
        <SidebarInset>
          <div className="bg-gray-100 min-h-screen flex justify-center px-3 py-5">
            <div className="w-full max-w-5xl">
              <div>
                <div className="block   md:hidden">
                  <SidebarTrigger />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-2xl md:text-4xl flex justify-start items-start  gap-20  md:justify-center md:items-center  md:gap-3 font-bold text-center sm:text-left">
                    Admin Dashboard
                  </div>
                  <nav>
                    <button
                      onClick={() => Registerfunction()}
                      className="border bg-blue-600 text-white rounded-xl py-2 px-4"
                    >
                      Register
                    </button>
                  </nav>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="shadow bg-white p-5 rounded-2xl">
                  <User className="w-6 h-6" />

                  <h5 className="text-sm my-3">TOTAL STUDENTS</h5>

                  <h1 className="text-3xl md:text-4xl">
                    {data?.totalStudents}
                  </h1>
                </div>

                <div className="shadow bg-white p-5 rounded-2xl">
                  <UserCheck className="w-6 h-6" />

                  <h1 className="text-sm my-3">PRESENT STUDENTS</h1>

                  <h1 className="text-3xl md:text-4xl">{rollnumbers.length}</h1>
                </div>

                <div className="shadow bg-white p-5 rounded-2xl">
                  <TrendingUp className="w-6 h-6" />

                  <h1 className="text-sm my-3">ATTENDANCE RATE</h1>

                  <h1 className="text-3xl md:text-4xl">
                    {data?.totalStudents
                      ? (
                          (rollnumbers.length / data?.totalStudents) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </h1>
                </div>

                <div className="shadow bg-white p-5 rounded-2xl">
                  <Info className="w-6 h-6" />

                  <h1 className="text-sm my-3">ABSENTEES</h1>

                  <h1 className="text-3xl md:text-4xl">
                    {data?.totalStudents - rollnumbers.length}
                  </h1>
                </div>
              </div>

              <div className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>present Chart</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <BarChart
                        data={chartData?.data}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <Bar
                          dataKey="totalpresent"
                          fill="var(--color-desktop)"
                          radius={4}
                        />

                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value}
                        />

                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="line" />}
                        />

                        <Area
                          dataKey="date"
                          type="natural"
                          fill="var(--color-desktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Admin;
