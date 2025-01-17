import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

 

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "/profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
export function AvatarWithUserDropdown() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
        {profileMenuItems.map(({ label, icon,path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link to={path ? path: "" } className="w-full h-full" >
            <MenuItem
              key={label}
              onClick={()=>{
                if(label === "Sign Out"){
                  localStorage.removeItem("user")
                  sessionStorage.removeItem("user")
                  window.location.reload()
                  closeMenu()
                }
                else{
                  closeMenu()
                }
              }}
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                >
                {label}
              </Typography>
            </MenuItem>
                </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}