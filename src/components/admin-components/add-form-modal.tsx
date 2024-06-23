// import React from "react";
// import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// import { TextField, IconButton } from "@mui/material";
// import { IoIosRemoveCircle, IoIosAddCircle } from "react-icons/io";
// import { FormPayload, DynamicField } from "../../path/to/types"; // Adjust the path as per your project structure

// type AddFormModalProps = {
//   closeAddModalForm: () => void;
// };

// const AddFormModal: React.FC<AddFormModalProps> = ({ closeAddModalForm }) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormPayload>({
//     defaultValues: {
//       dynamic_fields: [{ key: "", value: "" }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "dynamic_fields",
//   });

//   const onSubmit: SubmitHandler<FormPayload> = async (data) => {
//     console.log(data);
//   };

//   return (
//     <div className="absolute inset-0 flex justify-center md:items-start backdrop-brightness-50">
//       <div className="min-h-96 pb-10 max-w-[350px] lg:min-w-[400px] w-96 dark:bg-fourth-dark dark:text-white bg-white rounded-[10px] p-4 mx-4 fixed top-0">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="w-full mt-[10px]">
//             <div className="flex flex-row px-1 text-[15px] mb-1">
//               <span className="font-semibold">FORM TITLE</span>
//             </div>
//             <TextField
//               type="text"
//               error={!!errors.form_title}
//               {...register("form_title", {
//                 required: "Form Title is required",
//               })}
//               className="w-full bg-fourth-light"
//               InputProps={{
//                 sx: {
//                   height: "45px",
//                   lineHeight: "normal",
//                   borderRadius: "10px",
//                 },
//               }}
//             />
//             {errors.form_title && (
//               <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
//                 {errors.form_title.message}
//               </p>
//             )}
//           </div>
//           <div className="w-full mt-[10px]">
//             <div className="flex flex-row px-1 text-[15px] mb-1">
//               <span className="font-semibold">FORM DESCRIPTION</span>
//             </div>
//             <TextField
//               type="text"
//               error={!!errors.form_description}
//               {...register("form_description", {
//                 required: "Form Description is required",
//               })}
//               className="w-full bg-fourth-light"
//               InputProps={{
//                 sx: {
//                   height: "45px",
//                   lineHeight: "normal",
//                   borderRadius: "10px",
//                 },
//               }}
//             />
//             {errors.form_description && (
//               <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
//                 {errors.form_description.message}
//               </p>
//             )}
//           </div>
//           <div className="w-full mt-[15px]">
//             <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
//               <span className="font-semibold uppercase">Deadline</span>
//             </div>
//             <TextField
//               type="date"
//               error={!!errors.deadline}
//               {...register("deadline", {
//                 required: "Deadline is required",
//               })}
//               className="w-full bg-fourth-light rounded-[10px]"
//               InputProps={{
//                 sx: {
//                   height: "45px",
//                   lineHeight: "normal",
//                   borderRadius: "10px",
//                 },
//               }}
//             />
//             {errors.deadline && (
//               <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
//                 {errors.deadline.message}
//               </p>
//             )}
//           </div>
//           <div className="w-full mt-[20px]">
//             <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
//               <span className="font-semibold uppercase">Add Fields</span>
//               <IconButton onClick={() => append({ key: "", value: "" })}>
//                 <IoIosAddCircle />
//               </IconButton>
//             </div>
//             {fields.map((field, index) => (
//               <div
//                 key={field.id}
//                 className="flex flex-col items-center mb-2 gap-4"
//               >
//                 <span className="font-semibold w-full uppercase">
//                   Field {index + 1}
//                 </span>
//                 <div className="flex">
//                   <TextField
//                     type="text"
//                     placeholder="Key"
//                     error={!!errors.dynamic_fields?.[index]?.key}
//                     {...register(`dynamic_fields.${index}.key`, {
//                       required: "Key is required",
//                     })}
//                     className="w-full bg-fourth-light mr-2"
//                     InputProps={{
//                       sx: {
//                         height: "45px",
//                         lineHeight: "normal",
//                         borderRadius: "10px",
//                       },
//                     }}
//                   />
//                   <TextField
//                     type="text"
//                     placeholder="Value"
//                     error={!!errors.dynamic_fields?.[index]?.value}
//                     {...register(`dynamic_fields.${index}.value`)}
//                     className="w-full bg-fourth-light"
//                     InputProps={{
//                       sx: {
//                         height: "45px",
//                         lineHeight: "normal",
//                         borderRadius: "10px",
//                       },
//                     }}
//                   />
//                 </div>
//                 <IconButton onClick={() => remove(index)}>
//                   <IoIosRemoveCircle />
//                 </IconButton>
//               </div>
//             ))}
//           </div>
//           <button
//             type="submit"
//             className="mt-10 bg-secondary-light hover:bg-third-light text-white py-2 px-4 rounded-[10px] w-full h-[45px]"
//           >
//             CREATING FORM
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddFormModal;
