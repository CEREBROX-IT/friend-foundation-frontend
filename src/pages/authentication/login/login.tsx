import { FC, useState, useEffect } from "react";
import BackgroundImage from "../../../assets/authentication/background_image.webp";
import LeftPanel from "../../../assets/authentication/left_panel.webp";
import RightPanel from "../../../assets/authentication/right_panel.webp";
import SdaIcon from "../../../assets/white_sda_icon.webp";
import SampleLogo from "../../../assets/authentication/sample_logo.webp";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import RegisterScreen from "../registration/register";
import ResetPassword from "../reset-password/ResetPassword";
import { usePostLoginMutation } from "../../../redux/services/loginApi";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingAnimation from "../../../components/loading-animation";
import { Cookies } from "typescript-cookie";

interface IFormInput {
  email: string;
  password: string;
}


const LoginScreen: FC = () => {
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [animation, setAnimation] = useState("zoom-in");

  const [postLogin, { isLoading, isError }] = usePostLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();


const onSubmitHandler: SubmitHandler<IFormInput> = async (data) => {
  await postLogin(data).unwrap().then(response => {
    Cookies.set("token", response.token)
    console.log(response)
    window.location.href = "/dashboard";
  })
};


  const handleOpenRegister = () => {
    setAnimation("flip-right");
    setIsRegister(true);
    setIsResetPassword(false);
    // navigate("/register");
  };

  const handleOpenResetPassword = () => {
    setAnimation("flip-right");
    setIsResetPassword(true);
    // navigate("/reset/password");
  };

  const handleBackToLogin = () => {
    setAnimation("flip-right");
    setIsRegister(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, [isRegister]);

  return (
    <div
      className="parent-container relative flex-col items-center justify-center w-full h-screen overflow-x-hidden overflow-y-hidden"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <img
        src={SdaIcon}
        className="absolute z-10 top-0 left-0 w-[140px] md:w-[200px] mt-4 ml-4"
      />
      {isRegister ? (
        <RegisterScreen handleBackToLogin={handleBackToLogin} />
      ) : isResetPassword ? (
        <ResetPassword handleOpenRegister={handleOpenRegister}/>
      ) : (
        <div
          data-aos={animation}
          className="z-20 relative flex flex-col items-center w-[90%] md:w-[450px] bg-white py-4 px-10 rounded-[20px]"
        >
          <img src={SampleLogo} className="w-[180px] mb-[20px]" alt="Logo" />

          <form
            className="w-full flex flex-col items-center"
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
              <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                <span>Password</span>
                <span
                  className="hover:underline cursor-pointer text-secondary-light"
                  onClick={handleOpenResetPassword}
                >
                  Forgot Password?
                </span>
              </div>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="password"
                error={errors.password ? true : false}
                {...register("password", { required: "Password is required" })}
                className="w-full bg-fourth-light"
                InputProps={{
                  sx: {
                    height: "45px",
                    lineHeight: "normal",
                    borderRadius: "10px",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffSharp />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* {isLoading ? (
              <div className="w-full mt-[15px]">
                <LoadingAnimation message="Verifying, Please wait" />
              </div>
            ) : (
              ""
            )} */}
            {isError ? <p className="text-red-600 w-full text-sm">Invalid Credentials</p> : ""}
            <button
              type="submit"
              className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
            >
              {isLoading ? <div className="flex w-full justify-center"><LoadingAnimation /></div>: "SIGN IN"}
            </button>
          </form>

          <p className="mb-[30px] mt-[50px]">
            Don't have an account?{" "}
            <span
              className="hover:underline cursor-pointer text-secondary-light"
              onClick={handleOpenRegister}
            >
              click here
            </span>
          </p>
        </div>
      )}

      <div className="absolute w-full h-screen hidden xl:flex flex-row justify-between">
        <img
          src={LeftPanel}
          className="absolute lg:h-[90vh] lg:w-[60vh] top-0 left-0 mt-[-4rem] ml-[-4rem]"
          data-aos="fade-right"
        />
        <img
          src={RightPanel}
          className="absolute lg:h-[80vh] lg:w-[55vh] mt-[-5rem] right-0 bottom-0 mb-[-3rem]"
          data-aos="fade-left"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
