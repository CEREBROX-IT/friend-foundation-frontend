import React, { useState, FC } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { TextField, IconButton, MenuItem } from "@mui/material";
import { IoIosRemoveCircle, IoIosAddCircle, IoMdCloseCircle } from "react-icons/io";
import { FormPayload } from "../../redux/type/Type";
import { useCreateNewFormMutation } from "../../redux/services/FormApi";
import LoadingAnimation from "../loading-animation";

type AddFormModalProps = {
  closeAddModalForm: () => void;
};

const AddFormModal: FC<AddFormModalProps> = ({ closeAddModalForm }) => {
  const [CreateForm, { isLoading: CreateFormLoading }] = useCreateNewFormMutation();
  const {
    register,
    handleSubmit,
    control,
    setValue, // Added from react-hook-form to set values dynamically
    formState: { errors },
  } = useForm<FormPayload>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamic_fields",
  });

  // State to hold the selected type (text or file)
  const [selectedType, setSelectedType] = useState<"text" | "file">("text");

  const onSubmit: SubmitHandler<FormPayload> = async (data) => {
  const formData = new FormData();
  formData.append("form_title", data.form_title);
  formData.append("form_description", data.form_description);
  formData.append("deadline", data.deadline);
  formData.append("dynamic_fields", JSON.stringify(data.dynamic_fields));


  await CreateForm(formData).unwrap().then(() => {
    closeAddModalForm();
  });
};


  const handleAddField = () => {
    append({ field_name: "", field_value: "", type: selectedType }); 
  };

  return (
    <div className="absolute inset-0 flex justify-center md:items-start backdrop-brightness-50">
      <div className="min-h-96 pb-10 max-w-[350px] lg:min-w-[400px] w-96 dark:bg-fourth-dark dark:text-white bg-white rounded-[10px] p-4 mx-4 fixed top-0">
        <div className="flex justify-end" onClick={closeAddModalForm}>
          <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[80vh] overflow-auto custom-scrollbar"
          encType="multipart/form-data"
        >
          <div className="w-full mt-[10px]">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span className="font-semibold">FORM TITLE</span>
            </div>
            <TextField
              type="text"
              error={!!errors.form_title}
              {...register("form_title", {
                required: "Form Title is required",
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
            {errors.form_title && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.form_title.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[10px]">
            <div className="flex flex-row px-1 text-[15px] mb-1">
              <span className="font-semibold">FORM DESCRIPTION</span>
            </div>
            <TextField
              type="text"
              error={!!errors.form_description}
              {...register("form_description", {
                required: "Form Description is required",
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
            {errors.form_description && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.form_description.message}
              </p>
            )}
          </div>
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-semibold uppercase">Deadline</span>
            </div>
            <TextField
              type="date"
              placeholder="MM-DD-YY"
              error={!!errors.deadline}
              {...register("deadline", {
                required: "Deadline is required",
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
            {errors.deadline && (
              <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                {errors.deadline.message}
              </p>
            )}
          </div>

          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-semibold uppercase">Add Fields</span>
              <TextField
                select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as "text" | "file")}
                className="w-32 bg-fourth-light"
                InputProps={{
                  sx: {
                    height: "45px",
                    lineHeight: "normal",
                    borderRadius: "10px",
                  },
                }}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="file">File</MenuItem>
              </TextField>
              <IconButton onClick={handleAddField}>
                <IoIosAddCircle className="text-2xl text-secondary-light" />
              </IconButton>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2 items-center mb-2">
                <TextField
                  type="text"
                  placeholder="Field Name"
                  error={!!errors.dynamic_fields?.[index]?.field_name}
                  {...register(`dynamic_fields.${index}.field_name`, {
                    required: "Field Name is required",
                  })}
                  className="w-full bg-fourth-light mr-2"
                  InputProps={{
                    sx: {
                      height: "45px",
                      lineHeight: "normal",
                      borderRadius: "10px",
                    },
                  }}
                />
                {field.type === "text" ? (
                  <TextField
                    type="text"
                    placeholder="Field Value"
                    error={!!errors.dynamic_fields?.[index]?.field_value}
                    {...register(`dynamic_fields.${index}.field_value`)}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                ) : null}
                <IconButton onClick={() => remove(index)}>
                  <IoIosRemoveCircle className="text-2xl text-red-500" />
                </IconButton>
              </div>
            ))}
          </div>

          

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
          >
            {CreateFormLoading ? (
              <div className="flex justify-center">
                <LoadingAnimation message="Creating Form, Please wait!" />
              </div>
            ) : (
              "CREATE FORM"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFormModal;
