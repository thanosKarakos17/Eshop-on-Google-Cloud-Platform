import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import { List, TextField } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'cost',
    headerName: 'Total Cost',
    type: 'number',
    width: 150,
    editable: false
  },
  {
    field: 'products',
    headerName: 'Total Products',
    type: 'number',
    width: 110,
    editable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    editable: false
  }
];

const rows = [
  { id: 1, cost: 150, products: 4, status: 'Pending'},
  { id: 2, cost: 14.5, products: 1, status: 'Pending' }
];

export default function Orders() {

    const {dark} = React.useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
        palette: {
            mode: dark?'dark' : 'light'
        }
      });

      const [selectedOrder, setSelectedOrder] = React.useState([]);

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ height: 400, width: '75%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableMultipleRowSelection
        onRowSelectionModelChange={itm => setSelectedOrder(itm)}
      />
    </Box>
    <List dense sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      {selectedOrder.map(order => (<ListItem
          disablePadding
          divider 
      >
          <ListItemButton>
          <ListItemText primary={'cartProduct.product.Title'} />
          <ListItemText primary={'cartProduct.product.Price' + '€'} />
          <ListItemText primary={`x cartProduct.quantity`} />
          </ListItemButton>
      </ListItem>))}
      </List>
    </ThemeProvider>
  );
}
