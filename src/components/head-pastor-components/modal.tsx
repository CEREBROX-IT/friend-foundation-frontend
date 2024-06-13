import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import { useGetChurchDistrictBelongQuery, useSubmitFormMutation } from "../../redux/services/usersApi";
import { report } from "process";

export interface CreateFormInput {
  report_form_id: number;
  district_belong: string;
  church_belong: string;
  response_file: FileList;
}

interface NewUserModalProps {
  closeForm: () => void;
  id?: number
}

const Modal: FC<NewUserModalProps> = ({ closeForm, id }) => {
  const {data: ChurchDistrctData} = useGetChurchDistrictBelongQuery() 
  const [submitForm] = useSubmitFormMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormInput>();

    const onSubmitHandler: SubmitHandler<CreateFormInput> = async (data) => {
       const formData = new FormData();
       formData.append("report_form_id", id?.toString() || "")
       formData.append("church_belong", ChurchDistrctData?.church_belong || "");
       formData.append("district_belong", ChurchDistrctData?.district_belong || "");
       formData.append("response_file", data.response_file[0]);

       await submitForm(formData).unwrap().then(() => {
        closeForm()
       })
    };

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-brightness-50 overflow-y-hidden">
      <div className="max-h-[90vh] md:max-h-[100vh] max-w-[600px] md:min-w-[600px] dark:bg-fourth-dark dark:text-white bg-white rounded-[10px] p-4 mx-4">
        <div className="flex justify-end " onClick={closeForm}>
          <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
        </div>

        <form
          className="w-full flex flex-col items-center overflow-auto custom-scrollbar max-h-[450px]"
            onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-bold">ATTACHMENT</span>
            </div>
            <TextField
              type="file"
              error={errors.response_file ? true : false}
              {...register("response_file", {
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
            {errors.response_file && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.response_file.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] self-end h-[45px]"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
