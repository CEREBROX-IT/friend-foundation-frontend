import { FC } from "react";
import SampleLogo from "../../assets/authentication/sample_logo.webp";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import {
  useGetUnassignedUserQuery,
  useGetDistrictListQuery,
} from "../../redux/services/usersApi";
import { useCreateChurchMutation } from "../../redux/services/ChurchApi";
import { IoMdCloseCircle } from "react-icons/io";
import LoadingAnimation from "../loading-animation";
import { ChurchPayload } from "../../redux/type/Type";

export type ChurchDetails = {
  id?: number
  district_id?: number;
  church_name?: string;
  pastor_assign?: number;
  church_date_establish?: string;
  church_address?: string;
  head_pastor_full_name?: string;
  district_name?: string
};

interface NewDistrictModalProps {
  closeModal: () => void;
}

const AddChurchModal: FC<NewDistrictModalProps> = ({ closeModal }) => {
  const { data: Unassigned } = useGetUnassignedUserQuery();
  const { data: DistrictList } = useGetDistrictListQuery();
  const [CreateChurch, {isLoading}] = useCreateChurchMutation() 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChurchPayload>();

  const onSubmitHandler: SubmitHandler<ChurchPayload> = async (data) => {
    console.log(data);
    await CreateChurch(data)
      .unwrap()
      .then(() => {
        closeModal();
      });
  };

  return (
    <div className="absolute inset-0 flex  flex-1 justify-center backdrop-brightness-50  ">
      <div className=" max-h-[90vh] h-max pb-10 lg:min-w-[400px] w-96 dark:bg-fourth-dark dark:text-white  bg-white  rounded-[10px]  p-4 mx-4 fixed top-0  ">
        <div className="flex justify-end" onClick={closeModal}>
          <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
        </div>

        <img
          src={SampleLogo}
          className="w-[180px] mb-[20px] mx-auto"
          alt="Logo"
        />

        <form
          className="w-full flex flex-col overflow-auto  custom-scrollbar max-h-[400px] "
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className=" mt-[10px]">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span className="font-bold">DISTRICT NAME</span>
            </div>
            <TextField
              type="text"
              select
              error={errors.district_id ? true : false}
              {...register("district_id", {
                required: "District is required",
              })}
              className="w-full bg-fourth-light"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            >
              {DistrictList?.map((item) => (
                <MenuItem value={item.id}>{item.district_name}</MenuItem>
              ))}
            </TextField>
            {errors.district_id && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.district_id.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[10px] rounded-full ">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span className="font-bold">CHURCH NAME</span>
            </div>
            <TextField
              type="text"
              error={errors.church_name ? true : false}
              {...register("church_name", {
                required: "Church Name is required",
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
            {errors.church_name && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.church_name.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-bold">PASTOR ASSIGN (OPTIONAL)</span>
            </div>
            <TextField
              type="text"
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
              {Unassigned?.data.map((item) => (
                <MenuItem value={item.id}>{item.full_name}</MenuItem>
              ))}
            </TextField>

            {errors.pastor_assign && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.pastor_assign.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-bold">CHURCH ESTABLISHED</span>
            </div>
            <TextField
              type="date"
              error={errors.church_date_establish ? true : false}
              {...register("church_date_establish", {
                required: "Established date is required",
              })}
              className="w-full bg-fourth-light"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            ></TextField>
            {errors.church_date_establish && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.church_date_establish.message}
              </p>
            )}
          </div>

          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-bold">CHURCH ADDRESS</span>
            </div>
            <TextField
              type="text"
              error={errors.church_address ? true : false}
              {...register("church_address", {
                required: "Church Address is required",
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
            {errors.church_address && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.church_address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
          >
            <div className="w-full flex justify-center">
              {isLoading ? (
                <LoadingAnimation message="Registering, please wait!" />
              ) : (
                "ADD NEW CHURCH"
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChurchModal;
