import React, { FC } from "react";

interface FormCardModal {
  title: string;
  description: string;
  status: string;
  deadline: string;
}
const FormCard: FC<FormCardModal> = ({
  title,
  description,
  status,
  deadline,
}) => {
  const formatDate = (isoDateString: string): string => {
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
    <div className="flex flex-col justify-between min-h-48 w-full bg-fourth-light p-2">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <h2 className="text-sm font-semibold">{description}</h2>
        </div>
        <h3 className="uppercase font-semibold"><span>STATUS : </span>{status}</h3>
      </div>
      <h4 className="text-lg text-red-600 font-bold"><span className="uppercase mr-2">Deadline</span>({formattedDate})</h4>
    </div>
  );
};

export default FormCard;
