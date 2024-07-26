import { FC } from "react";

interface FormCardModal {
  title: string;
  description: string;
  status: string;
  deadline?: string;
  date_created?: string | null;
  remarks?: string | null;
  card_click?: () => void;
}
const FormCardRemarks: FC<FormCardModal> = ({
  title,
  description,
  status,
  remarks,
  card_click,
}) => {
 

  return (
    <div
      className="flex flex-col justify-between min-h-48 w-full bg-fourth-light p-2 cursor-pointer shadow-sm shadow-black"
      onClick={card_click}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-black uppercase">{title}</h1>
          <h2 className="text-sm font-semibold">{description}</h2>
        </div>
        <h3 className="uppercase font-semibold">
          <span>STATUS : </span>
          {status}
        </h3>
      </div>
    
      <p>Remarks: {remarks}</p>
    </div>
  );
};

export default FormCardRemarks;
