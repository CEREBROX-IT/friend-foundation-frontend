
import FormCard from "../form-card";
import { useFetchAnsweredFormsQuery } from "../../redux/services/FormApi";
const PastorListOfCompletedForms = () => {
    const {data: AnsweredForms} = useFetchAnsweredFormsQuery()
  return (
    <div className="flex-1  min-h-screen max-h-screen overflow-auto">
      <h1 className="mt-4 text-2xl font-bold ">COMPLETED FORMS</h1>

      <div className="mt-10 flex flex-col gap-4 flex-1">
        {AnsweredForms?.map((item) => (
          <FormCard
            title={item.form_title}
            description={item.form_description}
            status={item.status}
            deadline={item.deadline}
            date_created={item.date_created}
          />
        ))}
      </div>
    </div>
  );
}

export default PastorListOfCompletedForms;