import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridRenderCellParams  } from "@mui/x-data-grid";
import ThemeContext from "../ThemeContext";
import { useFetchSubmittedFormQuery, useDeleteFromSubmittedMutation } from "../../redux/services/FormApi";
import { SubmittedFormResponse } from "../../redux/type/Type";
import ApproveModal from "./approve-modal";
import { IoMdCloseCircle } from "react-icons/io";
import { format } from 'date-fns';  
import { FiSearch } from "react-icons/fi";



type AdminTableModal = {
  id?: number;
  closeForm: () => void;
};

const AdminTablePerForm: FC<AdminTableModal> = ({ id, closeForm }) => {
  const [openResponse, setOpenResponse] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const { data: SubmittedForm } = useFetchSubmittedFormQuery({id: id});
  const [DeleteForm] = useDeleteFromSubmittedMutation()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<SubmittedFormResponse[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (SubmittedForm) {
      const updatedForm = SubmittedForm.map((item: any) => ({
        ...item,
        status: item.status || "No remarks yet",
      }));
      applyFilters(updatedForm);
    }
  }, [searchQuery, SubmittedForm]);

  const applyFilters = (formData: any[]) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      formData.filter((row: any) => {
        return (
          row.submitted_by?.toLowerCase().includes(lowerCaseQuery) ||
          row.remarks?.toLowerCase().includes(lowerCaseQuery) ||
          row.district_belong?.toLowerCase().includes(lowerCaseQuery) ||
          row.church_belong?.toLowerCase().includes(lowerCaseQuery)
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  const handleView = (data: any) => {
    setOpenResponse(true);
    setSelectedData(data);
  };

  const handleCloseResponse = () => setOpenResponse(false)

  const handleDelete = async (id: number) => {
    
    await DeleteForm(id).unwrap().then((response) => console.log(response))
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MM-dd-yyyy');  // Formatting the date to 'YYYY-MM-DD'
  };

  //-----for the Table------
  const columns: GridColDef[] = [
    {
      field: "submitted_by",
      headerName: "Full Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
    field: "district_belong",
    headerName: "District Belong",
    flex: 1,
    minWidth: 200,
    renderCell: (params: GridRenderCellParams) => (
      <span style={{ color: params.value ? 'inherit' : 'red' }}>
        {params.value || 'Not Applicable'}
      </span>
    ),
  },
  {
    field: "church_belong",
    headerName: "Church Belong",
    flex: 1,
    minWidth: 200,
    renderCell: (params: GridRenderCellParams) => (
      <span style={{ color: params.value ? 'inherit' : 'red' }}>
        {params.value || 'Not Applicable'}
      </span>
    ),
  },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "date_completed",
      headerName: "Date Completed",
      flex: 1,
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) => formatDate(params.value),  // Apply date formatting

    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex justify-center w-full">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleView(params.row)}
            style={{ marginRight: 10 }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="absolute inset-0  h-full  p-6 bg-white">
       <div className="flex flex-col lg:flex-row gap-2 lg:items-center mt-5">
        <div className=" w-full lg:max-w-[400px] ">
          <FiSearch
            size={20}
            className="absolute mt-[11px] right-50 font-black ml-3"
          />
          <input
            type="text"
            placeholder="Search by Form Title"
            className=" w-full p-2 pl-10 border rounded-[360px] shadow-sm bg-sixth-light dark:bg-fourth-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
      </div>
      </div>
      <div className="flex justify-end" onClick={closeForm}>
        <IoMdCloseCircle className="text-4xl cursor-pointer hover:rotate-90 duration-300  " />
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100%",
          width: "100%",
          maxHeight: "100vh",
          "& .MuiDataGrid-root": {
            flex: 1,
            borderColor: theme === "dark" ? "#676767" : "#CFCFCF",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: 1,
            borderRight: 1,
            borderColor: theme === "dark" ? "#676767" : "#CFCFCF",
            color: theme === "dark" ? "white" : "black",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: 1,
            borderTop: 1,
            borderRadius: 0,
            borderColor: theme === "dark" ? "#676767" : "#CFCFCF",
            fontWeight: "bold",
            backgroundColor: theme === "dark" ? "#3333" : "white",
            color: theme === "dark" ? "white" : "black",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme === "dark" ? "#3333" : "white",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: 1,
            backgroundColor: theme === "dark" ? "#3333" : "white",
            color: theme === "dark" ? "white" : "black",
            borderColor: theme === "dark" ? "#676767" : "#CFCFCF",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: theme === "dark" ? "white !important" : "black !important",
          },
          "& .MuiDataGrid .MuiButton-text": {
            color: theme === "dark" ? "white !important" : "black !important",
          },
          // Scrollbar styling for dark mode
          "&::-webkit-scrollbar": {
            width: "7px",
            height: "7px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#2e2e2e",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#646464",
          },
        }}
      >
        <DataGrid
          rows={memoizedFilteredRows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              printOptions: {
                disableToolbarButton: true,
              },
            },
          }}
        />
      </Box>
      {openResponse && <ApproveModal data={selectedData} closeModal={handleCloseResponse} />}
    </div>
  );
};

export default AdminTablePerForm;
