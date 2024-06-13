import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar, GridRenderCellParams } from "@mui/x-data-grid";
import { useGetFormLogQuery } from "../../redux/services/usersApi";
import ThemeContext from "../ThemeContext";
import { FaFilePdf } from "react-icons/fa6";

const AdminSubmittedLogs: FC = () => {
  const { data: FormLog } = useGetFormLogQuery();
  console.log(FormLog?.data);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(FormLog?.data || []);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, FormLog?.data]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      FormLog?.data?.filter((row) => {
        return (
          row.district_belong?.toLowerCase().includes(lowerCaseQuery) ||
          row.church_belong?.toLowerCase().includes(lowerCaseQuery) ||
          row.response_file?.toLowerCase().includes(lowerCaseQuery) ||
          row.date_completed?.toLowerCase().includes(lowerCaseQuery) ||
          row.form_title?.toLowerCase().includes(lowerCaseQuery) ||
          row.form_description?.toLowerCase().includes(lowerCaseQuery) ||
          row.submitted_by?.toLowerCase().includes(lowerCaseQuery) ||
          row.email?.toLowerCase().includes(lowerCaseQuery)
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  const constructDownloadLink = (relativePath: string) => {
    // Replace 'baseURL' with your actual base URL where files are stored
    const baseURL = import.meta.env.VITE_ATTACHMENT; // Replace this with your base URL
    return `${baseURL}/${relativePath}`;
  };
  //-----for the Table------
  const columns = [
    {
      field: "submitted_by",
      headerName: "FULL NAME",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "form_title",
      headerName: "FORM TITLE",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "form_description",
      headerName: "FORM DESCRIPTION",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "response_file",
      headerName: "ATTACHMENT",
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const url = constructDownloadLink(params.row.response_file);

        if (params.row.response_file === "") {
          return "No Attachment";
        } else {
          return (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <FaFilePdf className="w-6 h-6 inline-block" />
              <span className="font-bold inline-block">
                Download Attachment
              </span>
            </a>
          );
        }
      },
    },
    {
      field: "church_belong",
      headerName: "CHURCH BELONG",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "district_belong",
      headerName: "DISTRICT BELONG",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "date_completed",
      headerName: "DATE COMPLETED",
      flex: 1,
      minWidth: 200,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between dark:text-white items-center px-4 py-3 border-t-[4px] border-secondary-light">
        <p className="text-[20px] font-semibold mb-2 md:mb-0">Submitted Logs</p>
        <div className="md:mt-0 lg:w-[400px] w-full">
          <FiSearch
            size={20}
            className="absolute mt-[11px] right-50 font-black ml-3"
          />
          <input
            type="text"
            placeholder="Search by Column Name"
            className="md:w-[406px] w-full p-2 pl-10 border rounded-[360px] shadow-sm bg-sixth-light dark:bg-fourth-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          height: "80vh",
          overflowX: "hidden",
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
    </>
  );
};

export default AdminSubmittedLogs;
