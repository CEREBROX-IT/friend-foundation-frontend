import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import ThemeContext from "../ThemeContext";
import { useFetchIncompleteFormsQuery } from "../../redux/services/FormApi";
import { IncompleteFormsResponse } from "../../redux/type/Type";

const AdminPendingPage: FC = () => {
  const { data: PendingLogs } = useFetchIncompleteFormsQuery();
  console.log(PendingLogs)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<IncompleteFormsResponse[]>(
    []
  );
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, PendingLogs]);

  
  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      PendingLogs?.filter((row: any) => {
        return (
          row.user_full_name?.toLowerCase().includes(lowerCaseQuery) ||
          row.district_belong?.toLowerCase().includes(lowerCaseQuery) ||
          row.church_belong?.toLowerCase().includes(lowerCaseQuery) ||
          row.status?.toLowerCase().includes(lowerCaseQuery)
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  
  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  //-----for the Table------
  const columns: GridColDef<IncompleteFormsResponse>[] = [
    {
      field: "user_id",
      headerName: "ID",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "user_full_name",
      headerName: "NAME",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "district_belong",
      headerName: "DISTRICT",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "church_belong",
      headerName: "CHURCH",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "lacking_report_form",
      headerName: "LACKING REPORT FORM",
      flex: 1,
      minWidth: 300,
      renderCell: (params: GridRenderCellParams<IncompleteFormsResponse, string[]>) => (
        <div
          className="flex flex-col overflow-y-auto"
          style={{ maxHeight: "200px" }} // Adjusted maxHeight for better visibility
        >
          {Array.isArray(params.value) && params.value.length > 0 ? (
            params.value.map((item, index) => <div key={index}>{item}</div>)
          ) : (
            <div>{params.value}</div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between dark:text-white items-center px-4 py-3 border-t-[4px] mt-4 border-secondary-light">
        <p className="text-[20px] font-semibold mb-2 md:mb-0">PENDING LOGS</p>
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
          getRowId={(row: any) => row.user_id}
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

export default AdminPendingPage;
