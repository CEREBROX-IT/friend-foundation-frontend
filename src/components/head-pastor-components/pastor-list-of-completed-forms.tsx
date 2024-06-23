
import FormCard from "../form-card";
import { useFetchAnsweredFormsQuery } from "../../redux/services/FormApi";
const PastorListOfCompletedForms = () => {
    const {data: AnsweredForms} = useFetchAnsweredFormsQuery()
    console.log(AnsweredForms)
  return (
    <div className="flex-1 relative min-h-screen ">
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