import FormCard from "../form-card";
import { useFetchUnansweredFormQuery } from "../../redux/services/FormApi";
import { useState } from "react";
import AdminTablePerForm from "./admin-table-per-form";
const AdminForms = () => {
  const [formId, setFormId] = useState<number>();
  const [openForm, setOpenForm] = useState(false);
  const { data: FetchUnasweredForm } = useFetchUnansweredFormQuery();
  
  const handleCloseForm = () => setOpenForm(false)
  const handleForm = (item: any) => {
    setOpenForm(true);
    setFormId(item);
  };
  return (
    <div className="max-h-screen overflow-auto custom-scrollbar p-4">
      <div className="mt-10 flex flex-col gap-4 relative ">
        {FetchUnasweredForm?.map((item) => (
          <FormCard
            title={item.form_title}
            description={item.form_description}
            status={item.status}
            deadline={item.deadline}
            card_click={() => handleForm(item.id)}
          />
        ))}
      </div>
      {openForm && <AdminTablePerForm id={formId} closeForm={handleCloseForm}/>}
    </div>
  );
};

export default AdminForms;
