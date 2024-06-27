import FormCard from "../form-card";
import { useFetchUnansweredFormQuery } from "../../redux/services/FormApi";
import { useState } from "react";
import PastorSubmitFormModal from "./pastor-submit-form-modal";
import Empty from "../../assets/Empty.jpg"
const PastorListOfPendingForms = () => {
  const { data: FetchUnasweredForm } = useFetchUnansweredFormQuery();
  const [submitModal, setIsSubmitModal] = useState(false);
  const [values, setValues] = useState({});
  const handleCloseModal = () => setIsSubmitModal(false);

  const handleClick = (item: any) => {
    setIsSubmitModal(true);
    setValues(item)
  };

  return (
    <div className="flex-1">
      <h1 className="mt-4 text-lg font-bold">PENDING FORMS</h1>
      <div className="mt-10 flex flex-col gap-4 flex-1 ">
        {FetchUnasweredForm && FetchUnasweredForm.length > 0 ? <>{FetchUnasweredForm?.map((item) => (
          <FormCard
            title={item.form_title}
            description={item.form_description}
            status={item.status}
            deadline={item.deadline}
            card_click={() => handleClick(item)}
          />
        ))}</> : <>
        <div className="flex flex-1 w-full h-full justify-center ">
          <img src={Empty} className="w-96 w-96"/></div>
        </>}
      </div>
      {submitModal && (
        <PastorSubmitFormModal closeModal={handleCloseModal} data={values} />
      )}
    </div>
  );
};

export default PastorListOfPendingForms;
