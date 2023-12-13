"use client";

import * as TW from "@material-tailwind/react";
import * as React from "react";
import * as Icon from "@heroicons/react/24/solid";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "@/app/myToast";
import { Button, Card, Checkbox, Drawer, IconButton, Input, Popover, PopoverContent, PopoverHandler, Typography, popover } from "@material-tailwind/react";
import { useState } from "react";

export default function Employee() {
  const [openRight, setOpenRight] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openPopover, setOpenPopover] = React.useState(0);
  const [employee, setEmployee] = React.useState<{
    taxes_number?: string;
    register_number?: string;
    firstname?: string;
    lastname?: string;
    is_temp?: boolean;
  }>();
  const [employeeId, setEmployeeId] = React.useState<number>();
  const [data, setData] = React.useState<
    {
      id: number;
      taxes_number: string;
      register_number: string;
      firstname: string;
      lastname: string;
      created_at: string;
    }[]
  >([]);
  const pdata = [
    {
      firstname: "Firstname",
      lastname: "Lastname",
      registerNumber: "Register number",
      taxesNumber: "Taxes number",
    },
  ];
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const createEmployee = () => {
    const t = toast.loading("Createing new employee");
    axios
      .post(`${process.env.NEXT_PUBLIC_PATH_API}/employees/add`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success) {
          getEmployees();
          toastSuccess(t, "Employee created successfully");
          setOpenRight(false);
        } else {
          toastError(t, response.data.msg || "Parameter invalid");
        }
      })
      .catch((error) => {
        toastError(t, error.message);
        setOpenRight(false);
      });
  };

  const updateEmployee = () => {
    const t = toast.loading("Updating employee");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_PATH_API}/employees/edit/${employeeId}`,
        employee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          getEmployees();
          toastSuccess(t, "Employee updated successfully");
          setOpenRight(false);
        } else {
          toastError(t, response.data.msg || "Parameter invalid");
        }
      })
      .catch((error) => {
        toastError(t, error.message);
        setOpenRight(false);
      });
  };

  const removeEmployee = (employeeId: number) => {
    const t = toast.loading("Deleting employee");
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_PATH_API}/employees/delete/${employeeId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data.success) {
            getEmployees();
            toastSuccess(t, "Employee removed successfully");
          } else {
            toastError(t, response.data.msg || "Parameter invalid");
          }
        })
        .catch((error) => {
          toastError(t, error.message);
        });
    } catch (error) {
      toastError(t, "Connection failed");
    }
  };

  const getEmployees = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_PATH_API}/employees/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setData(response.data.result);
        } else {
          toast.error(response.data.msg || "Connection failed");
        }
      })
      .catch((error) => {
        toast.error(error.message || "Connection failed");
      });
  };

  React.useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <div className="pb-2">
        <Button
          onClick={() => {
            setEmployee({
              taxes_number: "",
              register_number: "",
              firstname: "",
              lastname: "",
              is_temp: false,
            });
            setEmployeeId(undefined);
            setOpenRight(true);
          }}
        >
          <div className="flex">
            <Icon.PlusIcon className="w-4 h-4 mr-2" /> Add employee
          </div>
        </Button>
      </div>
      {data && data.length > 0 && (
        <Card>
          <div className="p-4 overflow-auto">
            <table>
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography>№</Typography>
                  </th>
                  {Object.keys(data[0]).map((key) => {
                    return (
                      key !== "id" &&
                      key !== "deleted_at" && (
                        <th
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          key={key}
                        >
                          <Typography>{key}</Typography>
                        </th>
                      )
                    );
                  })}
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography>.</Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography>Action</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row: any, index: any) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={index}>
                      <td className={classes} key={`${index}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      {Object.keys(row).map((key) => {
                        return (
                          key !== "id" && (
                            <td className={classes} key={`${index}${key}`}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {row[key]}
                              </Typography>
                            </td>
                          )
                        );
                      })}
                      <td
                        className={`${classes} space-x-2`}
                        key={`${index}action`}
                      >
                        <Button
                          onClick={() => {
                            setEmployeeId(row.id);
                            setEmployee({
                              taxes_number: row.taxes_number,
                              register_number: row.register_number,
                              firstname: row.firstname,
                              lastname: row.lastname,
                              is_temp: row.is_temp || false
                            });
                            setOpenRight(true);
                          }}
                        >
                          <Icon.PencilIcon className="w-4 h-4" />
                        </Button>
                        <Popover
                          open={openPopover == row.id}
                          handler={() =>
                            setOpenPopover(openPopover === 0 ? row.id : 0)
                          }
                        >
                          <PopoverHandler>
                            <Button
                              variant="outlined"
                              color="red"
                              onClick={() => {}}
                            >
                              <Icon.TrashIcon className="w-4 h-4" />
                            </Button>
                          </PopoverHandler>
                          <PopoverContent>
                            <Typography>
                              Do you really want to remove this employees?
                            </Typography>
                            <div className="flex justify-end pt-2 pr-2 space-x-2">
                              <Button
                                size="sm"
                                variant="outlined"
                                onClick={() => setOpenPopover(0)}
                              >
                                Cancel
                              </Button>
                              <Button
                                color="red"
                                size="sm"
                                onClick={() => {
                                  removeEmployee(row.id);
                                  setOpenPopover(0);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                      {/* <td>{row}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      <Drawer
        placement="right"
        open={openRight}
        onClose={() => setOpenRight(false)}
        className="p-4"
        size={400}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {employeeId ? "Edit" : "Add"} Employee
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenRight(false)}
          >
            <Icon.XMarkIcon className="w-5 h-5" />
          </IconButton>
        </div>
        <form className="space-y-2">
          <div>Taxes number:</div>
          <Input
            label="Taxes number"
            value={employee?.taxes_number}
            onChange={(e) =>
              setEmployee({ ...employee, taxes_number: e.target.value })
            }
          />
          <Typography className="pt-2">Register number:</Typography>
          <Input
            label="Register number"
            value={employee?.register_number}
            onChange={(e) =>
              setEmployee({ ...employee, register_number: e.target.value })
            }
          />
          <Typography className="pt-2">Firstname:</Typography>
          <Input
            label="Firstname"
            value={employee?.firstname}
            onChange={(e) =>
              setEmployee({ ...employee, firstname: e.target.value })
            }
          />
          <Typography className="pt-2">Lastname:</Typography>
          <Input
            label="Lastname"
            value={employee?.lastname}
            onChange={(e) =>
              setEmployee({ ...employee, lastname: e.target.value })
            }
          />
          <div className="flex items-center px-4">
            <Checkbox label="Түр ажилтан" checked={employee?.is_temp || false} onChange={(e)=>setEmployee({ ...employee, is_temp: e.target.checked })}/>
          </div>
          <Button onClick={employeeId ? updateEmployee : createEmployee}>
            Submit
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
