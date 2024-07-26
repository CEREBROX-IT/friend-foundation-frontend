import { useState } from "react";
import SampleLogo from "../assets/ff_sample_logo.webp";
import BellIcon from "../assets/notification_bell_icon.webp";
import { IoMdMenu } from "react-icons/io";
import MobileAdminSideBar from "./admin-components/mobile-admin-sidebar";
import MobileHeadSidebar from "./head-district-components/mobile-sidebar-head";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Cookies } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
import JwtDecoder from "../utils/jwt-decoder";
import { useFetchUserProfileQuery } from "../redux/services/UserApi";
import { FaRegUser } from "react-icons/fa";
import {useReadNotificationMutation ,useFetchNotificationUserLoginQuery } from "../redux/services/NotificationApi";
 

  
const Header = () => {
  const navigate = useNavigate();
  const userData = JwtDecoder().decodedToken;
  const role = userData?.role;
  const [OpenMenu, setOpenMenu] = useState(false);
  const [OpenNotification, setOpenNotification] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: GetUserData } = useFetchUserProfileQuery();
  const {data: NotificationMessage} = useFetchNotificationUserLoginQuery()
  const [ReadNotification] = useReadNotificationMutation()


  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserProfile = () => {
    navigate("/user-profile");
  };

  const MenuHandler = () => {
    setOpenMenu(true);
  };

  function NotificationHandler(){
    setOpenNotification(!OpenNotification)
  }

  const handleReadNotification = async () => {
    await ReadNotification().unwrap().then(() => console.log("success"))
  }

  const CloseMenuHandler = () => {
    setOpenMenu(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <>
      {role === "Admin" ? <>
      {OpenMenu && (
        <MobileAdminSideBar
          openSidebar={OpenMenu}
          closeSideBar={CloseMenuHandler}
        />
      )}
      </> : <>
      {OpenMenu && (
        <MobileHeadSidebar
          openSidebar={OpenMenu}
          closeSideBar={CloseMenuHandler}
        />
      )}
      </>}

      <div className="bg-sixth-light dark:bg-sixth-dark px-4 p-[4px] flex justify-between ">
        <div className="flex flex-row items-center gap-2 text-primary-light dark:text-white text-[20px] font-bold">
          <IoMdMenu
            className="md:hidden text-primary-light text-[30px] cursor-pointer"
            onClick={MenuHandler}
          />
          <img src={SampleLogo} className="h-[50px] min-w-[50px]" />
          <p className="hidden md:flex">Friend Foundation Management System</p>
        </div>
        <div className="flex flex-row gap-2 items-center relative">
          <p className="hidden lg:block dark:text-white">
            {GetUserData?.data.first_name} {GetUserData?.data.last_name}
          </p>
          <div
            className="rounded-[50%] bg-fifth-dark h-[40px] min-w-[40px] flex items-center cursor-pointer"
            onClick={handleClick}
          >
            <div className="text-white my-auto mx-auto h-10 w-10 aspect-square">
              {GetUserData?.data.profile_display === null ? (
                <>
                  <FaRegUser className="text-2xl w-full mx-auto my-auto h-full p-2" />
                </>
              ) : (
                <img
                  src={
                    import.meta.env.VITE_IMAGE +
                    GetUserData?.data?.profile_display
                  }
                  className="object-contain h-full w-full rounded-full"
                />
              )}
            </div>
          </div>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              marginTop: "40px",
              // "& .MuiPaper-root": {
              //   backgroundColor: "#f0f0f0",
              // },
            }}
          >
            {(role === "Unassign"  || role === "Pending") ? (
              <>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleUserProfile}>
                  User Profile
                </MenuItem>
                <MenuItem onClick={handleClose} disabled>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            )}
          </Menu>
            <div className={`${(role === "Unassign" || role === "Pending") && "hidden" }  rounded-[50%] bg-fourth-light dark:bg-fourth-dark h-[40px] min-w-[40px] flex items-center cursor-pointer`} onClick={NotificationHandler}>
            <img src={BellIcon} className='h-[35px] mx-auto' onClick={handleReadNotification}/>
            <h1 className="absolute -translate-y-3 -translate-x-1 text-red-700 font-bold">{NotificationMessage?.unseenCount}</h1>
            {OpenNotification && 
            <div className="w-60 min-h-[50px] max-h-[400px] overflow-auto custom-scrollbar p-1 text-gray-800 shadow-black shadow-lg bg-white absolute right-0 top-0 translate-y-14 z-20 ">
              {NotificationMessage?.data?.length === undefined || NotificationMessage?.data?.length > 0 ? <>
              {NotificationMessage?.data?.map((item: any) => (
                <>
                <h1 className="py-2 ">{item.message}</h1>
                <hr className="border-black"/>
                </>
                
              ))}</> : 
              <div className="w-full flex-1 flex justify-center items-center">
                <h1 className="font-bold">No Notification Available</h1>
                </div>}
              </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
