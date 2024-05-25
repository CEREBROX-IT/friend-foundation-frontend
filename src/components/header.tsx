import SampleLogo from "../assets/ff_sample_logo.webp";
import BellIcon from "../assets/notification_bell_icon.webp";
import { FaUser } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="bg-white px-4 p-[4px] flex justify-between">
      <div className="flex flex-row items-center gap-2 text-primary-light text-[20px] font-bold">
        <img src={SampleLogo} className="h-[50px] min-w-[50px] " />
        <p className="hidden md:flex">Friend Foundation Management System</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="rounded-[50%] bg-fourth-light h-[40px] min-w-[40px] flex items-center cursor-pointer">
          <img src={BellIcon} className="h-[35px] mx-auto" />
        </div>
        <div className="rounded-[50%] bg-fifth-dark h-[40px] min-w-[40px] flex items-center cursor-pointer">
          <FaUser className="text-white my-auto mx-auto text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default Header;
