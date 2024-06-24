import { FC } from "react";
import { TextField } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { ApprovePayload } from "../../redux/type/Type";
import {
  useApproveSubmittedMutation,
  useAddRemarkMutation,
} from "../../redux/services/FormApi";

type ApproveModalProps = {
  data: {
    dynamic_fields: {
      field_name: string;
      field_value: string;
    }[];
    id: number;
  };
  closeModal: () => void;
};

const ApproveModal: FC<ApproveModalProps> = ({ data, closeModal }) => {
  const [ApproveForm] = useApproveSubmittedMutation();
  const [AddRemark] = useAddRemarkMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApprovePayload>();

  const handleAddRemark: SubmitHandler<ApprovePayload> = async (remarks) => {
    await AddRemark({ remarks: remarks, id: data.id })
      .unwrap()
      .then(() => {
        closeModal();
      });
  };

  const onSubmit = async () => {
    await ApproveForm({ id: data.id })
      .unwrap()
      .then(() => {
        closeModal();
      });
  };

  return (
    <div className="absolute shadow-md drop-shadow-md inset-0 backdrop-brightness-50">
      <div className="h-max overflow-auto max-w-[400px]  mx-auto bg-white p-4">
        <div className="flex justify-end" onClick={closeModal}>
          <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300" />
        </div>
        {data.dynamic_fields.map((item, index) => (
          <div className="flex flex-col my-2" key={index}>
            <h1 className="text-lg font-semibold">{item.field_name}</h1>
            <h2 className="bg-fourth-light p-2 text-sm font-semibold">
              {item.field_value}
            </h2>
          </div>
        ))}
        <form
          onSubmit={handleSubmit(handleAddRemark)}
          encType="application/json"
        >
          <div>
            <div className="w-full mt-[15px]">
              <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                <span className="font-semibold uppercase">Leave Remarks</span>
              </div>
              <TextField
                type="text"
                placeholder="Response here"
                multiline
                rows={4}
                error={Boolean(errors.remarks)}
                {...register("remarks", {
                  required: "Remarks is required",
                })}
                className="w-full bg-fourth-light rounded-[10px]"
                InputProps={{
                  sx: {
                    lineHeight: "normal",
                    borderRadius: "10px",
                  },
                }}
              />
              {errors.remarks && typeof errors.remarks.message === "string" && (
                <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                  {errors.remarks.message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onSubmit}
                className="mt-10 bg-secondary-light hover:bg-third-light text-white text-sm py-2 px-4 rounded-[10px] w-full h-[45px]"
              >
                MARK AS APPROVE
              </button>
              <button
                type="submit"
                className="mt-10 bg-secondary-light hover:bg-third-light text-sm text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
              >
                MARK AS REVISE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveModal;
