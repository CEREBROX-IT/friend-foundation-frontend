import Header from "../../../components/header";
import { FaFile } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import ResultCards from "../../../components/result-cards";
import DistrictOverview from "../../../components/head-district-components/district-dashboard-overview";
import { useGetChurchCountQuery, useGetFormSubmissionCountQuery } from "../../../redux/services/usersApi";
import LoadingAnimation2 from "../../../components/loading-animation2";
import JwtDecoder from "../../../utils/jwt-decoder";
const HeadDistrictDashboard = () => {
    console.log(JwtDecoder().decodedToken);

  const { data: ChurchCount, isLoading: ChurchLoading } = useGetChurchCountQuery();
  const {data: FormSubmission, isLoading:FormSubmissionLoading} = useGetFormSubmissionCountQuery()
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
          // incomplete={userCount?.pending_user}
          // description="Total Churches"
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
          navigation_path="/dashboard/form-submission"
        />
      </div>

      <div className="w-full p-4 mt-4">
        <div className="bg-sixth-light dark:bg-sixth-dark shadow-lg rounded-[10px] custom-scrollbar">
          <DistrictOverview />
        </div>
      </div>
      <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
        © Copyright reserve Friend Foundation Management System 2024
      </p>
    </div>
  );
};

export default HeadDistrictDashboard;
