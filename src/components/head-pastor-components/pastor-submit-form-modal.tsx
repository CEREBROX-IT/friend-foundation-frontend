import { FC } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import {
  useFetchDistrictChurchBelongToQuery,
  useSubmitFormMutation,
} from "../../redux/services/FormApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { SubmitFormPayload } from "../../redux/type/Type";

type PastorModal = {
  closeModal: () => void;
  data?: {
    id?: number;
    form_title?: string;
    form_description?: string;
    dynamic_fields?: { field_name: string; field_value: string }[];
  };
};

const PastorSubmitFormModal: FC<PastorModal> = ({ closeModal, data }) => {
  const { data: DistrictBelong } = useFetchDistrictChurchBelongToQuery();
  const [SubmitForm] = useSubmitFormMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitFormPayload>();

  const onSubmit: SubmitHandler<SubmitFormPayload> = async (values) => {
    const formData = new FormData();
    formData.append("report_form_id", data?.id?.toString() || "");
    formData.append("district_belong", DistrictBelong?.district_belong || "");
    formData.append("church_belong", DistrictBelong?.church_belong || "");

    // Construct dynamic_fields array
    const dynamicFields =
      data?.dynamic_fields?.map((item, index) => ({
        field_name: item.field_name,
        field_value: values.dynamic_fields?.[index]?.field_value || "",
      })) || [];

    // Append dynamic_fields as a JSON string
    formData.append("dynamic_fields", JSON.stringify(dynamicFields));

    console.log(data);
    console.log(Object.fromEntries(formData.entries())); // Logging the form data for testing

    await SubmitForm(formData)
      .unwrap()
      .then(() => {
        closeModal();
      });
  };

  return (
    <div className="absolute inset-0 flex-1  bg-fourth-light max-h-screen ">
      <div className="flex justify-end p-4" onClick={closeModal}>
        <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
      </div>
      <h1 className="m-4 text-2xl font-bold inline-block -translate-y-16">
        {data?.form_title}
      </h1>
      <h2 className="m-4 text-xl font-semibold -translate-y-16">
        {data?.form_description}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-screen min-h-screen overflow-auto p-4"
        encType="multipart/form-data"
      >
        <div className="flex gap-4 flex-wrap ">
          {data?.dynamic_fields?.map((item, index) => (
            <div key={index} className=" mt-[10px]">
              <div className="flex flex-row px-1 text-[15px] mb-1">
                <span className="font-bold">{item.field_name}</span>
              </div>
              <TextField
                defaultValue={item.field_value}
                error={!!errors.dynamic_fields?.[index]?.field_value}
                {...register(`dynamic_fields.${index}.field_value`, {
                  required: `${item.field_name} is required`,
                })}
                className=" bg-fourth-light "
                InputProps={{
                  sx: {
                    height: "45px",
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
        </div>
        <button
          type="submit"
          className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-1/5 h-[45px] "
        >
          {/* {isLoading ? (
            <div className="flex justify-center">
              <LoadingAnimation message="Registering, please wait!" />
            </div>
          ) : (
            "REGISTER"
          )} */}
          SUBMIT FORM
        </button>
      </form>
    </div>
  );
};

export default PastorSubmitFormModal;
