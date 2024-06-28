
import FormCardComplete from "../form-card-completed";
import { useFetchAnsweredFormsQuery } from "../../redux/services/FormApi";
import Empty from "../../assets/Empty.jpg"
import { useState, useEffect, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { AnsweredFormsResponse } from "../../redux/type/Type";
const PastorListOfCompletedForms = () => {
  const {data: AnsweredForms} = useFetchAnsweredFormsQuery()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<
    AnsweredFormsResponse[]
  >([]);

  
  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      AnsweredForms?.filter((row) => {
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
  }, [searchQuery, AnsweredForms]);

  return (
    <div className="flex-1  min-h-screen max-h-screen overflow-auto">
      
 <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mt-5 gap-2">
          <h1 className="mt-4 text-lg font-bold ">COMPLETED FORMS</h1>
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
        {memoizedFilteredRows && memoizedFilteredRows.length > 0 ? <>{memoizedFilteredRows?.map((item: any) => (
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