import React, { FC, useState } from "react";
import SampleLogo from "../../../assets/authentication/sample_logo.webp";
import { useForm, SubmitHandler } from "react-hook-form";
import { MenuItem, TextField, InputAdornment, IconButton } from "@mui/material";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import LoadingAnimation from "../../../components/loading-animation";
import { RegisterUserPayload } from "../../../redux/type/Type";
import { useAuthRegisterMutation } from "../../../redux/services/AuthenticationApi";

interface RegisterScreenProps {
  handleBackToLogin: () => void;
}

const RegisterScreen: FC<RegisterScreenProps> = ({ handleBackToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<RegisterUserPayload>();
  const [Register, {isLoading}] = useAuthRegisterMutation()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassowrd = () =>
    setShowConfirmPassword((prevValue) => !prevValue);

  const onSubmitHandler: SubmitHandler<RegisterUserPayload> = async (data) => {
    await Register(data)
      .unwrap()
      .then(() => {
        handleBackToLogin();
        reset();
      });
  };

  return (
    <div
      data-aos="flip-left"
      className="z-20 relative flex flex-col items-center w-[90%] md:w-[450px] bg-white py-4 px-10 rounded-[20px] max-h-[600px]"
    >
      <img src={SampleLogo} className="w-[180px] mb-[20px]" alt="Logo" />

      <form
        className="w-full flex flex-col items-center overflow-y-auto custom-scrollbar"
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
        <div className="w-full mt-[10px]">
          <div className="flex flex-row px-1 text-[15px] mb-1">
            <span>First Name</span>
          </div>
          <TextField
            type="text"
            placeholder="first name"
            error={errors.first_name ? true : false}
            {...register("first_name", {
              required: "Firstname is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Invalid firstname",
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
          {errors.first_name && (
            <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
              {errors.first_name.message}
            </p>
          )}
        </div>
        <div className="w-full mt-[15px]">
          <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
            <span>Last Name</span>
          </div>
          <TextField
            type="text"
            placeholder="last name"
            error={errors.last_name ? true : false}
            {...register("last_name", {
              required: "Last Name is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Invalid Last name",
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
          {errors.last_name && (
            <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>Middle Name</span>
            </div>
            <TextField
              type="text"
              placeholder="middle name"
              error={errors.middle_name ? true : false}
              {...register("middle_name")}
              className="w-full bg-fourth-light"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
              }}
            />
            {errors.middle_name && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.middle_name.message}
              </p>
            )}
          </div>
          <div className="w-1/3 mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>Suffix</span>
            </div>
            <TextField
              type="text"
              placeholder="suffix"
              error={errors.suffix ? true : false}
              {...register("suffix", {
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid",
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
            {errors.suffix && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.suffix.message}
              </p>
            )}
          </div>
          <div className="w-1/3 mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>Age</span>
            </div>
            <TextField
              type="number"
              placeholder="Age"
              error={errors.age ? true : false}
              {...register("age", {
                valueAsNumber: true,
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
            {errors.age && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.age.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full mt-[15px]">
          <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
            <span>Title/Position (Ex. Pastor)</span>
          </div>
          <TextField
            type="text"
            placeholder="title/position"
            error={errors.title ? true : false}
            {...register("title", {
              required: "Position/Title is required",
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
          {errors.title && (
            <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="w-full mt-[15px]">
          <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
            <span>Contact Number</span>
          </div>
          <TextField
            type="number"
            placeholder="Contact Number"
            error={errors.contact_no ? true : false}
            {...register("contact_no", {
              required: "Contact Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Invalid Contact Number",
              },
              minLength: {
                value: 11,
                message: "Contact Number must be exactly 11 digits",
              },
              maxLength: {
                value: 11,
                message: "Contact Number must be exactly 11 digits",
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
          {errors.contact_no && (
            <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
              {errors.contact_no.message}
            </p>
          )}
        </div>
        <div className="flex w-full gap-2">
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>Birth Date</span>
            </div>
            <TextField
              type="date"
              placeholder="MM-DD-YY"
              error={errors.birth_date ? true : false}
              {...register("birth_date", {
                required: "Birthday is required",
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
            {errors.birth_date && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.birth_date.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>Gender</span>
            </div>
            <TextField
              type="text"
              placeholder="gender"
              select
              error={errors.gender ? true : false}
              {...register("gender", {
                required: "Gender is required",
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
              <MenuItem value="Male">
                <p className="text-slate-500 text-sm">Male</p>
              </MenuItem>
              <MenuItem value="Female">
                <p className="text-slate-500 text-sm">Female</p>
              </MenuItem>
            </TextField>
            {errors.gender && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full mt-[15px]">
          <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
            <span>Password</span>
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
        <div className="w-full mt-[15px]">
          <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
            <span>Confirm Password</span>
          </div>
          <TextField
            type={showConfirmPassword ? "text" : "password"}
            placeholder="confirm password"
            error={errors.confirm_password ? true : false}
            {...register("confirm_password", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className="w-full bg-fourth-light"
            InputProps={{
              sx: {
                height: "45px",
                lineHeight: "normal",
                borderRadius: "10px",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassowrd}>
                    {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffSharp />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
              {errors.confirm_password.message}
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
              "REGISTER"
            )}
          </div>
        </button>
      </form>

      <p className="mb-[30px] mt-[50px]">
        Already have an Account?{" "}
        <span
          className="hover:underline cursor-pointer text-secondary-light"
          onClick={handleBackToLogin}
        >
          click here
        </span>
      </p>
    </div>
  );
};

export default RegisterScreen;
