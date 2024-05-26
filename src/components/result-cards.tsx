import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface CardsProps {
  title: string;
  result: string;
  incomplete: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  navigation_path: string;
}

const ResultCards: FC<CardsProps> = ({
  title,
  result,
  incomplete,
  description,
  icon: Icon,
  navigation_path,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative md:flex-1 w-full md:min-w-[200px] lg:w-0 bg-sixth-light dark:bg-sixth-dark rounded-[10px] dark:text-white shadow-md p-4 cursor-pointer
               border-b-[5px] border-sixth-light dark:border-sixth-dark hover:border-secondary-light dark:hover:border-secondary-dark hover:scale-105 duration-300"
      onClick={() => {
        navigate(navigation_path);
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-[18px]">{title}</p>
        <div className="bg-[#ECC1FB] p-2 rounded-md">
          <Icon className="text-[30px] text-[#DC78FF]" />
        </div>
      </div>
      <p className="font-bold text-[35px]">{result}</p>
      <p className="text-[14px] mt-2 text-[#646464] dark:text-white">
        <span className="bold text-black dark:text-white">{incomplete}</span>{" "}
        {description}
      </p>
    </div>
  );
};

export default ResultCards;
