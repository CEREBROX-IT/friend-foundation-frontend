import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import {
  DataGrid,
  GridToolbar,
  GridRenderCellParams,
  GridAlignment,
} from "@mui/x-data-grid";
import { useGetDistrictListQuery, usePostDeleteDistrictMutation } from "../../redux/services/usersApi";
import ThemeContext from "../ThemeContext";

const DistrictOverview: FC = () => {
  const { data: GetDistrictList, isLoading: LoadingDistrict } = useGetDistrictListQuery();
  
  const [deleteDistrict] = usePostDeleteDistrictMutation()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(GetDistrictList ?? []);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, GetDistrictList]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      GetDistrictList?.filter((row) => {
        return (
          row.union_conference.toLowerCase().includes(lowerCaseQuery) ||
          row.district_name.toLowerCase().includes(lowerCaseQuery) ||
          row.district_region.toLowerCase().includes(lowerCaseQuery) ||
          row.district_province.toLowerCase().includes(lowerCaseQuery) ||
          row.district_municipal.toLowerCase().includes(lowerCaseQuery) ||
          row.headquarters_address.toLowerCase().includes(lowerCaseQuery)
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  async function hanldeDelete(id: number){
    await deleteDistrict({id: id}).unwrap().then((response) => console.log(response))
  }

  //-----for the Table------
  const columns = [
    {
      field: "union_conference",
      headerName: "Union Conference Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "district_name",
      headerName: "District Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "head_district_full_name",
      headerName: "District Head",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "district_region",
      headerName: "District Region",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "district_municipal",
      headerName: "District Municipality",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "headquarters_address",
      headerName: "Headquarters Address",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center" as GridAlignment,
      minWidth: 200,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex justify-evenly w-full">
          <Button variant="contained" color="error" size="small" onClick={()=> hanldeDelete(params.row.id)}>
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-end dark:text-white items-center px-4 py-3 border-t-[4px] border-secondary-light">
        <div className="md:mt-0 max-w-[400px] w-full">
          <FiSearch
            size={20}
            className="absolute mt-[11px] right-50 font-black ml-3"
          />
          <input
            type="text"
            placeholder="Search by Column Name"
            className="lg:w-[406px] w-full p-2 pl-10 border rounded-[360px] shadow-sm bg-sixth-light dark:bg-fourth-dark"
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
        {LoadingDistrict ? (
          <h1>Please wait</h1>
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
      >
        VIEW MORE
      </Button>
    </>
  );
};

export default DistrictOverview;
