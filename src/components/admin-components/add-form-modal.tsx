import React, { useState, FC } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { TextField, IconButton, MenuItem } from "@mui/material";
import {
  IoIosRemoveCircle,
  IoIosAddCircle,
  IoMdCloseCircle,
} from "react-icons/io";
import { useCreateNewFormMutation } from "../../redux/services/FormApi";
import LoadingAnimation from "../loading-animation";
import { FormPayload } from "../../redux/type/Type";

type AddFormModalProps = {
  closeAddModalForm: () => void;
};

const AddFormModal: FC<AddFormModalProps> = ({ closeAddModalForm }) => {
  const [CreateForm, { isLoading: CreateFormLoading }] =
    useCreateNewFormMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormPayload>(); // Replace FormPayload with your actual form data type

  const {
    fields: dynamicFields,
    append: appendDynamic,
    remove: removeDynamic,
  } = useFieldArray({
    control,
    name: "dynamic_fields",
  });

  const {
    fields: attachments,
    append: appendAttachment,
    remove: removeAttachment,
  } = useFieldArray({
    control,
    name: "attachments",
  });

  const [selectedType, setSelectedType] = useState<"text" | "file">("text");

  const onSubmit: SubmitHandler<FormPayload> = async (data) => {
    const formData = new FormData();
    formData.append("form_title", data.form_title);
    formData.append("form_description", data.form_description);
    formData.append("deadline", data.deadline);

    // Append dynamic fields to formData
    formData.append("dynamic_fields", JSON.stringify(data.dynamic_fields));

    // Append attachments to formData
    data.attachments.forEach((attachment: any, index: any) => {
      formData.append(
        `attachments[${index}][field_name]`,
        attachment.field_name
      ); 
      formData.append(
        `attachments[${index}][field_value]`,
        attachment.field_value[0]
      ); 
    });

    await CreateForm(formData)
      .unwrap()
      .then(() => {
        closeAddModalForm();
      });
  };

  const handleAddField = () => {
    appendDynamic({ field_name: "", field_value: ""});
  };

  const handleAddAttachment = () => {
    appendAttachment({ field_name: "", field_value: "" });
  };

  return (
    <div className="absolute inset-0 flex justify-center md:items-start backdrop-brightness-50">
      <div className="min-h-96 pb-10 max-w-[450px] lg:min-w-[450px] w-96 dark:bg-fourth-dark dark:text-white bg-white rounded-[10px] p-4 mx-4 fixed top-0">
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

          <div className="flex gap-4">
            {/* Dynamic Fields Section */}
          <div className="w-full mt-[15px]">
              <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
               <span className="font-semibold uppercase">Text Field</span>
               </div>
               <IconButton onClick={handleAddField}>
                <IoIosAddCircle className="text-2xl text-secondary-light" />
              </IconButton>
            
            {dynamicFields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col gap-2 items-center mb-2"
              >
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
            
                  <TextField
                    type="text"
                    disabled
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
            
                <IconButton onClick={() => removeDynamic(index)}>
                  <IoIosRemoveCircle className="text-2xl text-red-500" />
                </IconButton>
              </div>
            ))}
          </div>

          {/* Attachments Section */}
          <div className="w-full mt-[15px]">
            <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
              <span className="font-semibold uppercase">Attachments</span>
            </div>
            <IconButton onClick={handleAddAttachment}>
              <IoIosAddCircle className="text-2xl text-secondary-light" />
            </IconButton>
            {attachments.map((attachment, index) => (
              <div
                key={attachment.id}
                className="
flex flex-col gap-2 items-center mb-2"
              >
                <TextField
                  type="text"
                  placeholder="Attachment Name"
                  error={!!errors.attachments?.[index]?.field_name}
                  {...register(`attachments.${index}.field_name`, {
                    required: "Attachment Name is required",
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
                <TextField
                  type="file"
                  error={!!errors.attachments?.[index]?.field_value}
                  {...register(`attachments.${index}.field_value`, {
                    required: "Attachment File is required",
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
                <IconButton onClick={() => removeAttachment(index)}>
                  <IoIosRemoveCircle className="text-2xl text-red-500" />
                </IconButton>
              </div>
            ))}
          </div>
          </div>

          {/* Submit Button */}
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
