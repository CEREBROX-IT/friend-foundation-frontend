import FormCard from "../form-card";
import { useFetchUnansweredFormQuery } from "../../redux/services/FormApi";
import { useState, useEffect, useMemo } from "react";
import PastorSubmitFormModal from "./pastor-submit-form-modal";
import { FiSearch } from "react-icons/fi";
import Empty from "../../assets/Empty.jpg"
import { UnansweredFormsResponse } from "../../redux/type/Type";
const PastorListOfPendingForms = () => {
  const { data: FetchUnasweredForm } = useFetchUnansweredFormQuery();
  const [submitModal, setIsSubmitModal] = useState(false);
  const [values, setValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<
    UnansweredFormsResponse
  >([]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      FetchUnasweredForm?.filter((row) => {
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
  }, [searchQuery, FetchUnasweredForm]);


  const handleCloseModal = () => setIsSubmitModal(false);

  const handleClick = (item: any) => {
    setIsSubmitModal(true);
    setValues(item)
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-center mt-5">
        <h1 className="mt-4 text-lg font-bold">PENDING FORMS</h1>
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
      
      
      <div className="mt-10 flex flex-col gap-4 flex-1 ">
        {memoizedFilteredRows && memoizedFilteredRows.length > 0 ? <>{memoizedFilteredRows?.map((item) => (
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
