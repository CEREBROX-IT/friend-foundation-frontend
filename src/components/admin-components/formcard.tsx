import { FC } from "react";
import { HiDocumentDownload } from "react-icons/hi"; // Import the PDF file icon

interface CardsProps {
  Title: string;
  Description?: string;
  attachfile?: string;
  status?: string;
  total: string;
}

const FormCard: FC<CardsProps> = ({
  Title,
  Description,
  attachfile,
  status,
  total,
}) => {
  return (
    <div className="flex flex-col justify-between min-h-[150px] w-full bg-fourth-light p-2 shadow-fourth-light border-2 mb-4">
      <div className="flex justify-between font-bold">
        <div>
          <h1>{Title}</h1>
          <h2>{Description}</h2>
        </div>
        <h3 className="hidden md:block text-sm">STATUS : {status}</h3>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 mb-2">
          {attachfile ? (
            <>
              {" "}
              <span className="font-semibold">File:</span>
              <a
                href={attachfile}
                download
                className="flex items-center space-x-1"
              >
                <HiDocumentDownload className="w-6 h-6" />{" "}
                {/* Render the PDF file icon */}
                <span>Click to download</span>
              </a>
            </>
          ) : (
            ""
          )}
        </div>
        <p className="hidden md:block text-sm">{total}</p>
      </div>
    </div>
  );
};

export default FormCard;
