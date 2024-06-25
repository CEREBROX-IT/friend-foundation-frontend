import FormCard from "../form-card";
import { useFetchUnansweredFormQuery } from "../../redux/services/FormApi";
import { useState } from "react";
import PastorSubmitFormModal from "./pastor-submit-form-modal";

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
      <h1 className="mt-4 text-4xl font-bold underline">PENDING FORMS</h1>
      <div className="mt-10 flex flex-col gap-4 flex-1 ">
        {FetchUnasweredForm?.map((item) => (
          <FormCard
            title={item.form_title}
            description={item.form_description}
            status={item.status}
            deadline={item.deadline}
            card_click={() => handleClick(item)}
          />
        ))}
      </div>
      {submitModal && (
        <PastorSubmitFormModal closeModal={handleCloseModal} data={values} />
      )}
    </div>
  );
};

export default PastorListOfPendingForms;
