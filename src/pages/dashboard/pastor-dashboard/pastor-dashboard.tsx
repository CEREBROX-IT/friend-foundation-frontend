import Header from "../../../components/header";
import { FaFile } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import ResultCards from "../../../components/result-cards";
import LoadingAnimation2 from "../../../components/loading-animation2";
import {
  useGetAnsweredFormrQuery,
  useGetUnansweredFormsQuery,
} from "../../../redux/services/usersApi";
import NoDataFound from "../../../../public/NoDataImage.png";
import FormCard from "../../../components/head-pastor-components/formcard";
import { useState } from "react";
import Modal from "../../../components/head-pastor-components/modal";
const PastorDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<number>()
  const constructDownloadLink = (relativePath: string) => {
    // Replace 'baseURL' with your actual base URL where files are stored
    const baseURL = "http://localhost:3000"; // Replace this with your base URL
    return `${baseURL}/${relativePath}`;
  };
  const { data: Answered, isLoading: AnswerLoading } =
    useGetAnsweredFormrQuery();
  const { data: Unanswered, isLoading: UnansweredLoading } =
    useGetUnansweredFormsQuery();

  const countAnswer = Answered?.length || 0;
  const countUnanswered = Unanswered?.length || 0;

  const handleClickCard = (id: number) => {
    setSelectedData(id)
    setOpenModal(true)

  };

  const handleCloseCard = () => setOpenModal(false)
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
          result={AnswerLoading ? <LoadingAnimation2 /> : countAnswer}
          icon={HiMiniUsers}
          navigation_path=""
        />
        <ResultCards
          title="Form Submission"
          result={UnansweredLoading ? <LoadingAnimation2 /> : countUnanswered}
          icon={FaFile}
          navigation_path=""
        />
      </div>

      <div className="w-full p-4 mt-4">
        <div className="bg-sixth-light dark:bg-sixth-dark shadow-lg rounded-[10px] custom-scrollbar">
          <div className="flex flex-col  justify-center  min-h-[80vh] lg:p-4">
            {Unanswered?.length === 0 ? (
              <>
                <img
                  src={NoDataFound}
                  className="aspect-square object-contain lg:w-72 select-none"
                />
              </>
            ) : (
              <>
                {Unanswered?.map((item: any) => (
                  <FormCard
                    Title={item.form_title}
                    clickcard={() => handleClickCard(item.id)}
                    Description={item.form_description}
                    status={item.status}
                    total={item.total}
                    id={item?.id}
                    attachfile={
                      item.attachment_file
                        ? constructDownloadLink(item.attachment_file)
                        : ""
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
        © Copyright reserve Friend Foundation Management System 2024
      </p>
      {openModal && <Modal closeForm={handleCloseCard}/>}
    </div>
  );
};

export default PastorDashboard;
