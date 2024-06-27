import FormCard from "../form-card";
import { useFetchActiveFormQuery, useDeleteReportFormsMutation } from "../../redux/services/FormApi";
import { useState } from "react";
import AdminTablePerForm from "./admin-table-per-form";
import AdminEditFormModal from "./admin-edit-form-modal";

const AdminForms = () => {
  const [formId, setFormId] = useState<number>();
  const [openForm, setOpenForm] = useState(false);
  const [editFormModal, setEditForModal] = useState(false)

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
  return (
    <div className="max-h-screen overflow-auto custom-scrollbar ">
      <div className="mt-10 flex flex-col gap-4 relative ">
        {FetchUnasweredForm?.map((item) => (
          <FormCard
            title={item.form_title}
            description={item.form_description}
           
            deadline={item.deadline}
            total={item.total}
            card_click={() => handleForm(item.id)}
            delete_click={() => handleDeleteForm(item.id)}
            edit_click={() => handleOpenEditForm()}
          />
        ))}
      </div>
      {openForm && <AdminTablePerForm id={formId} closeForm={handleCloseForm}/>}
      {editFormModal && <AdminEditFormModal />}
    </div>
  );
};

export default AdminForms;
