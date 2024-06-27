import { useState } from "react";
import { useFetchSubmittedLogsQuery } from "../redux/services/FormApi";
import FormCardRemarks from "./form-card-remarks";
import PastorEditForm from "./head-pastor-components/pastor-edit-form-modal";
import JwtDecoder from "../utils/jwt-decoder";
import Empty from "../assets/Empty.jpg"

export default function ReviseLogs() {
  const decodeddata = JwtDecoder().decodedToken
  const id = decodeddata?.id
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({})
  const { data: SubmittedLog } = useFetchSubmittedLogsQuery();
  
  const filterData = SubmittedLog?.data.filter(
    (item: any) => item.status === "Revise" && item.user_id === id
  );
  

  const handleOpenModal = (item: any) => {
    setOpenModal(true);
    setSelectedData(item)
  };

  const handleCloseModal = () => setOpenModal(false)
  return (
    <div className="flex-1 min-h-screen max-h-screen overflow-auto">
      <h1 className="mt-4 text-lg font-bold ">REVISE FORMS</h1>

      <div className="mt-10 flex flex-col gap-4 flex-1">
        {filterData && filterData?.length > 0 ? <>{filterData?.map((item: any) => (
          <FormCardRemarks
            title={item.form_title}
            description={item.form_description}
            status={item.status}
            remarks={item?.remarks}
            card_click={() => handleOpenModal(item)}
          />
        ))}</> : <><div className="flex flex-1 w-full h-full justify-center ">
          <img src={Empty} className="w-96 w-96"/></div></>}
      </div>
      {openModal && (
        <PastorEditForm closeModal={handleCloseModal} data={selectedData} />
      )}
    </div>
  );
}
