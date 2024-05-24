import { FC } from "react";
import BackgroundImage from "../../../assets/authentication/background_image.webp";
import SdaIcon from "../../../assets/white_sda_icon.webp";
import SampleLogo from "../../../assets/authentication/sample_logo.webp";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterScreenProps {
  handleOpenRegister: () => void;
}

interface IFormInput {
  email: string;
}
const ResetPassword: FC<RegisterScreenProps> = ({ handleOpenRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen overflow-x-hidden overflow-y-hidden  "
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <img
        src={SdaIcon}
        className="absolute z-10 top-0 left-0 w-[140px] md:w-[200px] mt-4 ml-4 "
      />
      <div
        data-aos="flip-right"
        className="z-20 relative flex flex-col items-center w-[90%] md:w-[450px] bg-white py-4 px-10 rounded-[20px] max-h-[90vh]"
      >
        <img src={SampleLogo} className="w-[180px] mb-[20px]" alt="Logo" />
        <div className="flex flex-col w-full gap-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-primary-light">TROUBLE LOGGING IN?</h1>
          <p className=" text-primary-dark">Enter your email and we will send you a link to get back your account.</p>
        </div>
        <form className="w-full flex flex-col items-center mt-10" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="w-full mt-[10px]">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span>Email Address</span>
            </div>
            <TextField
              type="email"
              placeholder="example@sample.com"
              error={errors.email ? true : false}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
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
            {errors.email && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
          >
            Reset Password
          </button>
        </form>

        <p className="mb-[30px] mt-[20px]">
          Don't have an account?{" "}
          <span
            className="hover:underline cursor-pointer text-secondary-light"
            onClick={handleOpenRegister}
          >
            click here
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
