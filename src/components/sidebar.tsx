import { useState, useEffect } from "react";
import SDA_Logo from "../assets/sda_logo_only.webp";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowDown, IoIosFolder } from "react-icons/io";
import { FaUserTie, FaFile, FaChurch } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

type Dropdowns = "dropdown1" | "dropdown2";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(true);
  const [showName, setShowName] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    dropdown1: true,
    dropdown2: true,
  });

  const toggleDropdown = (dropdown: Dropdowns) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  useEffect(() => {
    if (openSidebar) {
      const timeoutId = setTimeout(() => {
        setShowName(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setShowName(false);
    }
  }, [openSidebar]);

  return (
    <>
      <div
        className={`${
          openSidebar
            ? "w-[220px] ease-out-in duration-500"
            : "w-[60px] ease-in-out duration-500"
        } h-full text-white flex flex-col tablet:relative absolute z-10 bg-fifth-dark shadow-black shadow-md`}
      >
        {/* ----Menu icon---- */}
        <div
          className={`flex justify-end pt-4 ${
            openSidebar
              ? "w-[220px] ease-out-in duration-500 "
              : "w-[60px] ease-in-out duration-500 justify-center"
          } cursor-pointer`}
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
        >
          {openSidebar ? (
            <AiOutlineMenuFold size={35} className="mr-2 fixed z-10" />
          ) : (
            <AiOutlineMenuUnfold size={35} className=" fixed z-10" />
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
              //change it to the actual path
              navigate("/");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <MdDashboardCustomize className="text-[25px] ease-in-out duration-500" />
            </div>
            {showName && <p className={`text-bold text-[15px]`}>Dashboard</p>}
          </div>
          <div
            className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
              location.pathname === "/" ? "border-secondary-dark" : ""
            }`}
            onClick={() => {
              //change it to the actual path
              navigate("/dashboard/users");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <HiMiniUsers className="text-[25px] ease-in-out duration-500" />
            </div>
            {showName && (
              <p className={`text-bold text-[15px]`}>List of Users</p>
            )}
          </div>
          <div
            className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
              location.pathname === "/" ? "border-secondary-dark" : ""
            }`}
            onClick={() => {
              //change it to the actual path
              navigate("/dashboard/pastors-management");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <FaUserTie className="text-[25px]" />
            </div>
            {showName && (
              <p className={`text-bold text-[15px] ease-in-out duration-500`}>
                List of Pastors
              </p>
            )}
          </div>
          <div
            className={`flex flex-row max-auto px-2 items-center hover:bg-secondary-light cursor-pointer border-b-[2px] border-fifth-dark ${
              location.pathname === "/" ? "border-secondary-dark" : ""
            }`}
            onClick={() => {
              //change it to the actual path
              navigate("/dashboard/forms-management");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <FaFile className="text-[22px]" />
            </div>
            {showName && (
              <p
                className={`${
                  openSidebar ? "flex" : "hidden"
                } text-bold text-[15px]`}
              >
                Forms Management
              </p>
            )}
          </div>
          <div
            className={`flex flex-row max-auto px-2 items-center justify-between hover:bg-secondary-light cursor-pointer`}
            onClick={() => {
              toggleDropdown("dropdown1");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <FaChurch className="text-[25px] ease-in-out duration-500 mx-2" />
              {showName && (
                <p
                  className={`${
                    openSidebar ? "flex" : "hidden"
                  } text-bold text-[15px] `}
                >
                  Church/District
                </p>
              )}
            </div>
            {dropdowns.dropdown1 ? (
              <>
                {showName && (
                  <p
                    className={`${
                      openSidebar ? "flex" : "hidden"
                    } text-bold text-[10px] `}
                  >
                    <IoIosArrowBack className="text-[25px] ease-in-out duration-500 mx-2" />
                  </p>
                )}
              </>
            ) : (
              <>
                {showName && (
                  <p
                    className={`${
                      openSidebar ? "flex" : "hidden"
                    } text-bold text-[10px] `}
                  >
                    <IoIosArrowDown className="text-[25px] ease-in-out duration-500 mx-2" />
                  </p>
                )}
              </>
            )}
          </div>
          {!dropdowns.dropdown1 && (
            <>
              <div
                className={`flex w-full bg-secondary-light flex-row max-auto px-2 items-center hover:bg-fifth-dark cursor-pointer hover:border-secondary-dark  hover:border-b-[2px]${
                  location.pathname === "/"
                    ? "bg-fifth-dark border-secondary-dark  border-b-[2px]"
                    : ""
                }`}
                onClick={() => {
                  //change it to the actual path
                  navigate("/dashboard/church-district/district-assignment");
                }}
              >
                <div className="h-[35px] min-w-[42px]  flex items-center justify-center ml-2">
                  <IoIosFolder className="text-[20px] ease-in-out duration-500" />
                </div>
                {showName && (
                  <p className={`text-bold text-[14px]`}>District Assignment</p>
                )}
              </div>
              <div
                className={`flex w-full bg-secondary-light flex-row max-auto px-2 items-center hover:bg-fifth-dark cursor-pointer hover:border-secondary-dark  hover:border-b-[2px]${
                  location.pathname === "/"
                    ? "bg-fifth-dark border-secondary-dark  border-b-[2px]"
                    : ""
                }`}
                onClick={() => {
                  //change it to the actual path
                  navigate("/dashboard/church-district/church-assignment");
                }}
              >
                <div className="h-[35px] min-w-[42px]  flex items-center justify-center ml-2">
                  <IoIosFolder className="text-[20px] ease-in-out duration-500" />
                </div>
                {showName && (
                  <p className={`text-bold text-[14px]`}>Church Assignment</p>
                )}
              </div>
              <div
                className={`flex w-full bg-secondary-light flex-row max-auto px-2 items-center hover:bg-fifth-dark cursor-pointer hover:border-secondary-dark  hover:border-b-[2px]${
                  location.pathname === "/"
                    ? "bg-fifth-dark border-secondary-dark  border-b-[2px]"
                    : ""
                }`}
                onClick={() => {
                  //change it to the actual path
                  navigate("/dashboard/church-district/assignment-logs");
                }}
              >
                <div className="h-[35px] min-w-[42px]  flex items-center justify-center ml-2">
                  <IoIosFolder className="text-[20px] ease-in-out duration-500" />
                </div>
                {showName && (
                  <p className={`text-bold text-[14px]`}>Assignment Logs</p>
                )}
              </div>
            </>
          )}
          <div
            className={`flex flex-row max-auto px-2 items-center justify-between hover:bg-secondary-light cursor-pointer`}
            onClick={() => {
              toggleDropdown("dropdown2");
            }}
          >
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <FaChurch className="text-[25px] ease-in-out duration-500 mx-2" />
              {showName && (
                <p
                  className={`${
                    openSidebar ? "flex" : "hidden"
                  } text-bold text-[15px] `}
                >
                  Analytic/Alerts
                </p>
              )}
            </div>
            {dropdowns.dropdown2 ? (
              <>
                {showName && (
                  <p
                    className={`${
                      openSidebar ? "flex" : "hidden"
                    } text-bold text-[10px] `}
                  >
                    <IoIosArrowBack className="text-[25px] ease-in-out duration-500 mx-2" />
                  </p>
                )}
              </>
            ) : (
              <>
                {showName && (
                  <p
                    className={`${
                      openSidebar ? "flex" : "hidden"
                    } text-bold text-[10px] `}
                  >
                    <IoIosArrowDown className="text-[25px] ease-in-out duration-500 mx-2" />
                  </p>
                )}
              </>
            )}
          </div>
          {!dropdowns.dropdown2 && (
            <>
              <div
                className={`flex w-full bg-secondary-light flex-row max-auto px-2 items-center hover:bg-fifth-dark cursor-pointer hover:border-secondary-dark  hover:border-b-[2px]${
                  location.pathname === "/"
                    ? "bg-fifth-dark border-secondary-dark  border-b-[2px]"
                    : ""
                }`}
                onClick={() => {
                  //change it to the actual path
                  navigate("/dashboard/analytic-alert/chart");
                }}
              >
                <div className="h-[35px] min-w-[42px]  flex items-center justify-center ml-2">
                  <IoIosFolder className="text-[20px] ease-in-out duration-500" />
                </div>
                {showName && <p className={`text-bold text-[14px]`}>Chart</p>}
              </div>
              <div
                className={`flex w-full bg-secondary-light flex-row max-auto px-2 items-center hover:bg-fifth-dark cursor-pointer hover:border-secondary-dark  hover:border-b-[2px]${
                  location.pathname === "/"
                    ? "bg-fifth-dark border-secondary-dark  border-b-[2px]"
                    : ""
                }`}
                onClick={() => {
                  //change it to the actual path
                  navigate("/dashboard/analytic-alert/notification");
                }}
              >
                <div className="h-[35px] min-w-[42px]  flex items-center justify-center ml-2">
                  <IoIosFolder className="text-[20px] ease-in-out duration-500" />
                </div>
                {showName && (
                  <p className={`text-bold text-[14px]`}>Notification</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
