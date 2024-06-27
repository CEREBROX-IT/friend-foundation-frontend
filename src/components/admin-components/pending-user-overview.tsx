import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import ThemeContext from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../../redux/services/UserApi";
import { UserDetails } from "../../redux/type/Type";
import { format } from 'date-fns';  

const PendingUserOverview: FC = () => {
  const { data: GetUserList } = useFetchUsersQuery();
  console.log(GetUserList)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState<UserDetails[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, GetUserList]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      GetUserList?.data?.filter((row) => {
        // Filter by search query and pending status
        return (
          (row.first_name.toLowerCase().includes(lowerCaseQuery) ||
          row.email.toLowerCase().includes(lowerCaseQuery) ||
          row.title.toLowerCase().includes(lowerCaseQuery)) &&
          row.role.toLowerCase() === "pending"
        );
      }).filter((row) => {
        // Filter by date within past two days
        console.log(row)
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

   const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MM-dd-yyyy');  // Formatting the date to 'YYYY-MM-DD'
  };

  //-----for the Table------
  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      minWidth: 200,
     
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "title",
      headerName: "TITLE",
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
      field: "date_created",
      headerName: "DATE CREATED",
      flex: 1,
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) => formatDate(params.value),  // Apply date formatting

    },
    
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between dark:text-white items-center px-4 py-3 border-t-[4px] border-secondary-light">
        <p className="text-[20px] font-semibold mb-2 md:mb-0">
          Latest Pending Accounts
        </p>
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
        {memoizedFilteredRows.length <= 0 ? (
          <h1 className="m-auto font-bold text-2xl">No Pending Accounts</h1>
        ) : (
          <>
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
          </>
        )}
      </Box>
      <Button
        sx={{
          alignItems: "center",
          width: "100%",
          background: "#60a5fa",
          borderRadius: 0,
          color: "white",
          "&:hover": {
            background: "#3b82f6",
          },
        }}
        onClick={() => navigate("/dashboard/users")}
      >
        VIEW MORE
      </Button>
    </>
  );
};

export default PendingUserOverview;
