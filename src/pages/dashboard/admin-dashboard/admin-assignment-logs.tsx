import Header from "../../../components/header";
import AllAssignmentLogsOverview from "../../../components/admin-components/admin-all-assignment-logs-overview";
const AdminAssignmentLogs = () => {
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto`}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          ASSIGNMENT LOGS
        </p>
      </div>

      <div className="flex-1 w-full px-4 absolute translate-y-32">
        <div className="bg-white p-4 rounded-[10px] dark:bg-fourth-dark">
          <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
            <AllAssignmentLogsOverview />
          </div>
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
          © Copyright reserve Friend Foundation Management System 2024
        </p>
      </div>
    </div>
  );
};

export default AdminAssignmentLogs;
