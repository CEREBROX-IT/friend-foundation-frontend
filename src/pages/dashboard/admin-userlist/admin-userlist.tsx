import { useState } from "react";
import Header from "../../../components/header";
import ListUsersOverview from "../../../components/admin-components/list-users-overview";
import NewUserModal from "../../../components/admin-components/new-user-modal";
const AdminUserList = () => {
  const [openNewUserModal, setOpenNewUserModal] = useState(false)

  const handleOpenNewuserModal = () => setOpenNewUserModal(true)
  const hanldeCloseOpenNewUserModal = () => setOpenNewUserModal(false)
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark ${
        openNewUserModal ? "overflow-hidden max-h-screen " : "overflow-y-auto"
      }`}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          LIST OF USERS
        </p>
      </div>

      <div className="flex-1 w-full px-4 absolute translate-y-32">
        <div className="bg-white p-4 rounded-[10px] dark:bg-fourth-dark">
          <button
            className="bg-fourth-dark py-2 px-7 text-white dark:bg-white  dark:text-black font-bold  rounded-md mb-4 hover:opacity-85"
            onClick={handleOpenNewuserModal}
          >
            NEW USER
          </button>
          <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
            <ListUsersOverview />
          </div>
        </div>
      </div>
      {openNewUserModal && (
        <NewUserModal closeUserModal={hanldeCloseOpenNewUserModal} />
      )}
    </div>
  );
};

export default AdminUserList;
