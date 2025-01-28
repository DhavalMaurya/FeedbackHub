// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Paper, Box } from "@mui/material";
// import { getAllFeedback } from "../../../service/operations/feedbacks";

// const FeedbackTable = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getFeedbacks = async () => {
//     try {
//       const response = await getAllFeedback();
//       if (response && response.data) {
//         // Transform data to flatten nested client fields
//         const transformedData = response.data.map(item => ({
//           ...item,
//           clientName: item.client?.name || 'N/A',
//           clientEmail: item.client?.email || 'N/A',
//           clientRole: item.client?.role || 'N/A'
//         }));
//         setFeedbacks(transformedData);
//         setLoading(false);
//       } else {
//         console.error("Error fetching feedback data");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Failed to fetch feedbacks:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getFeedbacks();
//   }, []);

//   const columns = [
//     { field: "category", headerName: "Category", width: 150 },
//     { 
//       field: 'clientName', 
//       headerName: 'Client Name', 
//       width: 150 
//     },
//     { 
//       field: 'clientEmail', 
//       headerName: 'Client Email', 
//       width: 200 
//     },
//     { 
//       field: 'clientRole', 
//       headerName: 'Client Role', 
//       width: 100 
//     },
//     { field: "description", headerName: "Description", width: 300 },
//     { 
//       field: "feedbackType", 
//       headerName: "Feedback Type", 
//       width: 150 
//     },
//     { field: "priority", headerName: "Priority", width: 100 },
//     { field: "rating", headerName: "Rating", width: 80 }
//   ];

//   return (
//     <div>
//       <Box
//         sx={{
//           padding: "20px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Paper
//           sx={{
//             width: "100%",
//             maxWidth: "1200px",
//             padding: "20px",
//             boxShadow: 3,
//           }}
//         >
//           <h1 className="text-xl font-bold py-3">Recent Feedbacks</h1>
//           <div style={{ height: 400, width: "100%" }}>
//             <DataGrid
//               rows={feedbacks}
//               columns={columns}
//               loading={loading}
//               getRowId={(row) => row._id}
//               pageSize={5}
//               rowsPerPageOptions={[5, 10, 15]}
//               checkboxSelection
//               disableSelectionOnClick
//               autoHeight
//             />
//           </div>
//         </Paper>
//       </Box>
//     </div>
//   );
// };

// export default FeedbackTable;



import React, { useEffect, useState } from "react";
import { DataGrid, 
  gridClasses, 
  GridToolbar 
} from "@mui/x-data-grid";
import { 
  Paper, 
  Box, 
  Chip, 
  IconButton, 
  Tooltip 
} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { RemoveRedEye } from '@mui/icons-material';
import { getAllFeedback } from "../../../service/operations/feedbacks";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' 
    ? 'rgba(0,0,0,.85)' 
    : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  [`& .${gridClasses.row}`]: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.mode === 'light' 
        ? alpha(theme.palette.grey[200], 0.5) 
        : alpha(theme.palette.grey[900], 0.5),
    },
  },
}));

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFeedbacks = async () => {
    try {
      const response = await getAllFeedback();
      if (response && response.data) {
        const transformedData = response.data.map(item => ({
          ...item,
          clientName: item.client?.name || 'N/A',
          clientEmail: item.client?.email || 'N/A',
          clientRole: item.client?.role || 'N/A'
        }));
        setFeedbacks(transformedData);
        setLoading(false);
      } else {
        console.error("Error fetching feedback data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  const columns = [
    { 
      field: "category", 
      headerName: "Category", 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color="primary" 
          variant="outlined" 
          size="small" 
        />
      )
    },
    { 
      field: 'clientName', 
      headerName: 'Client Name', 
      width: 150 
    },
    { 
      field: 'clientEmail', 
      headerName: 'Client Email', 
      width: 200 
    },
    { 
      field: 'clientRole', 
      headerName: 'Client Role', 
      width: 100 
    },
    { 
      field: "description", 
      headerName: "Description", 
      width: 300 
    },
    { 
      field: "feedbackType", 
      headerName: "Feedback Type", 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'negative' ? 'error' : 'success'} 
          size="small" 
        />
      )
    },
    { 
      field: "priority", 
      headerName: "Priority", 
      width: 100,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={
            params.value === 'High' ? 'error' : 
            params.value === 'Medium' ? 'warning' : 'success'
          } 
          size="small" 
        />
      )
    },
    { 
      field: "rating", 
      headerName: "Rating", 
      width: 80 
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Tooltip title="View Details">
          <IconButton 
            color="primary"
            onClick={() => {
              // Implement view details logic
              console.log('View details for', params.row);
            }}
          >
            <RemoveRedEye fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ 
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center" 
    }}>
      <Paper sx={{ 
        width: "100%", 
        maxWidth: "1400px", 
        padding: "20px", 
        boxShadow: 3 
      }}>
        <h1 className="text-2xl font-bold py-4 text-center">
          Recent Feedbacks
        </h1>
        <StyledDataGrid
          rows={feedbacks}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default FeedbackTable;