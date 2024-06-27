import { FC } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import {
  useFetchDistrictChurchBelongToQuery,
  useEditFormMutation
} from "../../redux/services/FormApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { RevisePayload } from "../../redux/type/Type";

type Attachment = {
  filename: string;
  // Assuming the filename is enough to construct the full URL based on the environment variable
};
type PastorModal = {
  closeModal: () => void;
  data?: {
    id?: number;
    form_title?: string;
    form_description?: string;
    dynamic_fields?: { [key: string]: { field_name: string; field_value: string } } | undefined;
  };
  
};

const PastorEditFormModal: FC<PastorModal> = ({ closeModal, data }) => {
  
  const { data: DistrictBelong } = useFetchDistrictChurchBelongToQuery();
  const [SubmitForm] = useEditFormMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RevisePayload>();

const convertArray = Object.values(data?.dynamic_fields || {});



  const onSubmit: SubmitHandler<RevisePayload> = async (values) => {
    const formData = new FormData();
    formData.append("report_form_id", data?.id?.toString() || "");
    formData.append("district_belong", DistrictBelong?.district_belong || "");
    formData.append("church_belong", DistrictBelong?.church_belong || "");

    // Construct dynamic_fields array
    const dynamicFields =
      convertArray.map((item, index) => ({
        field_name: item.field_name,
        field_value: values.dynamic_fields?.[index]?.field_value || "",
      })) || [];

    // Append dynamic_fields as a JSON string
    formData.append("dynamic_fields", JSON.stringify(dynamicFields));

    await SubmitForm({ data: formData , id: data.id})
      .unwrap()
      .then((response) => {
        console.log(response);
        closeModal();
      });
  };

  return (
    <div className="absolute flex justify-center inset-0 flex-1 min-w-screen min-h-screen backdrop-brightness-50 p-4">
      <div className=" bg-white lg:max-w-[400px] lg:min-w-[400px] h-max p-4">
        <div className="flex justify-end" onClick={closeModal}>
          <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
        </div>
        <h1 className=" text-2xl inline-block uppercase font-bold">
          {data?.form_title}
        </h1>
        <hr className="border-black" />
        <h2 className="text-sm font-medium ">{data?.form_description}</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-screen overflow-auto "
          encType="multipart/form-data"
        >
          <div className="flex gap-4 flex-wrap ">
            {convertArray.map((item, index) => (
              <div key={index} className="w-full mt-[10px]">
                <div className="flex flex-row px-1 text-[13px] mb-1 ">
                  <span className="font-bold">{item.field_name}</span>
                </div>
                <TextField
                  defaultValue={item.field_value}
                  error={!!errors.dynamic_fields?.[index]?.field_value}
                  {...register(`dynamic_fields.${index}.field_value`, {
                    required: `${item.field_name} is required`,
                  })}
                  className=" bg-fourth-light w-full"
                  InputProps={{
                    sx: {
                      lineHeight: "normal",
                      borderRadius: "10px",
                    },
                  }}
                />
                {errors.dynamic_fields?.[index]?.field_value && (
                  <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                    {errors?.dynamic_fields[index]?.field_value?.message}
                  </p>
                )}
              </div>
            ))}

            {/* {ConvertFile.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Attachments:</h3>
                {ConvertFile.map((file, index) => {
                  return (
                    <TextField
                    type="file"
                      error={!!errors.attachments?.[index]?.field_value}
                      {...register(`attachments.${index}.field_value`, {
                        required: `Attachment is required`,
                      })}
                      className=" bg-fourth-light w-full mt-4"
                      InputProps={{
                        sx: {
                          lineHeight: "normal",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  );
                })}
              </div>
            )} */}
          </div>

          <button
            type="submit"
            className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px]  h-[45px]  "
          >
            SUBMIT FORM
          </button>
        </form>
      </div>
    </div>
  );
};

export default PastorEditFormModal;
