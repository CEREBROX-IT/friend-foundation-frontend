
import FormCardComplete from "../form-card-completed";
import { useFetchAnsweredFormsQuery } from "../../redux/services/FormApi";
import Empty from "../../assets/Empty.jpg"
const PastorListOfCompletedForms = () => {
    const {data: AnsweredForms} = useFetchAnsweredFormsQuery()
    
  return (
    <div className="flex-1  min-h-screen max-h-screen overflow-auto">
      <h1 className="mt-4 text-lg font-bold ">COMPLETED FORMS</h1>

      <div className="mt-10 flex flex-col gap-4 flex-1">
        {AnsweredForms && AnsweredForms.length > 0 ? <>{AnsweredForms?.map((item) => (
          <FormCardComplete
            title={item.form_title}
            description={item.form_description}
            status={item.status}
            deadline={item.deadline}
            date_created={item.date_created}
          />
        ))}</> : <>        <div className="flex flex-1 w-full h-full justify-center ">
          <img src={Empty} className="w-96 w-96"/></div>
</>}
      </div>
    </div>
  );
}

export default PastorListOfCompletedForms;