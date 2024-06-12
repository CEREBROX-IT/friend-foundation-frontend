import { useState } from "react";
import Header from "../../../components/header";
import AdminAddForm from "../../../components/admin-components/admin-add-form";
import FormCard from "../../../components/admin-components/formcard";
import { useGetFormStatusQuery } from "../../../redux/services/usersApi";
import NoDataFound from "../../../../public/NoDataImage.png";
import { useDeleteFormMutation } from "../../../redux/services/usersApi";
import AdminEditForm from "../../../components/admin-components/admin-edit-form";
import AdminSubmittedLogs from "../../../components/admin-components/admin-submitted-logs";
import AdminPendingLogs from "../../../components/admin-components/admin-pending-logs";
const AdminFormManagement = () => {
  const { data: FormStatus } = useGetFormStatusQuery();
  const [deleteForm] = useDeleteFormMutation();
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleCloseForm = () => setOpenAddForm(false);
  const [page, setPage] = useState<string>("Create Form");
  const [selectedId, setSelectedId] = useState<number>();

  const constructDownloadLink = (relativePath: string) => {
    // Replace 'baseURL' with your actual base URL where files are stored
    const baseURL = "http://localhost:3000"; // Replace this with your base URL
    return `${baseURL}/${relativePath}`;
  };

  const handleDelete = async (id: number) => {
    await deleteForm({ id })
      .unwrap()
      .then((response) => console.log(response));
  };

  const handleUpdate = (id?: number) => {
    setOpenEditForm(true);
    setSelectedId(id);
  };

  const handleOpenForm = () => {
    setPage("Create Form");
    setOpenAddForm(true);
  };

  const handleEditCloseForm = () => setOpenEditForm(false);

  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto`}
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
              className="bg-secondary-light py-2 px-7 text-white dark:bg-white  dark:text-black font-bold  rounded-md lg:mb-4 hover:opacity-85"
              onClick={handleOpenForm}
            >
              Create Form
            </button>
            <button
              className="bg-primary-light py-2 px-7 text-white dark:bg-white  dark:text-black font-bold  rounded-md lg:mb-4 hover:opacity-85"
              onClick={() => setPage("Submitted Logs")}
            >
              Submitted Logs
            </button>
            <button
              className="bg-fourth-dark py-2 px-7 text-white dark:bg-white  dark:text-black font-bold  rounded-md lg:mb-4 hover:opacity-85"
              onClick={() => setPage("Pending Logs")}
            >
              Pending Logs
            </button>
          </div>
          {page === "Submitted Logs" ? (
            <AdminSubmittedLogs />
          ) : page === "Pending Logs" ? (
            <AdminPendingLogs />
          ) : (
            <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
              <div className="flex flex-col  justify-center  min-h-[80vh] lg:p-4">
                {FormStatus?.length === 0 ? (
                  <>
                    <img
                      src={NoDataFound}
                      className="aspect-square object-contain lg:w-72 select-none"
                    />
                  </>
                ) : (
                  <>
                    {FormStatus?.map((item) => (
                      <FormCard
                        Title={item.form_title}
                        Description={item.form_description}
                        attachfile={
                          item.attachment_file
                            ? constructDownloadLink(item.attachment_file)
                            : ""
                        }
                        status={item.active_status ? "ACTIVE" : "INACTIVE"}
                        total={item.total}
                        id={item?.id}
                        handleDelete={() => handleDelete(item.id)}
                        handleUpdate={() => handleUpdate(item.id)}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center dark:text-white">
          © Copyright reserve Friend Foundation Management System 2024
        </p>
        {openAddForm && <AdminAddForm closeForm={handleCloseForm} />}
        {openEditForm && (
          <AdminEditForm closeForm={handleEditCloseForm} id={selectedId} />
        )}
      </div>
    </div>
  );
};

export default AdminFormManagement;
