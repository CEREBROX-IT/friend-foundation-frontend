import { useState } from "react";
import { useFetchSubmittedLogsQuery } from "../../redux/services/FormApi";
import FormCardRemarks from "../form-card-remarks";
import PastorEditForm from "../head-pastor-components/pastor-edit-form-modal";
import JwtDecoder from "../../utils/jwt-decoder";
import { useNavigate } from "react-router-dom";
import Empty from "../../assets/Empty.jpg"
export default function DistrictRevisedForm() {
  const decodeddata = JwtDecoder().decodedToken;
  const navigate = useNavigate()
  const id = decodeddata?.id;
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const { data: SubmittedLog } = useFetchSubmittedLogsQuery();

  const filterData = SubmittedLog?.data?.filter(
    (item: any) => item.status === "Revise" && item.user_id === id
  );
  console.log(filterData);

  // const handleOpenModal = (item: any) => {
  //   setOpenModal(true);
  //   setSelectedData(item);
  // };

  const handleCloseModal = () => setOpenModal(false);
  return (
    <div className="flex-1 min-h-screen p-4 max-h-screen overflow-auto">
      <h1 className="font-bold text-2xl text-red-600">REVISE FORM</h1>
      <div className="mt-10 flex flex-col gap-4 flex-1">
        {filterData && filterData?.length > 0 ? <>
          {filterData?.map((item: any) => (
          <FormCardRemarks
            title={item.form_title}
            description={item.form_description}
            status={item.status}
            remarks={item?.remarks}
            card_click={() => navigate("form-submission")}
          />
        ))}</> : <div className="flex h-full justify-center items-center ">
          <img src={Empty} className="h-96 w-96"/></div>}
      </div>
      {openModal && (
        <PastorEditForm closeModal={handleCloseModal} data={selectedData} />
      )}
    </div>
  );
}
