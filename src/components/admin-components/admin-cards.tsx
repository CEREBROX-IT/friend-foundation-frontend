import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdminCardsProps {
  title: string;
  result: string;
  incomplete: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  navigation_path: string;
}

const AdminCards: FC<AdminCardsProps> = ({
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
      className="relative md:flex-1 w-full md:min-w-[200px] lg:w-0 bg-sixth-light rounded-[10px] shadow-md p-4 cursor-pointer
                 border-b-[5px] border-sixth-light hover:border-secondary-light hover:scale-105 duration-300"
      onClick={() => {
        navigate(navigation_path);
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <p className="text-black font-bold text-[18px]">{title}</p>
        <div className="bg-[#ECC1FB] p-2 rounded-md">
          <Icon className="text-[30px] text-[#DC78FF]" />
        </div>
      </div>
      <p className="font-bold text-[35px]">{result}</p>
      <p className="text-[14px] mt-2 text-[#646464]">
        <span className="bold text-black">{incomplete}</span> {description}
      </p>
    </div>
  );
};

export default AdminCards;
