"use client";

import * as TW from "@material-tailwind/react";
import * as React from "react";
import * as Icon from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import axios from "axios";
import { toastError, toastSuccess } from "@/app/myToast";

export default function Users() {
  const [openRight, setOpenRight] = React.useState(false);
  const [openPopover, setOpenPopover] = React.useState(0);
  const [user, setUser] = React.useState<{
    fname?: string;
    lname?: string;
    username?: string;
    permission_id?: string;
    password?: string;
  }>();
  const [userId, setUserId] = React.useState<number>();
  const [data, setData] = React.useState<
    {
      id: number;
      fname: string;
      lname: string;
      username: string;
      role: string;
      created_at: string;
    }[]
  >([]);
  const pdata = [
    {
      fname: "Firstname",
      lname: "Lastname",
      username: "Username",
      role: "Admin",
    },
  ];
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const createUser = () => {
    const t = toast.loading("Createing new user");
    axios
      .post(`${process.env.NEXT_PUBLIC_PATH_API}/user/add`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success) {
          getUsers();
          toastSuccess(t, "User created successfully");
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

  const updateUser = () => {
    const t = toast.loading("Updating user");
    axios
      .post(`${process.env.NEXT_PUBLIC_PATH_API}/user/edit/${userId}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success) {
          getUsers();
          toastSuccess(t, "User updated successfully");
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

  const removeUser = (userId: number) => {
    const t = toast.loading("Deleting user");
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_PATH_API}/user/delete/${userId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data.success) {
            getUsers();
            toastSuccess(t, "User removed successfully");
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

  const getUsers = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_PATH_API}/user/all`, {
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
    getUsers();
  }, []);
  return (
    <div>
      <div className="pb-2">
        <TW.Button
          onClick={() => {
            setUser({
              fname: "",
              lname: "",
              username: "",
              permission_id: "",
              password: "",
            });
            setUserId(undefined);
            setOpenRight(true);
          }}
        >
          <div className="flex">
            <Icon.PlusIcon className="w-4 h-4 mr-2" /> Add user
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
                  {data[0] &&
                    Object.keys(data[0]).map((key) => {
                      return (
                        key !== "id" &&
                        key !== "deleted_at" && (
                          <th
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            key={key}
                          >
                            <TW.Typography>
                              {key === "permission_id" ? "role" : key}
                            </TW.Typography>
                          </th>
                        )
                      );
                    })}
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
                                {key === "permission_id"
                                  ? row[key] === 1
                                    ? "Admin"
                                    : "User"
                                  : row[key]}
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
                            setUserId(row.id);
                            setUser({
                              fname: row.fname,
                              lname: row.lname,
                              username: row.username,
                              permission_id: row.permission_id,
                              password: "",
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
                                  removeUser(row.id);
                                  setOpenPopover(0);
                                }}
                              >
                                Remove
                              </TW.Button>
                            </div>
                          </TW.PopoverContent>
                        </TW.Popover>
                      </td>
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
            Add User
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
            label="Firstname"
            value={user?.fname}
            onChange={(e) => setUser({ ...user, fname: e.target.value })}
          />
          <TW.Input
            label="Lastname"
            value={user?.lname}
            onChange={(e) => setUser({ ...user, lname: e.target.value })}
          />
          <TW.Input
            label="Username"
            value={user?.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <TW.Input
            label="Password"
            type={"password"}
            value={user?.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <TW.Select
            label="permission"
            value={`${user?.permission_id}`}
            onChange={(e) => setUser({ ...user, permission_id: e })}
          >
            <TW.Option value="2">User</TW.Option>
            <TW.Option value="1">Admin</TW.Option>
          </TW.Select>
          <TW.Button onClick={userId ? updateUser : createUser}>
            Submit
          </TW.Button>
        </form>
      </TW.Drawer>
    </div>
  );
}
