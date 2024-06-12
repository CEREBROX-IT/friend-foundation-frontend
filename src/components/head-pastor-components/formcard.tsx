import { FC } from "react";
import { FaFilePdf } from "react-icons/fa6";

interface CardsProps {
  Title: string;
  Description?: string;
  attachfile?: string;
  status?: string;
  total: string;
  id: number;
  clickcard : () => void
}

const FormCard: FC<CardsProps> = ({
  Title,
  Description,
  attachfile,
  status,
  total,
  clickcard
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between cursor-pointer min-h-[200px] max-h-[150px] w-full bg-fourth-dark text-white p-2 shadow-fourth-light border-2 mb-4 overflow-y-auto" onClick={clickcard}>
        <div className="flex justify-between ">
          <div>
            <h1 className="font-bold">{Title}</h1>
            <h2 className=" lg:max-w-[500px] text-wrap">{Description}</h2>
          </div>
          <h3 className="hidden md:block text-sm underline font-semibold uppercase">
            STATUS : {status}
          </h3>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2 mb-2">
            {attachfile ? (
              <>
                <a
                  href={attachfile}
                  download
                  className="flex items-center space-x-1"
                >
                  <FaFilePdf className="w-6 h-6" />{" "}
                  {/* Render the PDF file icon */}
                  <span className="font-bold">Download Attachment</span>
                </a>
              </>
            ) : (
              ""
            )}
          </div>
          <p className="hidden md:block text-sm">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
