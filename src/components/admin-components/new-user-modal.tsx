import { useState, FC, useEffect } from "react";
import SampleLogo from "../../assets/authentication/sample_logo.webp";
import { useForm, SubmitHandler } from "react-hook-form";
import { MenuItem, TextField, InputAdornment, IconButton } from "@mui/material";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

interface IFormInput {
  firstname: string;
  lastname: string;
  middlename: string;
  suffix: string;
  position: string;
  birthday: string;
  gender: string;
  password: string;
  confirm_password: string;
}

interface NewUserModalProps {
  closeUserModal: () => void
}

const NewUserModal: FC<NewUserModalProps> = ({ closeUserModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassowrd = () => setShowConfirmPassword((prevValue) => !prevValue);

  const onSubmitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    AOS.init({

      
      
    });
    
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center md:items-start backdrop-brightness-50 overflow-y-hidden  ">
      <div
        className=" max-h-[90vh] md:max-h-[100vh] max-w-[450px] dark:bg-fourth-dark dark:text-white  bg-white  rounded-[10px]  p-4 mx-4 fixed top-0 "
        // data-aos="fade-down"
        // data-aos-duration="200"
      >
        <div className="flex justify-end" onClick={closeUserModal}>
          <IoMdCloseCircle className="text-4xl cursor-pointer" />
        </div>

        <img
          src={SampleLogo}
          className="w-[180px] mb-[20px] mx-auto"
          alt="Logo"
        />

        <form
          className="w-full flex flex-col items-center overflow-auto custom-scrollbar max-h-[400px]"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="w-full mt-[10px] rounded-full ">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span>First Name</span>
            </div>
            <TextField
              type="text"
              placeholder="first name"
              error={errors.firstname ? true : false}
              {...register("firstname", {
                required: "Firstname is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Invalid firstname",
                },
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
            {errors.firstname && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.firstname.message}
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
              error={errors.lastname ? true : false}
              {...register("lastname", {
                required: "Last Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid Last name",
                },
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
            {errors.lastname && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.lastname.message}
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
                error={errors.middlename ? true : false}
                {...register("middlename", {
                  required: "Middle Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Middle Name",
                  },
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
              {errors.middlename && (
                <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                  {errors.middlename.message}
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
                  required: "Required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid",
                  },
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
              {errors.suffix && (
                <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                  {errors.suffix.message}
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
              error={errors.position ? true : false}
              {...register("position", {
                required: "Position is required",
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
            {errors.position && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.position.message}
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
                error={errors.birthday ? true : false}
                {...register("birthday", {
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
              {errors.birthday && (
                <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                  {errors.birthday.message}
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
              className="w-full bg-fourth-light rounded-[10px]"
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
              className="w-full bg-fourth-light rounded-[10px]"
              InputProps={{
                sx: {
                  height: "45px",
                  lineHeight: "normal",
                  borderRadius: "10px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassowrd}>
                      {showConfirmPassword ? (
                        <IoEyeOutline />
                      ) : (
                        <IoEyeOffSharp />
                      )}
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
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUserModal;
