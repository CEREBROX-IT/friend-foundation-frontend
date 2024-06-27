import Header from "../../../components/header";
import { FaFile } from "react-icons/fa6";
import ResultCards from "../../../components/result-cards";
import { useFetchNoOfFormsQuery, useFetchNoReviseFormQuery } from "../../../redux/services/StatsApi";
import LoadingAnimation2 from "../../../components/loading-animation2";
import DistrictRevisedForm from "../../../components/head-district-components/district-revised-form";

const PastorDashboard = () => {
  const { data: FormCount, isLoading: FormLoading } = useFetchNoOfFormsQuery();
  const {data: ReviseForm, isLoading: ReviseFormLoading} = useFetchNoReviseFormQuery()
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto`}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          PASTOR DASHBOARD
        </p>
      </div>

      <div className="flex flex-wrap flex-row gap-4 px-4 mt-[-4.5rem]">
        <ResultCards
          title="No. of Completed Forms"
          result={
            FormLoading ? <LoadingAnimation2 /> : FormCount?.completed_forms
          }
          icon={FaFile}
          navigation_path=""
        />
        <ResultCards
          title="No. of Pending Forms"
          result={
            FormLoading ? <LoadingAnimation2 /> : FormCount?.pending_forms
          }
          icon={FaFile}
          navigation_path=""
        />
        <ResultCards
          title="No. of Revise Forms"
          result={
            ReviseFormLoading ? <LoadingAnimation2 /> : ReviseForm?.count
          }
          icon={FaFile}
          navigation_path=""
        />
      </div>

      <div className="w-full p-4 mt-4">
        <div className="bg-sixth-light dark:bg-sixth-dark shadow-lg rounded-[10px] custom-scrollbar">
          <DistrictRevisedForm />
        </div>
      </div>
      <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
        © Copyright reserve Friend Foundation Management System 2024
      </p>
    </div>
  );
};

export default PastorDashboard;
