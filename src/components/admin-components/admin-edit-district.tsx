import { FC, useEffect } from "react";
import SampleLogo from "../../assets/authentication/sample_logo.webp";
import { useForm, SubmitHandler} from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import LoadingAnimation from "../loading-animation";
import { useUpdateDistrictMutation } from "../../redux/services/DistrictApi";
import { UpdateDistrict } from "../../redux/type/Type";
import { useFetchUnassignedUserQuery } from "../../redux/services/UserApi";



interface NewDistrictModalProps {
  closeDistrictModal: () => void;
  data: any
}

const AdminEditDistrict: FC<NewDistrictModalProps> = ({closeDistrictModal, data}) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateDistrict>();

  const [newDistrict, {isLoading}] = useUpdateDistrictMutation()
  const { data: UnAssignedData } = useFetchUnassignedUserQuery();

  const onSubmitHandler: SubmitHandler<UpdateDistrict> = async (
    values
  ) => {
    
    await newDistrict({ id: data.id, data: values })
      .unwrap()
      .then(() => {
        closeDistrictModal();
      });
  };

  useEffect(() => {
    setValue("union_conference", data.union_conference)
    setValue("district_name", data.district_name)
    setValue("date_establish", new Date(data.date_establish).toISOString().split('T')[0]);
    setValue("head_district_assign", data.head_district_assign)
    setValue("district_region", data.district_region)
    setValue("district_province", data.district_province)
    setValue("district_municipal", data.district_municipal)
    setValue("headquarters_address", data.headquarters_address)

  }, [data])

  


  return (
    <div className="absolute inset-0 flex flex-1 justify-center backdrop-brightness-50  z-20">
      <div className=" h-max pb-10  max-w-[350px] lg:min-w-[400px] w-96 dark:bg-fourth-dark dark:text-white  bg-white  rounded-[10px]  p-4 mx-4  ">
        <div className="flex justify-end" onClick={closeDistrictModal}>
          <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
        </div>

        <img
          src={SampleLogo}
          className="w-[180px] mb-[20px] mx-auto"
          alt="Logo"
        />

        <form
          className="w-full flex flex-col overflow-auto custom-scrollbar max-h-[400px] "
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className=" mt-[10px]">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span>Union Conference</span>
            </div>
            <TextField
              type="text"
              error={errors.union_conference ? true : false}
              {...register("union_conference", {
                required: "Union Conference is required",
              })}
              className="w-full bg-fourth-light"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            />
            {errors.union_conference && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.union_conference.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[10px] rounded-full ">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span>District Name</span>
            </div>
            <TextField
              type="text"
              error={errors.district_name ? true : false}
              {...register("district_name", {
                required: "District Name is required",
              })}
              className="w-full bg-fourth-light rounded-[10px]"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            />
            {errors.district_name && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.district_name.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>Date Establish</span>
            </div>
            <TextField
              type="date"
              error={errors.date_establish ? true : false}
              {...register("date_establish", {
                required: "Date Establish is required",
              })}
              className="w-full bg-fourth-light rounded-[10px]"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            />
            {errors.date_establish && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.date_establish.message}
              </p>
            )}
          </div>

          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>District Head</span>
            </div>
            <TextField
              type="text"
              select
              label={data.head_district_full_name}
              error={errors.head_district_assign ? true : false}
              {...register("head_district_assign")}
              className="w-full bg-fourth-light"
              InputProps={{
                sx: {
                  
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            >
              {UnAssignedData?.data?.map((item) => (
                <MenuItem value={item.id}>
                  <p className="text-slate-500 text-sm">{item.full_name}</p>
                </MenuItem>
              ))}
            </TextField>
            {errors.head_district_assign && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.head_district_assign.message}
              </p>
            )}
          </div>

          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>District Region</span>
            </div>
            <TextField
              type="text"
              error={errors.district_region ? true : false}
              {...register("district_region", {
                required: "District Region is required",
              })}
              className="w-full bg-fourth-light rounded-[10px]"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            />
            {errors.district_region && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.district_region.message}
              </p>
            )}
          </div>

          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>District Province</span>
            </div>
            <TextField
              type="text"
              error={errors.district_province ? true : false}
              {...register("district_province", {
                required: "District Province is required",
              })}
              className="w-full bg-fourth-light rounded-[10px]"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            />
            {errors.district_province && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.district_province.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>District Municipal</span>
            </div>
            <TextField
              type="text"
              error={errors.district_municipal ? true : false}
              {...register("district_municipal", {
                required: "District Municipal is required",
              })}
              className="w-full bg-fourth-light"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            />
            {errors.district_municipal && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.district_municipal.message}
              </p>
            )}
          </div>
          <div className="flex w-full gap-2">
            <div className="w-full mt-[15px]">
              <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                <span>Headquarter Address</span>
              </div>
              <TextField
                type="text"
                error={errors.headquarters_address ? true : false}
                {...register("headquarters_address", {
                  required: "Birthday is required",
                })}
                className="w-full bg-fourth-light rounded-[10px]"
                InputProps={{
                  sx: {
                    height: "45px",
                    lineHeight: "normal",
                    borderRadius: "10px",
                  },
                }}
              />
              {errors.headquarters_address && (
                <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                  {errors.headquarters_address.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
          >
            <div className="w-full flex justify-center">
              {isLoading ? (
                <LoadingAnimation message="Updating, please wait!" />
              ) : (
                "Update District"
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditDistrict;
