import Header from "../../../components/header";
import React from "react";
import { FaFile } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import ResultCards from "../../../components/result-cards";
import DistrictOverview from "../../../components/head-district-components/district-dashboard-overview";
import LoadingAnimation2 from "../../../components/loading-animation2";
import DistrictRevisedForm from "../../../components/head-district-components/district-revised-form";
import {
  useFetchNoFormSubmissionQuery,
  useFetchNoChurchCountQuery,
  useFetchNoOfFormsQuery,
  useFetchNoReviseFormQuery
} from "../../../redux/services/StatsApi";

const HeadDistrictDashboard = () => {
  const { data: ChurchCount, isLoading: ChurchLoading } =
    useFetchNoChurchCountQuery();
  const { data: FormSubmission, isLoading: FormSubmissionLoading } =
    useFetchNoFormSubmissionQuery();
  const { data: CompletedForms, isLoading: CompletedFormsLoading } =
    useFetchNoOfFormsQuery();
    const {data: ReviseForm, isLoading: ReviseFormLoading} = useFetchNoReviseFormQuery()

  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto`}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          HEAD DISTRICT DASHBOARD
        </p>
      </div>

      <div className="flex flex-wrap flex-row gap-4 px-4 mt-[-4.5rem]">
        <ResultCards
          title="No. of Churches"
          result={
            ChurchLoading ? <LoadingAnimation2 /> : ChurchCount?.total_churches
          }
          icon={HiMiniUsers}
          navigation_path="/dashboard/church-list"
        />
        <ResultCards
          title="Form Submission"
          result={
            FormSubmissionLoading ? (
              <LoadingAnimation2 />
            ) : (
              FormSubmission?.submitted_pastors
            )
          }
          incomplete={FormSubmission?.not_submitted_pastors}
          description="Pastors not submitted"
          icon={FaFile}
          navigation_path=""
        />
        <ResultCards
          title="No. of Completed Forms"
          result={
            CompletedFormsLoading ? (
              <LoadingAnimation2 />
            ) : (
              CompletedForms?.completed_forms
            )
          }
          incomplete={CompletedForms?.pending_forms}
          description="Pending Forms you have not Submitted"
          icon={FaFile}
          navigation_path=""
        />
        <ResultCards
          title="No. of Revise Form"
          result={
            ReviseFormLoading ? <LoadingAnimation2 /> : ReviseForm?.count
          }
          icon={FaFile}
          navigation_path="/dashboard/church-list"
        />
      </div>

      <div className="w-full p-4 mt-4">
        <div className="bg-sixth-light dark:bg-sixth-dark shadow-lg rounded-[10px] custom-scrollbar">
          <DistrictOverview />
        </div>
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

export default HeadDistrictDashboard;
