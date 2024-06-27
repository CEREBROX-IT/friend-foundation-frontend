import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar, GridValueGetterParams, GridRenderCellParams } from "@mui/x-data-grid";
import ThemeContext from "../ThemeContext";
import { useFetchSubmittedLogsQuery } from "../../redux/services/FormApi";
import { SubmittedFormsResponse } from "../../redux/type/Type";
import { format } from 'date-fns';  

const AdminSubmittedPage: FC = () => {
  const { data: SubmittedLogs } = useFetchSubmittedLogsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<SubmittedFormsResponse[]>(
    []
  );
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, SubmittedLogs]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      SubmittedLogs?.data?.filter((row: any) => {
        return (
          row.submitted_by?.toLowerCase().includes(lowerCaseQuery) ||
          row.form_title?.toLowerCase().includes(lowerCaseQuery) ||
          row.district_belong?.toLowerCase().includes(lowerCaseQuery) ||
          row.church_belong?.toLowerCase().includes(lowerCaseQuery) ||
          row.status?.toLowerCase().includes(lowerCaseQuery) ||
          row.date_completed?.toLowerCase().includes(lowerCaseQuery)
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MM-dd-yyyy');  // Formatting the date to 'YYYY-MM-DD'
  };


  //-----for the Table------
  const columns = [
    {
      field: "submitted_by",
      headerName: "NAME",
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
    field: "district_belong",
    headerName: "DISTRICT BELONG",
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
    headerName: "CHURCH BELONG",
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
      headerName: "STATUS",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "date_completed",
      headerName: "DATE COMPLETED",
      flex: 1,
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) => formatDate(params.value),  // Apply date formatting

    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between dark:text-white items-center px-4 py-3 border-t-[4px] mt-4 border-secondary-light">
        <p className="text-[20px] font-semibold mb-2 md:mb-0">SUBMITTED LOGS</p>
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

export default AdminSubmittedPage;
