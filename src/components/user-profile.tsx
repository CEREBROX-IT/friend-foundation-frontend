import Header from "./header";
import { FaUser } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { useFetchUserProfileQuery } from "../redux/services/UserApi";

const UserProfile = () => {
  const personalButtonRef = useRef<HTMLButtonElement>(null);

  const { data: GetUserData } = useFetchUserProfileQuery();

  useEffect(() => {
    if (personalButtonRef.current) {
      personalButtonRef.current.focus();
    }
  }, []);

  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto`}
    >
      <Header />
      <div className=" max-h-[100px] flex-1 bg-white dark:bg-black p-4 ">
        <div className="flex items-center">
          <p className="text-black font-semibold text-[25px] dark:text-white min-w-[200px]">
            USER PROFILE
          </p>
          <hr className=" border border-black w-full " />
        </div>
      </div>
      <div className=" flex-1  bg-white  dark:bg-black p-4 px-6">
        <div className="flex flex-col lg:flex-row h-full  gap-4 bg-fourth-light shadow-xl drop-shadow-xl  pt-10 py-4 px-4">
          <div className="flex flex-col gap-4 items-center max-h-[200px] lg:max-h-full border-b-4 border-b-black lg:border-b-0 lg:border-r-4 lg:border-r-black h-full max-w-[350px] lg:min-w-[300px]">
            <FaUser className="aspect-square text-[100px] lg:text-[200px] rounded-full dark:text-white bg-black text-white p-3" />

            <div className="flex flex-col">
              <h1 className="font-bold text-4xl dark:text-white">
                {GetUserData?.data.first_name} {GetUserData?.data.last_name}
              </h1>
              <h1 className="font-semibold dark:text-white">
                {GetUserData?.data.title}
              </h1>
            </div>
          </div>
          <div className="flex flex-col w-full  px-4">
            <div className="flex justify-between lg:justify-start gap-10">
              <button
                className="font-semibold text-lg focus:border-b-[4px] focus:border-b-secondary-light outline-none"
                ref={personalButtonRef}
              >
                Personal
              </button>
              <button className="font-semibold text-lg focus:border-b-[4px] focus:border-b-secondary-light outline-none">
                Family Background
              </button>
              <button className="font-semibold text-lg focus:border-b-[4px] focus:border-b-secondary-light outline-none">
                Address
              </button>
            </div>
            <div className="mt-10">
              <div className="flex gap-4">
                <h1 className="text-xl font-bold">Email: </h1>
                <p className="text-xl font-bold">{GetUserData?.data.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold">Age: </h1>
                <p className="text-xl font-bold">{GetUserData?.data.age}</p>
              </div>

              <h1 className="text-xl font-bold">Birthday</h1>
              <h1 className="text-xl font-bold">Contact No</h1>
              <h1 className="text-xl font-bold">Gender</h1>
            </div>
          </div>
        </div>
      </div>

      <p className="px-4 mb-2 text-[14px] dark:text-white text-[#707070] text-center">
        © Copyright reserve Friend Foundation Management System 2024
      </p>
    </div>
  );
};

export default UserProfile;
