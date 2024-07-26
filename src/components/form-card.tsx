import  { FC } from "react";
import { MdDeleteForever } from "react-icons/md";
import JwtDecoder from "../utils/jwt-decoder";
interface FormCardModal {
  title: string;
  description: string;
  status?: string;
  deadline?: string;
  date_created?: string | null;
  total?: string
  card_click?: () => void;
  delete_click?: () => void
  edit_click? : () => void
}
const FormCard: FC<FormCardModal> = ({
  title,
  description,
  status,
  deadline,
  total,
  card_click,
  delete_click,
  
}) => {
  const decodeData = JwtDecoder().decodedToken
  const role = decodeData?.role
  const formatDate = (isoDateString: any ): string => {
    const date = new Date(isoDateString);
    // Extracting year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const day = date.getDate().toString().padStart(2, "0");
    // Constructing the date string
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(deadline);

  return (
    <div className="flex flex-col md:flex-row">
        <div
        className="flex flex-col justify-between min-h-48 w-full bg-fourth-light p-2 cursor-pointer shadow-sm shadow-black"
        onClick={card_click}
      >
        <div className="flex justify-between">
          <div>
            <h1 className="text-lg font-semibold uppercase">{title}</h1>
            <h2 className="text-sm text-gray-600">{description}</h2>
          </div>
          <h3 className="uppercase ">
            {status}
          </h3>
        </div>
      <div className="flex justify-between">
        <h4 className="text-sm text-red-600 font-bold">
          <span>Deadline: </span>({formattedDate})
        </h4>
          <h1>{total}</h1>
      </div>
        
      </div>
     {role === "Admin" &&  <div className="flex md:flex-col md:w-10 min-h-full flex flex-col ">
      <div className="h-full flex flex-col justify-center py-2 items-center bg-red-600 cursor-pointer" onClick={delete_click}>
        <MdDeleteForever className="text-2xl text-white"/>
      </div>
      {/* <div className="h-1/2 flex flex-col items-center  py-2 justify-center bg-blue-600 border-t-4 cursor-pointer" >
        <FaRegEdit className="text-2xl text-white"/>
      </div> */}
      </div>}
    </div>
    
  );
};

export default FormCard;
