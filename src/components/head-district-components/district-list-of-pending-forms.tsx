import FormCard from "../form-card";
import { useFetchUnansweredFormQuery } from "../../redux/services/FormApi";
const DistrictListOfPendingForms = () => {
  const { data: FetchUnasweredForm } = useFetchUnansweredFormQuery();
  console.log(FetchUnasweredForm);
  return (
    <div className="mt-10 flex flex-col gap-4">
      {FetchUnasweredForm?.map((item) => (
        <FormCard
          title={item.form_title}
          description={item.form_description}
          status={item.status}
          deadline={item.deadline}
        />
      ))}
    </div>
  );
};

export default DistrictListOfPendingForms;
