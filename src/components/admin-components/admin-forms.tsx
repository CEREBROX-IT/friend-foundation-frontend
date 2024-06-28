import FormCard from "../form-card";
import { useFetchActiveFormQuery, useDeleteReportFormsMutation } from "../../redux/services/FormApi";
import { useState, useEffect, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import AdminTablePerForm from "./admin-table-per-form";
import { UnansweredFormsResponse } from "../../redux/type/Type";
import AdminEditFormModal from "./admin-edit-form-modal";
import Empty from "../../assets/Empty.jpg"
const AdminForms = () => {
  const [formId, setFormId] = useState<number>();
  const [openForm, setOpenForm] = useState(false);
  const [editFormModal, setEditForModal] = useState(false)
   const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<
    UnansweredFormsResponse
  >([]);

  const { data: FetchUnasweredForm } = useFetchActiveFormQuery();
  const [DeleteForm] = useDeleteReportFormsMutation()

  const handleOpenEditForm = () => setEditForModal(!editFormModal)

  const handleCloseForm = () => setOpenForm(false)

  const handleForm = (item: any) => {
    setOpenForm(true);
    setFormId(item);
  };

  const handleDeleteForm = async (id: number) => {
    await DeleteForm({id: id}).unwrap().then((response) => {
      console.log(response)
    })
  }

   const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      FetchUnasweredForm?.filter((row) => {
        return (
          row.form_title?.toLowerCase().includes(lowerCaseQuery) 
          
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, FetchUnasweredForm]);

  return (
    <div className="max-h-screen overflow-auto custom-scrollbar ">
      <div className="flex flex-col lg:flex-row gap-2 lg:justify-end lg:items-center mt-5">
        <div className=" w-full lg:max-w-[400px] ">
          <FiSearch
            size={20}
            className="absolute mt-[11px] right-50 font-black ml-3"
          />
          <input
            type="text"
            placeholder="Search by Form Title"
            className=" w-full p-2 pl-10 border rounded-[360px] shadow-sm bg-sixth-light dark:bg-fourth-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
      </div>
      </div>
      <div className="mt-10 flex flex-col gap-10 lg:gap-6 relative ">
        {memoizedFilteredRows && memoizedFilteredRows.length > 0 ? <>{memoizedFilteredRows?.map((item) => (
          <FormCard
            title={item.form_title}
            description={item.form_description}
           
            deadline={item.deadline}
            total={item.total}
            card_click={() => handleForm(item.id)}
            delete_click={() => handleDeleteForm(item.id)}
            edit_click={() => handleOpenEditForm()}
          />
        ))}</> : <> <div className="flex flex-1 w-full h-full justify-center ">
          <img src={Empty} className="w-96 w-96"/></div></>}
        
      </div>
      {openForm && <AdminTablePerForm id={formId} closeForm={handleCloseForm}/>}
      {editFormModal && <AdminEditFormModal />}
    </div>
  );
};

export default AdminForms;
