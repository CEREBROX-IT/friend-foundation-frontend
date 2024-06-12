import { FC } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { LuFileEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useDeleteFormMutation } from "../../redux/services/usersApi";
import AdminEditForm from "./admin-edit-form";

interface CardsProps {
  Title: string;
  Description?: string;
  attachfile?: string;
  status?: string;
  total: string;
  id: number;
  handleDelete : () => void
  handleUpdate: () => void
 
}


const FormCard: FC<CardsProps> = ({
  Title,
  Description,
  attachfile,
  status,
  total,
  handleDelete,
  handleUpdate
 
}) => {


  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-evenly self-end w-32 h-10 bg-fourth-dark border-l-2 border-t-2 border-r-2">
        <button onClick={handleDelete}>
          <MdDelete className="text-white text-3xl" />
        </button>
        <button onClick={handleUpdate}>
          <LuFileEdit className="text-white text-2xl" />
        </button>
      </div>
      <div className="flex flex-col justify-between min-h-[200px] max-h-[150px] w-full bg-fourth-dark text-white p-2 shadow-fourth-light border-2 mb-4 overflow-y-auto">
        <div className="flex justify-between ">
          <div>
            <h1 className="font-bold">{Title}</h1>
            <h2 className=" lg:max-w-[500px] text-wrap">{Description}</h2>
          </div>
          <h3 className="hidden md:block text-sm underline font-semibold">
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
