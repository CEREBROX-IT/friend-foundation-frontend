import { FC } from "react";
import Header from "../../../components/header";
import AdminCards from "../../../components/admin-components/admin-cards";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUserTie, FaFile, FaChurch } from "react-icons/fa6";

const AdminDashboard: FC = () => {
  return (
    <div className="relative flex flex-col w-full bg-fourth-light overflow-y-scroll">
      <Header />
      <div className="w-full h-[200px] bg-primary-light p-4">
        <p className="text-sixth-light font-semibold text-[25px]">
          HQ MIS DASHBOARD
        </p>
      </div>
      <div className="flex flex-wrap flex-row gap-4 px-4 mt-[-7.5rem]">
        <AdminCards
          title="No. of Users"
          result="2,210"
          incomplete="463"
          description="Pending User"
          icon={HiMiniUsers}
          navigation_path="/dashboard/users"
        />
        <AdminCards
          title="Form Submission"
          result="731"
          incomplete="211"
          description="Pastors not subbmitted"
          icon={FaFile}
          navigation_path="/dashboard"
        />
        <AdminCards
          title="No. of Pastors"
          result="1,381"
          incomplete="463"
          description="Pastors not assigned"
          icon={FaUserTie}
          navigation_path="/dashboard"
        />
        <AdminCards
          title="No. of Church"
          result="441"
          incomplete="14"
          description="Church not assigned"
          icon={FaChurch}
          navigation_path="/dashboard"
        />
      </div>

      {/* ============================ First Table ============================ */}
    </div>
  );
};

export default AdminDashboard;
