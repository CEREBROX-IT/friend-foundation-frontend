import Header from "../../../components/header";
import ChurchOverview from "../../../components/admin-components/church-overview";
import { MenuItem, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import AddChurchModal from "../../../components/admin-components/add-churhc-modal";
import {
  useGetChurchListQuery,
  useGetUnassignedUserQuery,
  usePostUpdateChurchMutation,
} from "../../../redux/services/usersApi";

interface IFormInput {
  pastor_assign: number;
  church_name: string;
}
const AdminChurchAssignment = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: ChurchList } = useGetChurchListQuery();
  const { data: Unassgined } = useGetUnassignedUserQuery();
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
      ChurchList?.filter((item) => item.church_name === data.church_name) || [];

    const value = {
      district_id: filter[0]?.id, //automatic na mo add sa name sa distrtict
      church_name: filter[0]?.church_name,
      pastor_assign: data.pastor_assign, //automatic na mo add sa full name sa user || "" for null value
      church_date_establish: filter[0]?.church_date_establish,
      church_address: filter[0].church_address,
    };

    await updateChurch({ id: filter[0]?.id, data: value })
      .unwrap()
      .then(() => {
        reset();
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
          <p className="text-sm ml-2 mb-4 dark:text-white">
            Assign Pastor as Pastor Head
          </p>
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center  mb-4 ">
            <div className="flex flex-col flex-1 md:flex-row gap-2 border-white lg:min-w-96 min-w-full">
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="w-full flex flex-col lg:flex-row  justify-between  gap-2"
              >
                <div className="flex flex-col w-full">
                  <div>Pastor Name</div>
                  <TextField
                    type="text"
                    placeholder="Pastor not assign"
                    select
                    error={errors.pastor_assign ? true : false}
                    {...register("pastor_assign")}
                    className="w-full bg-fourth-light rounded-[10px]"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {Unassgined?.data?.map((item) => (
                      <MenuItem value={item.id}>
                        <p className="text-slate-500 text-sm">
                          {item.full_name}
                        </p>
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="flex flex-col w-full">
                  <h1>Church Name</h1>
                  <TextField
                    type="text"
                    placeholder="District Available"
                    select
                    error={errors.church_name ? true : false}
                    {...register("church_name")}
                    className="w-full bg-fourth-light  rounded-[10px]"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {ChurchList?.map((item) => (
                      <MenuItem value={item.church_name}>
                        <p className="text-slate-500 text-sm">
                          {item.church_name}
                        </p>
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <button
                  className="bg-[#B378FF] py-2 px-7 max-h-[50px] lg:mt-6  lg:w-[400px] text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
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
