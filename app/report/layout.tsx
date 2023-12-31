"use client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import * as Icon from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import jwt from "jsonwebtoken";
import { Children, useEffect, useState } from "react";

const path = "/manage";

export default function MonitorLayout({ children }: any) {
  const pathname = usePathname();
  const [dialogContent, setDialogContent] = useState<any>(null);
  const [open, setOpen] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<any>({
    fname: "Ner",
    lname: "Ovog",
    username: "user1",
    password: "123",
  });
  const listItems = [
    {
      icon: <Icon.DocumentIcon className="h-5 w-5" />,
      label: "Татварын тайлан",
      pathname: `${process.env.NEXT_PUBLIC_PATH_MANAGE}`,
    },
    {
      icon: <Icon.ClipboardDocumentIcon className="h-5 w-5" />,
      label: "Нийгмийн даатгал",
      pathname: `${process.env.NEXT_PUBLIC_PATH_MANAGE}/nd`,
    },
    {
      icon: <Icon.UserGroupIcon className="h-5 w-5" />,
      label: "Ажилчидын бүртгэл",
      pathname: `${process.env.NEXT_PUBLIC_PATH_MANAGE}/employee`,
    },
    {
      icon: <Icon.UserIcon className="h-5 w-5" />,
      label: "Хэрэглэгчид",
      pathname: `${process.env.NEXT_PUBLIC_PATH_MANAGE}/users`,
      admin: true,
    },
    {
      icon: <Icon.ArrowLeftOnRectangleIcon className="h-5 w-5" />,
      label: "Гарах",
      pathname: "/login",
      onClick: () => {
        // console.log("aaaaaa");
        localStorage.clear();
      },
    },
  ];
  useEffect(() => {
    const decoded = jwt.decode(localStorage.getItem("token") || "");
    if (typeof decoded !== "string") {
      // console.log(decoded);
      if (decoded?.permission_id == 1) setIsAdmin(true);
    }
  }, []);
  return (
    <div className="w-screen h-screen flex bg-blue-gray-50">
      <div className="p-4">
        <Card className="p-4 h-full">
          <Typography variant="h5" className="p-4" color="blue-gray">
            Татварын тайлан
          </Typography>
          <hr className="my-2 border-blue-gray-50" />
          <List className="overflow-y-auto">
            {listItems.map((item: any, i: any) => (
              <>
                {item.admin ? (
                  isAdmin && (
                    <Menu
                      item={item}
                      i={i}
                      open={open}
                      setOpen={setOpen}
                      pathname={pathname}
                    />
                  )
                ) : (
                  <Menu
                    item={item}
                    i={i}
                    open={open}
                    setOpen={setOpen}
                    pathname={pathname}
                  />
                )}
              </>
            ))}
          </List>
        </Card>
      </div>
      <div className="pr-4 pt-4 overflow-y-auto w-full">{children}</div>
      {/* <Dialog
        open={dialogContent}
        handler={() => setDialogContent(null)}
        size="xs"
      >
        <CardHeader
          variant="gradient"
          color="teal"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Edit Profile
          </Typography>
        </CardHeader>
        <DialogBody>{dialogContent || ""}</DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="red"
            onClick={() => setDialogContent(null)}
          >
            Cancel
          </Button>
          <Button onClick={() => console.log(userData)}>Save</Button>
        </DialogFooter>
      </Dialog> */}
    </div>
  );
}

const Menu = ({
  item,
  i,
  open,
  setOpen,
  pathname,
}: {
  item: any;
  i: number;
  open: number;
  setOpen: any;
  pathname: string;
}) => {
  return (
    <div key={i}>
      {item.children ? (
        <Accordion
          open={
            open === i ||
            item.children.filter((child: any) => child.pathname === pathname)
              .length > 0
          }
          icon={
            <Icon.ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === i ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={pathname === item.pathname}>
            <AccordionHeader
              onClick={() => {
                setOpen(open === i ? 0 : i);
              }}
              className="border-b-0 px-3 group"
            >
              <ListItemPrefix
                className={`group-hover:text-blue-500 ${
                  pathname === item.pathname && "text-blue-500"
                }`}
              >
                {item.icon}
              </ListItemPrefix>
              <Typography className={"mr-auto"}>{item.label}</Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody>
            <List className="p-0">
              {item.children.map((child: any) => (
                <Link
                  href={child.pathname}
                  key={child.pathname}
                  className="group"
                >
                  <ListItem selected={pathname === child.pathname}>
                    <ListItemPrefix
                      className={`group-hover:text-blue-500 ${
                        pathname === child.pathname && "text-blue-500"
                      }`}
                    >
                      <Icon.ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5"
                      />
                    </ListItemPrefix>
                    <Typography>{child.label}</Typography>
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      ) : (
        <Link
          href={item.pathname}
          key={item.pathname}
          className="group"
          onClick={item.onClick}
        >
          <ListItem selected={pathname === item.pathname}>
            <ListItemPrefix
              className={`group-hover:text-blue-500 ${
                pathname === item.pathname && "text-blue-500"
              }`}
            >
              {item.icon}
            </ListItemPrefix>
            <Typography>{item.label}</Typography>
          </ListItem>
        </Link>
      )}
    </div>
  );
};
