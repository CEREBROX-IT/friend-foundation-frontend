import { useState, useEffect, useContext } from "react";
import SDA_Logo from "../../assets/sda_logo_only.webp";
import { FaUserTie, FaChurch } from "react-icons/fa6";
import {
  MdDashboardCustomize,
  MdDarkMode,
  MdOutlineDarkMode,
} from "react-icons/md";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeContext from "../ThemeContext";

const PastorSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(true);
  const [showName, setShowName] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

    if (openSidebar) {
      const timeoutId = setTimeout(() => {
        setShowName(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setShowName(false);
    }
  }, [openSidebar, theme]);

  return (
    <>
      <div
        className={`${
          openSidebar
            ? "w-[220px] ease-out-in duration-500"
            : "w-[60px] ease-in-out duration-500"
        } h-full text-white relative flex-col hidden md:flex z-10 bg-fifth-dark shadow-black shadow-md`}
      >
        {/* ----Menu icon---- */}
        <div
          className={`flex justify-end pt-4 ${
            openSidebar
              ? "w-[220px] ease-out-in duration-500"
              : "w-[60px] ease-in-out duration-500 justify-center"
          } cursor-pointer`}
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
        >
          {openSidebar ? (
            <AiOutlineMenuFold className="mr-2 fixed z-10 text-[35px]" />
          ) : (
            <AiOutlineMenuUnfold className=" fixed z-10 text-[35px]" />
          )}
        </div>

        {/* ----Menu item---- */}
        <div
          className={`bg-primary pt-[62px] ease-out-in duration-500 fixed
            flex-wrap h-[100vh]
            ${openSidebar ? "w-[220px]" : "w-[60px]"} mb-50`}
        >
          {showName && (
            <img src={SDA_Logo} className="h-[190px] mx-auto mb-5" />
          )}

          <div
            className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
              location.pathname === "/dashboard" ? "border-secondary-dark" : ""
            }`}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <MdDashboardCustomize className="text-[25px] ease-in-out duration-500" />
            </div>
            {showName && <p className={`text-bold text-[15px]`}>Dashboard</p>}
          </div>
          <div
            className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
              location.pathname === "/form-submission" ? "border-secondary-dark" : ""
            }`}
            onClick={() => {
              navigate("/form-submission");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <MdDashboardCustomize className="text-[25px] ease-in-out duration-500" />
            </div>
            {showName && <p className={`text-bold text-[15px]`}>Form Submission Logs</p>}
          </div>
          <div
            className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
              location.pathname === "/" ? "border-secondary-dark" : ""
            }`}
            onClick={toggleTheme}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              {theme === "dark" ? (
                <MdDarkMode className="text-[25px] ease-in-out duration-500" />
              ) : (
                <MdOutlineDarkMode className="text-[25px] ease-in-out duration-500" />
              )}
            </div>
            {showName && (
              <p className={`text-bold text-[15px]`}>
                {theme === "dark" ? "Off Dark Mode" : "On Dark Mode"}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PastorSideBar;
