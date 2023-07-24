"use client";

import * as TW from "@material-tailwind/react";
import * as React from "react";
import * as Icon from "@heroicons/react/24/solid";

export default function Users() {
  const [openRight, setOpenRight] = React.useState(false);
  const pdata = [
    {
      firstname: "Firstname",
      lastname: "Lastname",
      username: "Username",
      role: "Admin",
    },
  ];
  return (
    <div>
      <div className="pb-2">
        <TW.Button onClick={() => setOpenRight(true)}>
          <div className="flex">
            <Icon.PlusIcon className="w-4 h-4 mr-2" /> Add user
          </div>
        </TW.Button>
      </div>
      {pdata && pdata.length > 0 && (
        <TW.Card>
          <div className="p-4 overflow-auto">
            <table>
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <TW.Typography>№</TW.Typography>
                  </th>
                  {Object.keys(pdata[0]).map((key) => (
                    <th
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      key={key}
                    >
                      <TW.Typography>{key}</TW.Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pdata.map((row: any, index: any) => {
                  const isLast = index === pdata.length - 1;
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
                      {Object.keys(row).map((key) => (
                        <td className={classes} key={`${index}${key}`}>
                          <TW.Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {row[key]}
                          </TW.Typography>
                        </td>
                      ))}
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
          <TW.Input label="Username" />
          <TW.Input label="Username" />
          <TW.Input label="Username" />
          <TW.Input label="Username" />
          <TW.Button>Create User</TW.Button>
        </form>
      </TW.Drawer>
    </div>
  );
}
