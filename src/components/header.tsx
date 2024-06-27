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


const Header = () => {
  const navigate = useNavigate();
  const userData = JwtDecoder().decodedToken;
  const role = userData?.role;
  const [OpenMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: GetUserData } = useFetchUserProfileQuery();

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

      <div className="bg-sixth-light dark:bg-sixth-dark px-4 p-[4px] flex justify-between">
        <div className="flex flex-row items-center gap-2 text-primary-light dark:text-white text-[20px] font-bold">
          <IoMdMenu
            className="md:hidden text-primary-light text-[30px] cursor-pointer"
            onClick={MenuHandler}
          />
          <img src={SampleLogo} className="h-[50px] min-w-[50px]" />
          <p className="hidden md:flex">Friend Foundation Management System</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
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
            {role === "Unassign" ? (
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
          <div className="rounded-[50%] bg-fourth-light dark:bg-fourth-dark h-[40px] min-w-[40px] flex items-center cursor-pointer">
            <img src={BellIcon} className="h-[35px] mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
