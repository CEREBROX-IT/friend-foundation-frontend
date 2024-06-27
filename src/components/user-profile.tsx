import Header from "../components/header";
import { TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useFetchUserProfileQuery, useUpdateUserDetailsMutation, useUploadProfilePictureMutation } from "../redux/services/UserApi";
import JwtDecoder from "../utils/jwt-decoder";
import LoadingAnimation from "../components/loading-animation";
import { UnassignedPayload } from "../redux/type/Type";


export type ProfileInput = {
  profile_display: FileList;
  buffer: any;
};

const country = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "United States Minor Outlying Islands",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cabo Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo (Democratic Republic of the)",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Côte d'Ivoire",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Korea (Democratic People's Republic of)",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of Kosovo",
  "Réunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Korea (Republic of)",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function UnassignedDashboard() {
  const [updateProfile, { isLoading }] = useUpdateUserDetailsMutation();
  const [uploadProfile] = useUploadProfilePictureMutation();
  const userData = JwtDecoder().decodedToken;
  const id: number | undefined = userData?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UnassignedPayload>();

  const { register: RegisterProfile, handleSubmit: SubmitProfile } =
    useForm<ProfileInput>();

  const { data: UserDetails } = useFetchUserProfileQuery();
  

  async function onSubmitHandler({ data }: UnassignedPayload) {
    await updateProfile({ id: id, data: data })
      .unwrap()
      .then((response) => console.log(response));
  }

  useEffect(() => {
    if (UserDetails) {
      setValue("data.email", UserDetails?.data.email);
      setValue("data.first_name", UserDetails?.data.first_name);
      setValue("data.last_name", UserDetails?.data.last_name);
      setValue("data.middle_name", UserDetails?.data.middle_name);
      setValue("data.suffix", UserDetails?.data.suffix);
      setValue("data.age", UserDetails?.data.age);
      setValue("data.gender", UserDetails?.data.gender);
      setValue("data.contact_no", UserDetails?.data.contact_no);
      setValue("data.birth_date", UserDetails?.data.birth_date);
      setValue("data.salutation", UserDetails?.data.salutation);
      setValue("data.title", UserDetails?.data.title);
      setValue("data.street", UserDetails?.data.street);
      setValue("data.barangay", UserDetails?.data.barangay);
      setValue("data.municipal", UserDetails?.data.municipal);
      setValue("data.province", UserDetails?.data.province);
      setValue("data.postal_code", UserDetails?.data.postal_code);
      setValue("data.region", UserDetails?.data.region);
      setValue("data.country", UserDetails?.data.country);
      setValue("data.date_of_marriage", UserDetails?.data.date_of_marriage);
      setValue("data.spouse_first_name", UserDetails?.data.spouse_first_name);
      setValue("data.spouse_last_name", UserDetails?.data.spouse_last_name);
      setValue("data.spouse_middle_name", UserDetails?.data.spouse_middle_name);
      setValue("data.spouse_contact", UserDetails?.data.spouse_contact);
      setValue("data.father_first_name", UserDetails?.data.father_first_name);
      setValue("data.father_last_name", UserDetails?.data.father_last_name);
      setValue("data.father_middle_name", UserDetails?.data.father_middle_name);
      setValue("data.father_suffix_name", UserDetails?.data.father_suffix_name);
      setValue("data.mother_first_name", UserDetails?.data.mother_first_name);
      setValue("data.mother_last_name", UserDetails?.data.mother_last_name);
      setValue("data.mother_middle_name", UserDetails?.data.mother_middle_name);
      setValue("data.mother_suffix_name", UserDetails?.data.mother_suffix_name);
    }
  }, [UserDetails]);

  async function ProfileUpload(data: ProfileInput) {
    const formdata = new FormData();
    formdata.append("profile_display", data.profile_display[0]);
    await uploadProfile(formdata)
      .unwrap()
      .then((response) => console.log(response));
  }

  return (
    <div className="relative flex flex-col  w-full bg-fourth-light dark:bg-fourth-dark ">
      <Header />
      <div className="bg-fourth-light p-4 flex-1 w-full mx-auto">
        <div className="flex flex-col gap-4 lg:flex-row   p-4  overflow-auto ">
          <div className="bg-white p-4 border border-black">
            <form
              onChange={SubmitProfile(ProfileUpload)}
              className="inline-block w-full"
            >
              <div className="flex flex-col justify-between items-center  w-full gap-10">
                <div className=" w-60 h-60 p-2 mt-10 rounded-full border-2 border-black">
                  <img
                    src={
                      import.meta.env.VITE_IMAGE +
                      UserDetails?.data?.profile_display
                    }
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
                <div className="w-full  ">
                  <TextField
                    type="file"
                    {...RegisterProfile("profile_display", {
                      validate: {
                        validFileType: (value: FileList) => {
                          if (!value) return true; 
                          const allowedTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                          ];
                          const isValid = Array.from(value).every((file) =>
                            allowedTypes.includes(file.type)
                          );
                          if (!isValid)
                            return "Invalid file format. Only JPEG, PNG, and GIF images are allowed.";
                          return true;
                        },
                      },
                    })}
                    className="w-full bg-white rounded-[10px] "
                    InputLabelProps={{
                      shrink: true,
                      children: "Upload Profile",
                      title: "",
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className=" shadow-black  flex-1">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className=" max-h-[80vh] overflow-auto custom-scrollbar"
            >
              <div className="bg-white p-5 border border-black"> 
                <h1 className="text-2xl font-bold mb-2">Personal Information</h1>
              <div className="flex flex-col xl:flex-row">
                <div className="w-full">
                  <div className="flex flex-col lg:flex-row  gap-6">
                    <div className="w-full mt-[10px]">
                      <div className="flex flex-row px-1 text-[15px] mb-1">
                        <span className="font-semibold uppercase">First Name</span>
                      </div>
                      <TextField
                        type="text"
                        error={errors.data?.first_name ? true : false}
                        {...register("data.first_name", {
                          required: "First Name is required",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Invalid firstname",
                          },
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
                      {errors.data?.first_name && (
                        <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                          {errors.data.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full mt-[10px]">
                      <div className="flex flex-row px-1 text-[15px] mb-1">
                        <span className="font-semibold uppercase">Last Name</span>
                      </div>
                      <TextField
                        type="text"
                        error={errors.data?.last_name ? true : false}
                        {...register("data.last_name", {
                          required: "Last Name is required",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Invalid Lastname",
                          },
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
                      {errors.data?.last_name && (
                        <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                          {errors.data.last_name.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full mt-[10px] ">
                      <div className="flex flex-row px-1 text-[15px] mb-1">
                        <span className="font-semibold uppercase">Middle Name</span>
                      </div>
                      <TextField
                        type="text"
                        error={errors.data?.middle_name ? true : false}
                        {...register("data.middle_name", {
                          required: "Middle Name is required",
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
                      {errors.data?.middle_name && (
                        <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                          {errors.data.middle_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row  gap-6 mt-[20px]">
                    
                    <div className="w-full mt-[10px]">
                      <div className="flex flex-row px-1 text-[15px] mb-1">
                        <span className="font-semibold uppercase">Suffix</span>
                      </div>
                      <TextField
                        type="text"
                        error={errors.data?.suffix ? true : false}
                        {...register("data.suffix", {
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Invalid Suffix",
                          },
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
                      {errors.data?.suffix && (
                        <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                          {errors.data.suffix.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full mt-[10px]">
                      <div className="flex flex-row px-1 text-[15px] mb-1">
                        <span className="font-semibold uppercase">Age</span>
                      </div>
                      <TextField
                        type="number"
                        error={errors.data?.age ? true : false}
                        {...register("data.age", {
                          required: "Age is required",
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
                      {errors.data?.age && (
                        <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                          {errors.data.age.message}
                        </p>
                      )}
                    </div>
                     <div className="w-full mt-[10px]">
                  <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Gender</span>
                  </div>
                  <TextField
                    type="text"
                    aria-readonly
                    error={errors?.data?.gender ? true : false}
                    {...register("data.gender", {
                      required: "Gender is required",
                    })}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  ></TextField>
                  {errors.data?.gender && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.gender.message}
                    </p>
                  )}
                </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row  gap-6 mt-[20px]">
                <div className="w-full mt-[10px] ">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Birthday</span>
                  </div>
                  <TextField
                    type="text"
                    aria-readonly
                    value={UserDetails?.data?.birth_date}
                    error={errors.data?.birth_date ? true : false}
                    {...register("data.birth_date", {
                      required: "Birthday is required",
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
                  {errors.data?.birth_date && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.birth_date.message}
                    </p>
                  )}
                </div>
                <div className="w-full mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Salutation</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.salutation ? true : false}
                    {...register("data.salutation", {
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Invalid Salution",
                      },
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
                  {errors.data?.salutation && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.salutation.message}
                    </p>
                  )}
                </div>
                <div className="w-full mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Title</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.title ? true : false}
                    {...register("data.title", {
                      required: "Title is required",
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
                  {errors.data?.title && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.title.message}
                    </p>
                  )}
                </div>
                
              </div>
              </div>
             <div className="mt-10 border border-black bg-white p-4">
              <h1 className="font-bold text-2xl">Contact Information</h1>
              <div className="flex gap-6 flex-col lg:flex-row">
                <div className="w-full mt-[10px] ">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Contact Number</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.contact_no ? true : false}
                    {...register("data.contact_no", {
                      required: "Contact Number is required",
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
                  {errors.data?.contact_no && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.contact_no.message}
                    </p>
                  )}
              </div>
              <div className="w-full mt-[10px]">
                    <div className="flex flex-row px-1 text-[15px] mb-1">
                      <span className="font-semibold uppercase">
                        {" "}
                        Email Address
                      </span>
                    </div>
                    <TextField
                      type="email"
                      error={errors.data?.email ? true : false}
                      {...register("data.email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
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
                    {errors.data?.email && (
                      <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                        {errors.data.email.message}
                      </p>
                    )}
              </div></div>
              
             </div>
              <div className="bg-white p-5 border border-black mt-10">
                <h1 className="font-bold text-2xl ">Address Information</h1>
              <div className="flex flex-col lg:flex-row  gap-6 mt-[20px]">
                <div className="w-full mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Municipal</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.municipal ? true : false}
                    {...register("data.municipal", {})}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.municipal && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.municipal.message}
                    </p>
                  )}
                </div>

                <div className="w-full mt-[15px]">
                  <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Province</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors?.data?.province ? true : false}
                    {...register("data.province")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />

                  {errors.data?.province && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.province.message}
                    </p>
                  )}
                </div>

                <div className="w-full mt-[15px] ">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Region</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.region ? true : false}
                    {...register("data.region")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.region && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.region.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row  gap-6 mt-[20px]">
                <div className="w-full mt-[15px]">
                  <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Country</span>
                  </div>
                  <TextField
                    type="text"
                    defaultValue={UserDetails?.data?.country}
                    select
                    error={errors?.data?.country ? true : false}
                    {...register("data.country")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {country.map((item) => (
                      <MenuItem value={item}>
                        <p className="text-slate-500 text-sm">{item}</p>
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.data?.country && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.country.message}
                    </p>
                  )}
                </div>
                <div className="w-full mt-[15px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Postal Code</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.postal_code ? true : false}
                    {...register("data.postal_code")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.postal_code && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.postal_code.message}
                    </p>
                  )}
                </div>
                <div className="w-full mt-[10px]">
                  <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Street</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors?.data?.street ? true : false}
                    {...register("data.street")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />

                  {errors.data?.street && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.street.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row  gap-6 mt-[20px]">
                <div className="w-full mt-[10px] ">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Barangay</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.barangay ? true : false}
                    {...register("data.barangay")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.barangay && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.barangay.message}
                    </p>
                  )}
                </div>
                
              </div>
              </div>
              
              <div className="bg-white mt-10 border border-black p-5">
                <h1 className="text-2xl font-bold">Family Information</h1>
                <h2 className="text-xl font-semibold underline mt-6">SPOUSE INFORMATION</h2>
              <div className="flex flex-col lg:flex-row flex-wrap flex-1  gap-6 mt-[20px]">
                <div className="grow mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">
                      Spouse First Name
                    </span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.spouse_first_name ? true : false}
                    {...register("data.spouse_first_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.spouse_first_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.spouse_first_name.message}
                    </p>
                  )}
                </div>
                <div className=" grow mt-[10px] ">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">
                      Spouse Middle Name
                    </span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.spouse_middle_name ? true : false}
                    {...register("data.spouse_middle_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.spouse_middle_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.spouse_middle_name.message}
                    </p>
                  )}
                </div>
                <div className=" grow mt-[10px]">
                  <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Spouse Lastname</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors?.data?.spouse_last_name ? true : false}
                    {...register("data.spouse_last_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />

                  {errors.data?.spouse_last_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.spouse_last_name.message}
                    </p>
                  )}
                </div>
                <div className="grow  mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Spouse Contact</span>
                  </div>
                  <TextField
                    type="number"
                    error={errors.data?.spouse_contact ? true : false}
                    {...register("data.spouse_contact")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.spouse_contact && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.spouse_contact.message}
                    </p>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-semibold underline mt-6">FATHER INFORMATION</h2>

              <div className="flex flex-col lg:flex-row flex-wrap gap-6 mt-[20px]">
                 <div className="grow mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold  uppercase">
                      Father First Name
                    </span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.father_first_name ? true : false}
                    {...register("data.father_first_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.father_first_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.father_first_name.message}
                    </p>
                  )}
                </div>
                <div className="grow mt-[10px] ">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold  uppercase">
                      Father Middle Name
                    </span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.father_middle_name ? true : false}
                    {...register("data.father_middle_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.father_middle_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.father_middle_name.message}
                    </p>
                  )}
                </div>
                <div className="grow mt-[10px]">
                  <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                    <span className="font-semibold  uppercase">Father Lastname</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors?.data?.father_last_name ? true : false}
                    {...register("data.father_last_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />

                  {errors.data?.father_last_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.father_last_name.message}
                    </p>
                  )}
                </div>
                
                <div className="grow mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Father Suffix</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.father_suffix_name ? true : false}
                    {...register("data.father_suffix_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.father_suffix_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.father_suffix_name.message}
                    </p>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-semibold underline mt-6">MOTHER INFORMATION</h2>
              <div className="flex flex-col lg:flex-row  gap-6 mt-[20px]">
                <div className="grow mt-[10px]">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">
                      Mother First Name
                    </span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.mother_first_name ? true : false}
                    {...register("data.mother_first_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.mother_first_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.mother_first_name.message}
                    </p>
                  )}
                </div>

                <div className="grow mt-[10px] ">
                  <div className="flex flex-row px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">
                      Mother Middle Name
                    </span>
                  </div>
                  <TextField
                    type="text"
                    error={errors.data?.mother_middle_name ? true : false}
                    {...register("data.mother_middle_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />
                  {errors.data?.mother_middle_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.mother_middle_name.message}
                    </p>
                  )}
                </div>
                <div className="grow mt-[10px]">
                  <div className="flex flex-row justify-between px-1 text-[15px] mb-1">
                    <span className="font-semibold uppercase">Mother Lastname</span>
                  </div>
                  <TextField
                    type="text"
                    error={errors?.data?.mother_last_name ? true : false}
                    {...register("data.mother_last_name")}
                    className="w-full bg-fourth-light"
                    InputProps={{
                      sx: {
                        height: "45px",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      },
                    }}
                  />

                  {errors.data?.mother_last_name && (
                    <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                      {errors.data.mother_last_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grow mt-[15px] ">
                <div className="flex flex-row px-1 text-[15px] mb-1">
                  <span className="font-semibold uppercase">Mother Suffix </span>
                </div>
                <TextField
                  type="text"
                  error={errors.data?.mother_suffix_name ? true : false}
                  {...register("data.mother_suffix_name")}
                  className="w-full bg-fourth-light"
                  InputProps={{
                    sx: {
                      height: "45px",
                      lineHeight: "normal",
                      borderRadius: "10px",
                    },
                  }}
                />
                {errors.data?.mother_suffix_name && (
                  <p className="text-red-500 text-[14px] pl-1 mt-1 mb-[-0.5rem]">
                    {errors.data.mother_suffix_name.message}
                  </p>
                )}
              </div>
              <div className=" flex mt-10 justify-end">
                <button className="py-2 px-6 bg-secondary-light rounded-md text-white min-w-[200px]">
                  {isLoading ? (
                    <div className="flex w-full justify-center">
                      <LoadingAnimation />
                    </div>
                  ) : (
                    "UPDATE PROFILE"
                  )}
                </button>
              </div>

              </div>
              
              
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
