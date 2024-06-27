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
  deadline,
  remarks,
  card_click,
}) => {
  // const formatDate = (isoDateString: any): string => {
  //   const date = new Date(isoDateString);
  //   // Extracting year, month, and day
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  //   const day = date.getDate().toString().padStart(2, "0");
  //   // Constructing the date string
  //   return `${year}-${month}-${day}`;
  // };

  // const formattedDate = formatDate(deadline);
  // const formattedDateCreate = formatDate(date_created);

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
      {/* <h4 className="text-sm text-red-600 font-sans">
        <span>Deadline: </span>({formattedDate})
      </h4> */}
      <p>Remarks: {remarks}</p>
    </div>
  );
};

export default FormCardRemarks;
