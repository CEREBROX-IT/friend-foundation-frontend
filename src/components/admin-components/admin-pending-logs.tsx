import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetAssignedLogsQuery } from "../../redux/services/usersApi";
import ThemeContext from "../ThemeContext";
const AdminPendingLogs: FC = () => {
  const { data: AssignedLogs } = useGetAssignedLogsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(AssignedLogs || []);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, AssignedLogs]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      AssignedLogs?.filter((row) => {
        return (
          row.user_full_name?.toLowerCase().includes(lowerCaseQuery) ||
          row.current_assign?.toLowerCase().includes(lowerCaseQuery) ||
          row.previous_assign?.toLowerCase().includes(lowerCaseQuery)
        );
      }).filter((row) => {
        // Filter by date within past two days
        const currentDate = new Date();
        const rowDate = new Date(row.date_created);
        const timeDiff = Math.abs(currentDate.getTime() - rowDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays <= 2;
      }) ?? [];
    setFilteredRows(filteredData);
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  //-----for the Table------
  const columns = [
    {
      field: "user_full_name",
      headerName: "FULL NAME",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "previous_assign",
      headerName: "Previous Assign",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "current_assign",
      headerName: "Current Assign",
      flex: 1,
      minWidth: 200,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between dark:text-white items-center px-4 py-3 border-t-[4px] border-secondary-light">
        <p className="text-[20px] font-semibold mb-2 md:mb-0">Pending Logs</p>
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

export default AdminPendingLogs;
