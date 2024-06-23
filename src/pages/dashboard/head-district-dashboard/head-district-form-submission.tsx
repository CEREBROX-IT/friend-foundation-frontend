import Header from "../../../components/header";
import { useState } from "react";
import DistrictListOfPendingForms from "../../../components/head-district-components/district-list-of-pending-forms";
const HeadDistrictFormSubmission = () => {
  const [setPage, setIspage] = useState("pending-page");

  const handlePendingPage = () => setIspage("pending-page");

  const handleCompletePage = () => setIspage("complete-page");

  const handleRevisedPage = () => setIspage("revised-page");
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto`}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          HEAD DISTRICT FORM
        </p>
        <div className="bg-white min-h-screen border-2 mt-10 p-4">
          <div className="flex flex-wrap gap-4">
            <button
              className=" bg-secondary-light py-2 px-10 lg:w-[250px] cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
              onClick={handlePendingPage}
            >
              LIST OF PENDING FORMS
            </button>
            <button
              className=" bg-[#B378FF] py-2 px-10 lg:w-[250px] cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
              onClick={handleCompletePage}
            >
              LIST OF COMPLETE FORMS
            </button>
            <button
              className=" bg-primary-dark py-2 px-10 lg:w-[250px]  cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
              onClick={handleRevisedPage}
            >
              LIST OF REVISE FORMS
            </button>
          </div>
          {setPage === "pending-page" ? <DistrictListOfPendingForms /> : null}
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
          © Copyright reserve Friend Foundation Management System 2024
        </p>
      </div>
    </div>
  );
};

export default HeadDistrictFormSubmission;
