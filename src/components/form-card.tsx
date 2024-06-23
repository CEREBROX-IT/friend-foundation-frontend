import  { FC } from "react";

interface FormCardModal {
  title: string;
  description: string;
  status: string;
  deadline: string;
  date_created?: string | null;
  card_click?: () => void;
}
const FormCard: FC<FormCardModal> = ({
  title,
  description,
  status,
  deadline,
  date_created,
  card_click,
}) => {
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
  const formattedDateCreate = formatDate(date_created);

  return (
    <div
      className="flex flex-col justify-between min-h-48 w-full bg-fourth-light p-2 cursor-pointer"
      onClick={card_click}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <h2 className="text-sm font-semibold">{description}</h2>
        </div>
        <h3 className="uppercase font-semibold">
          <span>STATUS : </span>
          {status}
        </h3>
      </div>
      <h4 className="text-lg text-red-600 font-bold">
        ({formattedDate}) - ({formattedDateCreate === null  ? "" : formattedDateCreate})
      </h4>
    </div>
  );
};

export default FormCard;
