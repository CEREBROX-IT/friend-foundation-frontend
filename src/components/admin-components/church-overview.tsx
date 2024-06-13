import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import {
  DataGrid,
  GridToolbar,
  GridRenderCellParams,
  GridAlignment,
} from "@mui/x-data-grid";
import ThemeContext from "../ThemeContext";
import {
  useGetChurchListAdminQuery,
  usePostDeleteChurchMutation,
} from "../../redux/services/usersApi";

const ChurchOverview: FC = () => {
  const { data: ChurchList } = useGetChurchListAdminQuery();
  const [PostDeleteChurch] = usePostDeleteChurchMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(ChurchList ?? []);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, ChurchList]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData =
      ChurchList?.filter((row) => {
        return (
          row.district_name?.toLowerCase().includes(lowerCaseQuery) ||
          row.church_name?.toLowerCase().includes(lowerCaseQuery) ||
          row.head_pastor_full_name?.toLowerCase().includes(lowerCaseQuery) ||
          row.church_address?.toLowerCase().includes(lowerCaseQuery)
        );
      }) ?? [];
    setFilteredRows(filteredData);
  };

  // Memoize the filtered rows to prevent unnecessary re-renders
  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);

  const CustomCellRenderer: React.FC<{ value: string }> = ({ value }) => (
    <h1 className="text-red-700">{value}</h1>
  );

  //-----for the Table------
  const columns = [
    {
      field: "church_name",
      headerName: "Church Name",
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
      field: "head_pastor_full_name",
      headerName: "Pastor Name",
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) =>
        params.row.head_pastor_full_name ? (
          params.row.head_pastor_full_name
        ) : (
          <CustomCellRenderer value="No Pastor Assigned" />
        ),
    },
    {
      field: "church_date_establish",
      headerName: "Church Establish",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "church_address",
      headerName: "Church Address",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 170,
      headerAlign: "center" as GridAlignment,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex justify-evenly w-full">
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => deleteChurch(params.row.id)}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  async function deleteChurch(id: number) {
    await PostDeleteChurch({ id: id })
      .unwrap()
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end dark:text-white items-center px-4 py-3 border-t-[4px] border-secondary-light">
        <div className="md:mt-0 max-w-[400px] w-full">
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

export default ChurchOverview;
