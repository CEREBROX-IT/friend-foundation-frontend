import { FC } from "react";
import Header from "../../../components/header";
import ResultCards from "../../../components/result-cards";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUserTie, FaFile, FaChurch } from "react-icons/fa6";
import SubmittedFormOverview from "../../../components/admin-components/submitted-forms-overview";
import AssignmentLogsOverview from "../../../components/admin-components/assignment-logs-overview";
import PendingUserOverview from "../../../components/admin-components/pending-user-overview";

const AdminDashboard: FC = () => {
  

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
          result="2,210"
          incomplete="463"
          description="Pending User"
          icon={HiMiniUsers}
          navigation_path="/dashboard/users"
        />
        <ResultCards
          title="Form Submission"
          result="731"
          incomplete="211"
          description="Pastors not subbmitted"
          icon={FaFile}
          navigation_path="/dashboard"
        />
        <ResultCards
          title="No. of Pastors"
          result="1,381"
          incomplete="463"
          description="Pastors not assigned"
          icon={FaUserTie}
          navigation_path="/dashboard"
        />
        <ResultCards
          title="No. of Church"
          result="441"
          incomplete="14"
          description="Church not assigned"
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
