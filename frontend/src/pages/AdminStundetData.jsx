import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Pencil,
  Search,
  TrendingUp,
  User,
  UserCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

function EditDialog({
  open,
  setOpen,
  editName,
  setEditName,
  editPassword,
  setEditPassword,
  editRollNumber,
  
}) {
  // const [close,setClose]=useState(open)

  // function closepopup () {
  //   setClose(!close)
  // }
  function saveDatafunction() {
    setEditPassword(editPassword);
    setEditName(editName);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: editName,
      password: editPassword,
      rollNumber: editRollNumber,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://localhost:8080/api/v1/user/changenamepassword",
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "name and password change successfully") {
          toast.success(result.message);
          setOpen(false);
        } else {
          toast.error(result.message);
        }
        // setAb(!ab);
      })
      .catch((error) => console.error(error));
    // console.log(editName,editemail)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                name="name"
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">password</Label>
              <Input
                id="username-1"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                name="username"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button type="button" onClick={saveDatafunction}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function AdminStundetData() {
  // const [statusStudent, setstatusStudent] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [ab, setAb] = useState(false);
  const [rollnumbers, setRollnumbers] = useState([]);
  const navigator = useNavigate();
  const [search, setSearch] = useState("");
  const [sdata, setSdata] = useState("");
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState();
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRollNumber, setEditRollNumber] = useState("");
  // console.log(search);

  const d = new Date();
  const today = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  function absentprasentfunction(rollNumber) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
     myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("admin-token")}`,
    );
    const raw = JSON.stringify({
      date: today,
      rollNumber: rollNumber,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/user/AddPresent", requestOptions)
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

  useEffect(() => {
    const myHeaderss = new Headers();
    myHeaderss.append("Content-Type", "application/json");
    myHeaderss.append(
      "Authorization",
      `Bearer ${localStorage.getItem("admin-token")}`,
    );

    const requestOptionss = {
      method: "GET",
      headers: myHeaderss,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/user/me", requestOptionss)
      .then((response) => response.json())
      .then((result) => setName(result))
      .catch((error) => console.error(error));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8080/api/v1/user/allstudent?page=${page}&limit=10${search ? "&q=" + search : ""}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setTotalpage(result?.totalPages);
      })
      .catch((error) => console.error(error));
  }, [ sdata,search, page, open]);

  // console.log(data?.  ,77866)
  useEffect(() => {
    if (data?.apdata) {
      // data?.apdata?.forEach((item) =>{
      const d = new Date();
      const d1 = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      // console.log(item.date)
      // if(item.date == d1  ) {
      //    rollnumbers.push(item.rollNumber)
      // }

      // rollnumbers.push(todayRollNumbers);
      
      // });
      const todayRollNumbers = data?.apdata
        .filter((item) => item.date === d1)
        .map((item) => item.rollNumber.toString());
    
      setRollnumbers(todayRollNumbers || []);
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
    navigator("/Register", {
      state: {
        lastRollnumber: data?.lastRollNumber,
      },
    });
  }

  function searchfunction(e) {
    setSearch(e.target.value);
    setTimeout(() => {
      setSdata(e.target.value);
    }, 2000);
  }

  // console.log(editemail, editName);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={name} />
        <SidebarInset>
          <div className="bg-gray-100 min-h-screen flex justify-center px-3 py-5">
            <div></div>
            <div className="w-full max-w-5xl">
              <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
                <nav>
                  <button
                    onClick={() => Registerfunction()}
                    className="border bg-blue-600 text-white rounded-xl py-2 px-4"
                  >
                    Register
                  </button>
                </nav>
              </div>

              <div className="bg-white border shadow rounded-2xl mt-5 overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 py-4 px-4">
                  <div className="text-xl md:text-2xl font-semibold">
                    Student Attendance
                  </div>

                  <div className="flex border items-center bg-white pl-2 rounded-xl w-full md:w-70">
                    <Search width={16} />

                    <input
                      type="text"
                      placeholder="Search Students"
                      className="outline-none pl-3 py-2 w-full rounded-xl"
                      value={search}
                      onChange={(e) => searchfunction(e)}
                    />
                  </div>
                </div>

                <hr />

                <div className="">
                  <table className="w-full  ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 w-[60%] text-start">
                          Student Info
                        </th>

                        <th className="py-3 text-start">Status</th>

                        <th className="py-3 text-start">Action</th>
                        <th className="py-3 text-start">Edit</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.students?.map((item, i) => {
                        return (
                          <tr key={i} className="border-y">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-5 ">
                                <div className="bg-amber-300 flex items-center justify-center rounded-xl mr-3 w-10 h-10 text-sm">
                                  {item?.name?.slice(0, 1)}
                                </div>

                                <div>
                                  <div className="font-medium text-sm md:text-base">
                                    {item?.name}
                                  </div>

                                  <div className="text-xs md:text-sm text-gray-500">
                                    {item?.rollNumber}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3">
                              <span
                                className={`${
                                  rollnumbers?.includes(
                                    item?.rollNumber.toString(),
                                  )
                                    ? "bg-green-200 text-green-800"
                                    : "bg-red-200 text-red-800"
                                } rounded-2xl px-2 py-1 text-xs md:text-sm`}
                              >
                                {rollnumbers?.includes(
                                  item?.rollNumber.toString(),
                                )
                                  ? "Present"
                                  : "Absent"}
                              </span>
                            </td>

                            <td className="py-3">
                              <CircleCheckBig
                                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                                onClick={() =>
                                  absentprasentfunction(item?.rollNumber)
                                }
                              />
                            </td>
                            <td className="py-3">
                              <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => {
                                  setOpen(true);
                                  setEditName(item.name);
                                  setEditRollNumber(item.rollNumber);
                                }}
                              >
                                <Pencil />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex py-5 bg-gray-50 justify-center">
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
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <EditDialog
        open={open}
        setOpen={setOpen}
        editName={editName}
        setEditName={setEditName}
        editPassword={editPassword}
        setEditPassword={setEditPassword}
        editRollNumber={editRollNumber}
        
      />
    </div>
  );
}

export default AdminStundetData;
