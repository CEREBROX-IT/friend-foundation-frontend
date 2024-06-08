import {  FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

interface IFormInput {
  title: string;
  description: string;
  formFile: FileList;
}

interface NewUserModalProps {
  closeForm: () => void;
}

const AdminAddForm: FC<NewUserModalProps> = ({ closeForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

   const onSubmitHandler: SubmitHandler<IFormInput> = (data) => {
     console.log("Form Data:", data);

     // Check if formFile is present
     if (data.formFile && data.formFile.length > 0) {
       const file = data.formFile[0];
       console.log("File:", file);
     } else {
       console.log("No file uploaded.");
     }
   };

  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-brightness-50 overflow-y-hidden">
      <div className="max-h-[90vh] md:max-h-[100vh] max-w-[600px] md:min-w-[600px] dark:bg-fourth-dark dark:text-white bg-white rounded-[10px] p-4 mx-4">
        <div className="flex justify-end" onClick={closeForm}>
          <IoMdCloseCircle className="text-4xl cursor-pointer" />
        </div>

        <form
          className="w-full flex flex-col items-center overflow-auto custom-scrollbar max-h-[450px]"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="w-full mt-[10px] rounded-full">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span>TITLE</span>
            </div>
            <TextField
              type="text"
              error={errors.title ? true : false}
              {...register("title", {
                required: "Title is required",
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
            {errors.title && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span>DESCRIPTION</span>
            </div>
            <TextField
              type="text"
              error={errors.description ? true : false}
              multiline
              minRows={2}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full bg-fourth-light rounded-[10px]"
            />
            {errors.description && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <TextField
              type="file"
              error={errors.formFile ? true : false}
              {...register("formFile", {
                required: "File is required",
                validate: {
                  validFileType: (value: FileList) => {
                    if (!value) return true; // Let the required validation handle empty files
                    const allowedTypes = [
                      "application/pdf",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ];
                    const isValid = Array.from(value).every((file) =>
                      allowedTypes.includes(file.type)
                    );
                    if (!isValid)
                      return "Invalid file format. Only PDF and Word documents are allowed.";
                    return true;
                  },
                },
              })}
              className="w-full bg-fourth-light rounded-[10px]"
              InputLabelProps={{ shrink: true }}
            />
            {errors.formFile && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.formFile.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] self-end h-[45px]"
          >
            ADD FORM
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddForm;
