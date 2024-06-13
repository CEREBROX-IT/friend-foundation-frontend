import { FC } from "react";
import BackgroundImage from "../../../assets/authentication/background_image.webp";
import SdaIcon from "../../../assets/white_sda_icon.webp";
import SampleLogo from "../../../assets/authentication/sample_logo.webp";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingAnimation from "../../../components/loading-animation";
import { ForgotPasswordPayload } from "../../../redux/type/Type";
import { useAuthForgotPasswordMutation } from "../../../redux/services/AuthenticationApi";

interface RegisterScreenProps {
  handleOpenRegister: () => void;
}

const ResetPassword: FC<RegisterScreenProps> = ({ handleOpenRegister }) => {
  const [ForgotPassword, { isLoading, isError, isSuccess }] =
    useAuthForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>();

  const onSubmitHandler: SubmitHandler<ForgotPasswordPayload> = async (
    data
  ) => {
    await ForgotPassword(data)
      .unwrap()
      .then(() => {
        reset()
      });
  };

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
          <h1 className="text-xl md:text-2xl font-bold text-primary-light">
            TROUBLE LOGGING IN?
          </h1>
          <p className=" text-primary-dark">
            Enter your email and we will send you a link to get back your
            account.
          </p>
        </div>
        <form
          className="w-full flex flex-col items-center mt-10"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
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
          <div className="w-full mt-[15px]">
            {isError ? (
              <p className="text-sm text-red-600">Email doesn't exist</p>
            ) : (
              ""
            )}
            {isSuccess ? (
              <p className="text-sm font-bold">
                Please check your email account, thank you.
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
          >
            {isLoading ? (
              <div className="w-full flex justify-center">
               
                <LoadingAnimation message="Verifying email, please wait!" />
              </div>
            ) : (
              "Reset Password"
            )}
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
