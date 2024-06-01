import DistrictOverview from "../../../components/admin-components/district-overview";
import Header from "../../../components/header";
import { MenuItem, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  pastor_not_assigned: string;
  district_available: string;
}
const AdminDistrictAssignment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>();
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto `}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          DISTRICT ASSIGNMENT
        </p>
      </div>

      <div className="flex-1 w-full px-4 absolute translate-y-32">
        <div className="max-w-full bg-white p-4 rounded-[10px] dark:bg-fourth-dark ">
          <p className="text-sm ml-2 mb-4 dark:text-white">
            Assign Pastor as a District Head
          </p>
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center  mb-4">
            <div className="flex flex-col md:flex-row gap-2 border-white lg:min-w-96 min-w-full">
              <TextField
                type="text"
                placeholder="Pastor not assign"
                select
                error={errors.pastor_not_assigned ? true : false}
                {...register("pastor_not_assigned")}
                className="w-full bg-fourth-light rounded-[10px]"
                InputProps={{
                  sx: {
                    height: "45px",
                    lineHeight: "normal",
                    borderRadius: "10px",
                  },
                }}
              >
                <MenuItem value="Male">
                  <p className="text-slate-500 text-sm">John Ray D. Canete</p>
                </MenuItem>
                <MenuItem value="Female">
                  <p className="text-slate-500 text-sm">Jannine Canete</p>
                </MenuItem>
              </TextField>
              <TextField
                type="text"
                placeholder="District Available"
                select
                error={errors.district_available ? true : false}
                {...register("district_available")}
                className="w-full bg-fourth-light  rounded-[10px]"
                InputProps={{
                  sx: {
                    height: "45px",
                    lineHeight: "normal",
                    borderRadius: "10px",
                  },
                }}
              >
                <MenuItem value="Male">
                  <p className="text-slate-500 text-sm">District 1</p>
                </MenuItem>
                <MenuItem value="Female">
                  <p className="text-slate-500 text-sm">District 2</p>
                </MenuItem>
              </TextField>

            </div>
            <div>
              <button className="bg-secondary-light py-2 px-7 text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85">
                ASSIGN PASTOR
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 lg:gap-4  lg:absolute translate-y-5 mb-10">
            <button className="bg-secondary-light py-2 px-7  text-white dark:bg-white  dark:text-black  rounded-md  hover:opacity-85">
              ADD NEW DISTRICT
            </button>
            <button className="bg-[#B378FF] py-2 px-7 text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85">
              VACANT DISTRICT
            </button>
          </div>
          <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
            <DistrictOverview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDistrictAssignment;
