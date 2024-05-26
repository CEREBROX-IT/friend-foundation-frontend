import { FC, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar, GridRenderCellParams } from "@mui/x-data-grid";
import { FormSubmitted } from "../../MockDataFiles/Mockdata";
import { isWithinInterval, addDays } from "date-fns";

const SubmittedFormOverview: FC = () => {
  const currentDate = new Date();
  const threeDaysAgo = addDays(currentDate, -3);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(FormSubmitted);

  useEffect(() => {
    applyFilters();
  }, [searchQuery]);

  const applyFilters = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = FormSubmitted.filter((row) => {
      return (
        row.user_full_name.toLowerCase().includes(lowerCaseQuery) ||
        row.district_id.toLowerCase().includes(lowerCaseQuery) ||
        row.church_id.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredRows(filteredData);
  };

  //-----for the Table------
  const columns = [
    {
      field: "user_full_name",
      headerName: "FULL NAME",
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const dateCreated = new Date(params.row.date);
        const isNew = isWithinInterval(dateCreated, {
          start: threeDaysAgo,
          end: currentDate,
        });
        return (
          <div className="relative flex items-center">
            <span>{params.value}</span>
            {isNew && (
              <span
                className="bg-[#3b82f6] text-[10px] rounded-[50px] px-2
                         text-white justify-end mt-[-1rem] ml-1 min-h-[10px] min-w-[10px] end-0"
              >
                New
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: "district_id",
      headerName: "DISTRICT ID NO.",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "church_id",
      headerName: "CHURCH ID NO.",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
      minWidth: 170,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 border-t-[4px] border-secondary-light">
        <p className=" text-[20px] font-semibold mb-2 md:mb-0">
          Latest Form Submitted
        </p>
        <div className="md:mt-0 lg:w-[400px] w-full">
          <FiSearch
            size={20}
            className="absolute mt-[11px] right-50 font-black ml-3"
          />
          <input
            type="text"
            placeholder="Search by Column Name"
            className="md:w-[406px] w-full p-2 pl-10 border rounded-[360px] shadow-sm"
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
          },
          "& .MuiDataGrid-cell": {
            borderBottom: 1,
            borderRight: 1,
            borderColor: "#CFCFCF",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "white",
            borderBottom: 1,
            borderTop: 1,
            borderRadius: 0,
            borderColor: "#CFCFCF",
            fontWeight: "bold",
            color: "black",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: 1,
            backgroundColor: "#white",
            color: "black",
            borderColor: "#CFCFCF",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "black !important",
          },
          "& .MuiDataGrid .MuiButton-text": {
            color: "white !important",
          },
        }}
      >
        <DataGrid
          rows={filteredRows}
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
      <button className="items-center w-full p-2 bg-blue-400 hover:bg-blue-500 text-white">
        <p>VIEW MORE</p>
      </button>
    </>
  );
};

export default SubmittedFormOverview;
