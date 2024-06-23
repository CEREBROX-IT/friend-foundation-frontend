import Header from "../../../components/header";
import { useState } from "react";
// import AddFormModal from "../../../components/admin-components/add-form-modal";

const AdminFormManagement = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

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
        <div className=" gap-4 bg-white min-h-screen p-4 rounded-[10px] dark:bg-fourth-dark">
          <div className="flex flex-wrap gap-4">
            <button
              className=" bg-secondary-light py-2 px-10 lg:w-[250px] cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
              onClick={handleAddFormModal}
            >
              ADD FORM
            </button>
            <button className=" bg-[#B378FF] py-2 px-10 lg:w-[250px] cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85">
              SUBMITTED LOGS
            </button>
            <button className=" bg-primary-dark py-2 px-10 lg:w-[250px]  cursor-pointer text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85">
              PENDING LOGS
            </button>
          </div>
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center dark:text-white">
          © Copyright reserve Friend Foundation Management System 2024
        </p>
        {/* {isOpenAddForm && (
          <AddFormModal closeAddModalForm={hanldeCloseFormModal} />
        )} */}
      </div>
    </div>
  );
};

export default AdminFormManagement;
