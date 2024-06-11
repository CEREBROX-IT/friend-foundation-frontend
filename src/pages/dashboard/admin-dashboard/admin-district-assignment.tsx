import DistrictOverview from "../../../components/admin-components/district-overview";
import Header from "../../../components/header";
import { MenuItem, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import AddDistrictModal from "../../../components/admin-components/add-district-modal";
import { useState } from "react";
import {
  useGetUnassignedUserQuery,
  useGetDistrictListQuery,
  usePostUpdateDistrictMutation,
} from "../../../redux/services/usersApi";

interface IFormInput {
  head_district_assign: number;
  id: number;
}
const AdminDistrictAssignment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();
  const watchValues = watch();
  const { head_district_assign, id } = watchValues;
  const isDisabled = !head_district_assign || !id;

  const [openNewDistrictModal, setOpenNewDistrictModal] = useState(false);
  const [UpdateDistrict] = usePostUpdateDistrictMutation();
  const { data: UnAssignedUsers } = useGetUnassignedUserQuery();
  const { data: DistrictList } = useGetDistrictListQuery();
  const filter = DistrictList?.filter(
    (item) => item.head_district_assign === null
  );

  const onSubmitHandle: SubmitHandler<IFormInput> = async (data) => {
    const filter = DistrictList?.filter((item) => item.id === data.id) || [];

    const value = {
      union_conference: filter[0]?.union_conference,
      head_district_assign: data.head_district_assign,
      district_name: filter[0]?.district_name,
      date_establish: filter[0]?.date_establish,
      district_region: filter[0]?.district_region,
      district_province: filter[0]?.district_province,
      district_municipal: filter[0]?.district_municipal,
      headquarters_address: filter[0]?.headquarters_address,
    };

    await UpdateDistrict({ id: filter[0].id, data: value })
      .unwrap()
      .then((response) => console.log(response));
  };

  const handleOpenNewDistrictModal = () => {
    setOpenNewDistrictModal(true);
  };
  const handleCloseOpenNewDistrictModal = () => setOpenNewDistrictModal(false);
  return (
    <div
      className={`relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark ${
        openNewDistrictModal
          ? "overflow-hidden max-h-screen "
          : "overflow-y-auto"
      }`}
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
            Assign Pastor as District Head
          </p>
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center  mb-4">
            <div className="flex flex-col md:flex-row gap-2  lg:min-w-96 w-full ">
              <form
                onSubmit={handleSubmit(onSubmitHandle)}
                className="w-full flex flex-col lg:flex-row  justify-between  gap-2"
              >
                <TextField
                  type="text"
                  placeholder="Pastor not assign"
                  select
                  error={errors.head_district_assign ? true : false}
                  {...register("head_district_assign")}
                  className="w-full bg-fourth-light rounded-[10px]"
                  InputProps={{
                    sx: {
                      height: "45px",
                      lineHeight: "normal",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {UnAssignedUsers?.data?.map((item) => (
                    <MenuItem value={item.id}>
                      <p className="text-slate-500 text-sm">{item.full_name}</p>
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="text"
                  placeholder="District Available"
                  select
                  error={errors.id ? true : false}
                  {...register("id")}
                  className="w-full bg-fourth-light  rounded-[10px]"
                  InputProps={{
                    sx: {
                      height: "45px",
                      lineHeight: "normal",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {filter?.map((item) => (
                    <MenuItem value={item.id}>
                      <p className="text-slate-500 text-sm">
                        {item.district_name}
                      </p>
                    </MenuItem>
                  ))}
                </TextField>

                <button
                  className=" bg-secondary-light py-2 lg:w-[400px] text-white dark:bg-white  dark:text-black  rounded-md hover:opacity-85"
                  disabled={isDisabled}
                >
                  ASSIGN PASTOR
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 lg:gap-4  lg:absolute translate-y-5 mb-10">
            <button
              className="bg-[#B378FF] py-2 px-7  text-white dark:bg-white  dark:text-black  rounded-md  hover:opacity-85"
              onClick={handleOpenNewDistrictModal}
            >
              ADD NEW DISTRICT
            </button>
          </div>
          <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
            <DistrictOverview />
          </div>
        </div>
        <p className="px-4 mb-2 text-[14px] text-[#707070] text-center">
          © Copyright reserve Friend Foundation Management System 2024
        </p>
      </div>
      
        {openNewDistrictModal && (
          <AddDistrictModal
            closeDistrictModal={handleCloseOpenNewDistrictModal}
          />
        )}
      
    </div>
  );
};

export default AdminDistrictAssignment;
