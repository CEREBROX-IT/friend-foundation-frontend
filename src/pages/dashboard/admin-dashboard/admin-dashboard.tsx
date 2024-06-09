import { FC } from "react";
import Header from "../../../components/header";
import ResultCards from "../../../components/result-cards";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUserTie, FaFile, FaChurch } from "react-icons/fa6";
import SubmittedFormOverview from "../../../components/admin-components/submitted-forms-overview";
import AssignmentLogsOverview from "../../../components/admin-components/assignment-logs-overview";
import PendingUserOverview from "../../../components/admin-components/pending-user-overview";
import { useGetUserCountQuery, useGetFormSubmissionCountQuery, useGetChurchCountQuery } from "../../../redux/services/statsApi";
import LoadingAnimation2 from "../../../components/loading-animation2";
const AdminDashboard: FC = () => {

  const {data: userCount, isLoading: UserLoading} = useGetUserCountQuery()
  const {data: FormSubmissionCount, isLoading: FormLoading} = useGetFormSubmissionCountQuery()
  const {data: ChurchCount, isLoading: ChurchLoading} = useGetChurchCountQuery()
  return (
    <div className="relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto">
      <Header />
      <div className="w-full h-[200px] bg-primary-light p-4">
        <p className="text-sixth-light font-semibold text-[25px]">
          HQ MIS DASHBOARD
        </p>
      </div>
      <div className="flex flex-wrap flex-row gap-4 px-4 mt-[-7.5rem]">
        <ResultCards
          title="No. of Users"
          result={UserLoading ? <LoadingAnimation2 /> : userCount?.active_user}
          incomplete={userCount?.pending_user}
          description="Pending User"
          icon={HiMiniUsers}
          navigation_path="/dashboard/users"
        />
        <ResultCards
          title="Form Submission"
          result={
            FormLoading ? (
              <LoadingAnimation2 />
            ) : (
              FormSubmissionCount?.submitted_pastors
            )
          }
          incomplete={FormSubmissionCount?.not_submitted_pastors}
          description="Pastors not subbmitted"
          icon={FaFile}
          navigation_path="/dashboard"
        />
        {/* <ResultCards
          title="No. of Reports Form"
          // result="1,381"
          // incomplete="463"
          description="Pastors not assigned"
          icon={FaUserTie}
          navigation_path="/dashboard"
        /> */}
        <ResultCards
          title="No. of Church"
          result={
            ChurchLoading ? <LoadingAnimation2 /> : ChurchCount?.total_churches
          }
          // incomplete="14"
          // description="Church not assigned"
          icon={FaChurch}
          navigation_path="/dashboard"
        />
      </div>

      {/* ============================ First Table ============================ */}

      <div className="w-full p-4 mt-2">
        <div className="bg-sixth-light dark:bg-sixth-dark shadow-lg rounded-[10px] custom-scrollbar">
          <SubmittedFormOverview />
        </div>
      </div>

      <div className="w-full p-4 mt-2">
        <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
          <AssignmentLogsOverview />
        </div>
      </div>

      <div className="w-full p-4 mt-2">
        <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
          <PendingUserOverview />
        </div>
      </div>
      <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
        © Copyright reserve Friend Foundation Management System 2024
      </p>
    </div>
  );
};

export default AdminDashboard;
