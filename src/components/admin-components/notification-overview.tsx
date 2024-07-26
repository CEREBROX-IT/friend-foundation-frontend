import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import ThemeContext from "../ThemeContext";
import { useFetchNotificationAdminQuery } from "../../redux/services/NotificationApi";
import { AdminNotificationResponse } from "../../redux/type/Type";
import { format } from 'date-fns';  

const NotificationOverview: FC = () => {
  const {data: Admin} = useFetchNotificationAdminQuery()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<AdminNotificationResponse[]>([]);
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    applyFilters();
  }, [searchQuery, Admin]);

 const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = Admin?.data?.filter((row) => {
      return row.title.toLowerCase().includes(lowerCaseQuery);
    }) || [];
    
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
      field: "user_id",
      headerName: "User ID",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "message",
      headerName: "MESSAGE",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "date_created",
      headerName: "DATE CREATED",
      flex: 1,
      minWidth: 250,
      valueGetter: (params: GridValueGetterParams) => formatDate(params.value),  // Apply date formatting

    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end dark:text-white items-center px-4 py-6 lg:py-0 border-t-[4px] lg:my-4 border-secondary-light">
        <div className="md:mt-2 lg:w-[400px] w-full ">
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
          maxWidth: "100%",
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

export default NotificationOverview;
