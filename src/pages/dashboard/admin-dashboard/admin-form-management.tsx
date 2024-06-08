import { useState } from "react";
import Header from "../../../components/header";
import ListUsersOverview from "../../../components/admin-components/list-users-overview";
import NewUserModal from "../../../components/admin-components/new-user-modal";
const AdminFormManagement = () => {
  const [openNewUserModal, setOpenNewUserModal] = useState(false);

  const handleOpenNewuserModal = () => setOpenNewUserModal(true);
  const hanldeCloseOpenNewUserModal = () => setOpenNewUserModal(false);
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark ${
        openNewUserModal ? "overflow-hidden max-h-screen " : "overflow-y-auto"
      }`}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          Form Management
        </p>
      </div>

      <div className="flex-1 w-full px-4 absolute translate-y-32">
        <div className=" bg-white p-4 rounded-[10px] dark:bg-fourth-dark">
          <div className="flex gap-2 flex-wrap basis-4">
            <button
              className="bg-fourth-dark py-2 px-7 text-white dark:bg-white  dark:text-black font-bold  rounded-md mb-4 hover:opacity-85"
              onClick={handleOpenNewuserModal}
            >
              Create Form
            </button>
            <button
              className="bg-fourth-dark py-2 px-7 text-white dark:bg-white  dark:text-black font-bold  rounded-md mb-4 hover:opacity-85"
              onClick={handleOpenNewuserModal}
            >
                Submitted Logs
            </button>
            <button
              className="bg-fourth-dark py-2 px-7 text-white dark:bg-white  dark:text-black font-bold  rounded-md mb-4 hover:opacity-85"
              onClick={handleOpenNewuserModal}
            >
              Pending Logs
            </button>
          </div>
          <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
            <div className="min-h-[80vh] bg-fourth-light"></div>
          </div>
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center dark:text-white">
          © Copyright reserve Friend Foundation Management System 2024
        </p>
      </div>

      {openNewUserModal && (
        <NewUserModal closeUserModal={hanldeCloseOpenNewUserModal} />
      )}
    </div>
  );
};

export default AdminFormManagement;
