import Header from "../../../components/header";
import ChurchOverview from "../../../components/admin-components/church-overview";
import { MenuItem, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import AddChurchModal from "../../../components/admin-components/add-churhc-modal";
import {
  useGetUnassignedChurchQuery,
  usePostUpdateChurchMutation,
} from "../../../redux/services/usersApi";
import { useFetchUnassignedUserQuery } from "../../../redux/services/UserApi";
import { useFetchChurchListAdminQuery } from "../../../redux/services/ChurchApi";
interface IFormInput {
  pastor_assign: number;
  church_name: string;
}
const AdminChurchAssignment = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: ChurchList } = useFetchChurchListAdminQuery();
  const { data: UnAssignedChurch } = useGetUnassignedChurchQuery()
  const { data: Unassgined } = useFetchUnassignedUserQuery();
  const [updateChurch] = usePostUpdateChurchMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>();

  const watchValues = watch();
  const { pastor_assign, church_name } = watchValues;
  const isDisabled = !pastor_assign || !church_name;

  const onSubmitHandler: SubmitHandler<IFormInput> = async (data) => {
    const filter =
      ChurchList?.data.filter((item) => item.church_name === data.church_name) || [];
    
    const value = {
      district_id: filter[0]?.district_id, //automatic na mo add sa name sa distrtict
      church_name: filter[0]?.church_name,
      pastor_assign: data.pastor_assign, //automatic na mo add sa full name sa user || "" for null value
      church_date_establish: filter[0]?.church_date_establish,
      church_address: filter[0].church_address,
    };

    console.log(value)

    await updateChurch({ id: filter[0]?.id, data: value })
      .unwrap()
      .then((response) => {
        reset();
        console.log(response);
      });
  };

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto `}
    >
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          CHURCH ASSIGNMENT
        </p>
      </div>

      <div className="flex-1 w-full px-4 absolute translate-y-32">
        <div className="max-w-full bg-white p-4 rounded-[10px] dark:bg-fourth-dark ">
          <p className="text-lg font-bold ml-2 mb-4 dark:text-white">
            Assign Pastor as Pastor Head
          </p>
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center  mb-4 ">
            <div className="flex flex-col flex-1 md:flex-row gap-2 border-white lg:min-w-96 min-w-full">
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="w-full flex flex-col lg:flex-row  justify-between  gap-2"
              >
                <div className="flex flex-col md:flex-row  lg:w-1/2 gap-4">
                  <TextField
                    type="text"
                    label="Select One"
                    select
                    error={errors.pastor_assign ? true : false}
                    {...register("pastor_assign")}
                    className="w-full bg-fourth-light rounded-[10px]"
                    InputProps={{
                      sx: {
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <p className="text-slate-500 text-sm">
                        {Unassgined?.data.length === 0
                          ? "No Pastor Available"
                          : "Select Pastor"}
                      </p>
                    </MenuItem>
                    {Unassgined?.data?.map((item) => (
                      <MenuItem value={item.id}>
                        <p className="text-slate-500 text-sm">
                          {item.full_name}
                        </p>
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    type="text"
                    label="Select One"
                    placeholder="District Available"
                    select
                    error={errors.church_name ? true : false}
                    {...register("church_name")}
                    className="w-full bg-fourth-light  rounded-[10px]"
                    InputProps={{
                      sx: {
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <p className="text-slate-500 text-sm">
                        {UnAssignedChurch?.data.length === 0
                          ? "No Church Available"
                          : "Select Church"}
                      </p>
                    </MenuItem>
                    {UnAssignedChurch?.data?.map((item) => (
                      <MenuItem value={item}>
                        <p className="text-slate-500 text-sm">
                          {item}
                        </p>
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <button
                  className="bg-[#B378FF] py-2 px-7 max-h-[50px]   lg:w-[200px] text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
                  type="submit"
                  disabled={isDisabled}
                >
                  ASSIGN PASTOR
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 lg:gap-4  lg:absolute translate-y-5 mb-10">
            <button
              className="bg-secondary-light py-2 px-7  text-white dark:bg-white  dark:text-black  rounded-md  hover:opacity-85"
              onClick={handleOpen}
            >
              ADD NEW CHURCH
            </button>
          </div>
          <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
            <ChurchOverview />
          </div>
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
          © Copyright reserve Friend Foundation Management System 2024
        </p>
        {openModal && <AddChurchModal closeModal={handleClose} />}
      </div>
    </div>
  );
};

export default AdminChurchAssignment;
