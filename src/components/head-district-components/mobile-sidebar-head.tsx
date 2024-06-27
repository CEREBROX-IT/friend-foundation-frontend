import { FC, useEffect, useState } from "react";
import SDA_Logo from "../../assets/sda_logo_only.webp";
import { HiMiniUsers } from "react-icons/hi2";
import {  FaFile } from "react-icons/fa6";
import {
  MdDashboardCustomize,
  MdDarkMode,
  MdOutlineDarkMode,
} from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  openSidebar: boolean;
  closeSideBar: () => void;
}

const MobileHeadSidebar: FC<Props> = ({ openSidebar, closeSideBar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
 


  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`w-[250px] h-full text-white flex-col absolute md:flex z-10 bg-fifth-dark shadow-black shadow-md ${
        openSidebar && "w-[250px] ease-out-in duration-500"
      }`}
    >
      {/* ----Menu icon---- */}
      <div className={`flex justify-end pt-4 w-[250px] cursor-pointer`}>
        <IoMdClose
          className=" fixed z-10 text-[45px] mr-2"
          onClick={closeSideBar}
        />
      </div>

      {/* ----Menu item---- */}
      <div
        className={`bg-primary pt-[62px] ease-out-in duration-500 fixed flex-wrap h-[100vh] w-[250px]`}
      >
        <img src={SDA_Logo} className="h-[190px] mx-auto mb-5" />
        <div
          className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
            location.pathname === "/dashboard" ? "border-secondary-dark" : ""
          }`}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <div className="h-[42px] min-w-[42px] flex items-center justify-center">
            <MdDashboardCustomize className="text-[25px] ease-in-out duration-500" />
          </div>
          <p className={`text-bold text-[15px]`}>Dashboard</p>
        </div>
        <div
          className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
            location.pathname === "/dashboard/church-list" ? "border-secondary-dark" : ""
          }`}
          onClick={() => {
            navigate("/dashboard/church-list");
          }}
        >
          <div className="h-[42px] min-w-[42px] flex items-center justify-center">
            <HiMiniUsers className="text-[25px] ease-in-out duration-500" />
          </div>
          <p className={`text-bold text-[15px]`}>List of Church</p>
        </div>
        
        <div
          className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
            location.pathname === "/dashboard/form-submission" ? "border-secondary-dark" : ""
          }`}
          onClick={() => {
            // Change it to the actual path
            navigate("/dashboard/form-submission");
          }}
        >
          <div className="h-[42px] min-w-[42px] flex items-center justify-center">
            <FaFile className="text-[22px]" />
          </div>
          <p className={`text-bold text-[15px]`}>Form Submission</p>
        </div>

        <div
          className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
            location.pathname === "/dashboard" ? "border-secondary-dark" : ""
          }`}
          onClick={handleThemeSwitch}
        >
          <div className="h-[42px] min-w-[42px] flex items-center justify-center">
            {theme === "dark" ? (
              <MdDarkMode className="text-[25px] ease-in-out duration-500" />
            ) : (
              <MdOutlineDarkMode className="text-[25px] ease-in-out duration-500" />
            )}
          </div>
          <p className={`text-bold text-[15px]`}>
            {theme === "dark" ? "Off Dark Mode" : "On Dark Mode"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileHeadSidebar;
