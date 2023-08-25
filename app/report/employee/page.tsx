"use client";

import * as TW from "@material-tailwind/react";
import * as React from "react";
import * as Icon from "@heroicons/react/24/solid";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "@/app/myToast";
import { popover } from "@material-tailwind/react";

export default function Employee() {
  const [openRight, setOpenRight] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openPopover, setOpenPopover] = React.useState(0);
  const [employee, setEmployee] = React.useState<{
    taxes_number?: string;
    register_number?: string;
    firstname?: string;
    lastname?: string;
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
  const token = localStorage.getItem("token");

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
        headers: { Authorization: `Bearer ${token}` },
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
        <TW.Button
          onClick={() => {
            setEmployee({
              taxes_number: "",
              register_number: "",
              firstname: "",
              lastname: "",
            });
            setEmployeeId(undefined);
            setOpenRight(true);
          }}
        >
          <div className="flex">
            <Icon.PlusIcon className="w-4 h-4 mr-2" /> Add employee
          </div>
        </TW.Button>
      </div>
      {data && data.length > 0 && (
        <TW.Card>
          <div className="p-4 overflow-auto">
            <table>
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <TW.Typography>№</TW.Typography>
                  </th>
                  {Object.keys(data[0]).map((key) => {
                    return (
                      key !== "id" &&
                      key !== "deleted_at" && (
                        <th
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          key={key}
                        >
                          <TW.Typography>{key}</TW.Typography>
                        </th>
                      )
                    );
                  })}
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <TW.Typography>.</TW.Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <TW.Typography>Action</TW.Typography>
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
                        <TW.Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </TW.Typography>
                      </td>
                      {Object.keys(row).map((key) => {
                        return (
                          key !== "id" && (
                            <td className={classes} key={`${index}${key}`}>
                              <TW.Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {row[key]}
                              </TW.Typography>
                            </td>
                          )
                        );
                      })}
                      <td
                        className={`${classes} space-x-2`}
                        key={`${index}action`}
                      >
                        <TW.Button
                          onClick={() => {
                            setEmployeeId(row.id);
                            setEmployee({
                              taxes_number: row.taxes_number,
                              register_number: row.register_number,
                              firstname: row.firstname,
                              lastname: row.lastname,
                            });
                            setOpenRight(true);
                          }}
                        >
                          <Icon.PencilIcon className="w-4 h-4" />
                        </TW.Button>
                        <TW.Popover
                          open={openPopover == row.id}
                          handler={() =>
                            setOpenPopover(openPopover === 0 ? row.id : 0)
                          }
                        >
                          <TW.PopoverHandler>
                            <TW.Button
                              variant="outlined"
                              color="red"
                              onClick={() => {}}
                            >
                              <Icon.TrashIcon className="w-4 h-4" />
                            </TW.Button>
                          </TW.PopoverHandler>
                          <TW.PopoverContent>
                            <TW.Typography>
                              Do you really want to remove this employees?
                            </TW.Typography>
                            <div className="flex justify-end pt-2 pr-2 space-x-2">
                              <TW.Button
                                size="sm"
                                variant="outlined"
                                onClick={() => setOpenPopover(0)}
                              >
                                Cancel
                              </TW.Button>
                              <TW.Button
                                color="red"
                                size="sm"
                                onClick={() => {
                                  removeEmployee(row.id);
                                  setOpenPopover(0);
                                }}
                              >
                                Remove
                              </TW.Button>
                            </div>
                          </TW.PopoverContent>
                        </TW.Popover>
                      </td>
                      {/* <td>{row}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TW.Card>
      )}
      <TW.Drawer
        placement="right"
        open={openRight}
        onClose={() => setOpenRight(false)}
        className="p-4"
        size={400}
      >
        <div className="mb-6 flex items-center justify-between">
          <TW.Typography variant="h5" color="blue-gray">
            {employeeId ? "Edit" : "Add"} Employee
          </TW.Typography>
          <TW.IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenRight(false)}
          >
            <Icon.XMarkIcon className="w-5 h-5" />
          </TW.IconButton>
        </div>
        <form className="space-y-2">
          <TW.Input
            label="Taxes number"
            value={employee?.taxes_number}
            onChange={(e) =>
              setEmployee({ ...employee, taxes_number: e.target.value })
            }
          />
          <TW.Input
            label="Register number"
            value={employee?.register_number}
            onChange={(e) =>
              setEmployee({ ...employee, register_number: e.target.value })
            }
          />
          <TW.Input
            label="Firstname"
            value={employee?.firstname}
            onChange={(e) =>
              setEmployee({ ...employee, firstname: e.target.value })
            }
          />
          <TW.Input
            label="Lastname"
            value={employee?.lastname}
            onChange={(e) =>
              setEmployee({ ...employee, lastname: e.target.value })
            }
          />
          <TW.Button onClick={employeeId ? updateEmployee : createEmployee}>
            Submit
          </TW.Button>
        </form>
      </TW.Drawer>
    </div>
  );
}
