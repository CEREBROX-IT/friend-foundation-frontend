import { useState, useEffect, useMemo } from "react";
import { useFetchSubmittedLogsQuery } from "../redux/services/FormApi";
import FormCardRemarks from "./form-card-remarks";
import PastorEditForm from "./head-pastor-components/pastor-edit-form-modal";
import JwtDecoder from "../utils/jwt-decoder";
import Empty from "../assets/Empty.jpg"
import { FiSearch } from "react-icons/fi";
import { SubmittedFormLog } from "../redux/type/Type";


export default function ReviseLogs() {
  const decodeddata = JwtDecoder().decodedToken
  const id = decodeddata?.id
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({})
  const { data: SubmittedLog } = useFetchSubmittedLogsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<
    SubmittedFormLog[]
  >([]);

  const filterData = SubmittedLog?.data?.filter(
    (item: any) => item.status === "Revise" && item.user_id === id
  );
  
  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      filterData?.filter((row) => {
        return (
          row.form_title?.toLowerCase().includes(lowerCaseQuery) 
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterData]);

  const handleOpenModal = (item: any) => {
    setOpenModal(true);
    setSelectedData(item)
  };

  const handleCloseModal = () => setOpenModal(false)
  return (
    <div className="flex-1 min-h-screen max-h-screen overflow-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mt-5 gap-2">
          <h1 className="mt-4 text-lg font-bold ">REVISE FORM</h1>
        <div className=" w-full lg:max-w-[400px] ">
          <FiSearch
            size={20}
            className="absolute mt-[11px] right-50 font-black ml-3"
          />
          <input
            type="text"
            placeholder="Search by Form Title"
            className=" w-full p-2 pl-10 border rounded-[360px] shadow-sm bg-sixth-light dark:bg-fourth-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
      </div>
  </div>

      <div className="mt-10 flex flex-col gap-4 flex-1">
        {memoizedFilteredRows && memoizedFilteredRows?.length > 0 ? <>{memoizedFilteredRows?.map((item: any) => (
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
