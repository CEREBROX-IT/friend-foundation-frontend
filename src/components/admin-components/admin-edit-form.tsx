import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import {
  useGetFormStatusQuery,
  useUpdateFormMutation,
} from "../../redux/services/usersApi";

export interface CreateFormInput {
  form_title: string;
  form_description: string;
  attachment_file: FileList;
  deadline: string;
}

interface NewUserModalProps {
  closeForm: () => void;
  id?: number;
}

const AdminEditForm: FC<NewUserModalProps> = ({ closeForm, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateFormInput>();

  const { data: FormStatus } = useGetFormStatusQuery();
  const [FormUpdate] = useUpdateFormMutation();
  const FilterFormData = FormStatus?.filter((item) => item?.id === id);

  const updateForm: SubmitHandler<CreateFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("form_title", data.form_title);
    formData.append("form_description", data.form_description);
    formData.append("attachment_file", data.attachment_file[0]);
    formData.append("deadline", data.deadline);
    await FormUpdate({ id: id, formData: formData })
      .unwrap()
      .then(() => {
        closeForm();
      });
  };

  useEffect(() => {
    if (FilterFormData && FilterFormData.length > 0) {
      setValue("form_title", FilterFormData[0].form_title);
      reset({ form_title: FilterFormData[0]?.form_title });
      setValue("form_description", FilterFormData[0].form_description);
      reset({ form_description: FilterFormData[0]?.form_description });
    }
  }, [id]);

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-brightness-50 overflow-y-hidden">
      <div className="max-h-[90vh] md:max-h-[100vh] max-w-[600px] md:min-w-[600px] dark:bg-fourth-dark dark:text-white bg-white rounded-[10px] p-4 mx-4">
        <div className="flex justify-end " onClick={closeForm}>
          <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
        </div>

        <form
          className="w-full flex flex-col items-center overflow-auto custom-scrollbar max-h-[450px]"
          onSubmit={handleSubmit(updateForm)}
        >
          <div className="w-full mt-[10px] rounded-full">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span className="font-bold">TITLE</span>
            </div>
            <TextField
              type="text"
              error={errors.form_title ? true : false}
              {...register("form_title", {
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
            {errors.form_title && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.form_title.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-bold">DESCRIPTION</span>
            </div>
            <TextField
              type="text"
              error={errors.form_description ? true : false}
              multiline
              minRows={2}
              {...register("form_description", {
                required: "Description is required",
              })}
              className="w-full bg-fourth-light rounded-[10px]"
            />
            {errors.form_description && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.form_description.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-bold uppercase">Deadline</span>
            </div>
            <TextField
              type="date"
              placeholder="MM-DD-YY"
              error={errors.deadline ? true : false}
              {...register("deadline", {
                required: "Deadline is required",
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
            {errors.deadline && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.deadline.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-bold">ATTACHMENT</span>
            </div>
            <TextField
              type="file"
              error={errors.attachment_file ? true : false}
              {...register("attachment_file", {
                validate: {
                  validFileType: (value: FileList) => {
                    if (!value || value.length === 0) return true;
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
            {errors.attachment_file && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.attachment_file.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] self-end h-[45px]"
          >
            UPDATE FORM
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditForm;
