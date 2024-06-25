import Header from "../../../components/header";
import { useState } from "react";
import AddFormModal from "../../../components/admin-components/add-form-modal";
import { IoIosAddCircle } from "react-icons/io";
import AdminForms from "../../../components/admin-components/admin-forms";
import AdminSubmittedPage from "../../../components/admin-components/admin-submitted-page";
import AdminPendingPage from "../../../components/admin-components/admin-pending-logs";
const AdminFormManagement = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [page, setPage] = useState("forms");

  const handleFormPage = () => setPage("forms");
  const handleSubmittedPage = () => setPage("submitted-page");
  const handlePendingPage = () => setPage("pending-page");

  const handleAddFormModal = () => setIsOpenAddForm(true);
  const hanldeCloseFormModal = () => setIsOpenAddForm(false);
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto`}
    >
      <Header />
      <div className="w-full h-[200px] bg-primary-light p-4">
        <p className="text-sixth-light font-semibold text-[25px]">
          Form Management
        </p>
      </div>

      <div className="flex-1  w-full px-4 absolute translate-y-32">
        <div className=" gap-4 bg-white min-h-screen   p-4 rounded-[10px] dark:bg-fourth-dark">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-4">
              <button
                className=" bg-secondary-light py-2 px-10 lg:w-[250px] cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
                onClick={handleFormPage}
              >
                FORMS
              </button>
              <button
                className=" bg-[#B378FF] py-2 px-10 lg:w-[250px] cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
                onClick={handleSubmittedPage}
              >
                SUBMITTED LOGS
              </button>
              <button className=" bg-primary-dark py-2 px-10 lg:w-[250px]  cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85" onClick={handlePendingPage}>
                PENDING LOGS
              </button>
            </div>
            <IoIosAddCircle
              className="text-5xl text-secondary-light cursor-pointer"
              onClick={handleAddFormModal}
            />
          </div>
          {page === "forms" && <AdminForms />}
          {page === "submitted-page" && <AdminSubmittedPage />}
          {page === "pending-page" && <AdminPendingPage />}
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center dark:text-white">
          © Copyright reserve Friend Foundation Management System 2024
        </p>

        {isOpenAddForm && (
          <AddFormModal closeAddModalForm={hanldeCloseFormModal} />
        )}
      </div>
    </div>
  );
};

export default AdminFormManagement;
