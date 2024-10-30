import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const columns = [
  { field: 'id', headerName: 'ORDER ID', width: 290 },
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
      const [rows, setRows] = React.useState([]);

      React.useEffect(() => {
        fetch(`${global.config.ORDER_URL}/`).then(res => res.json()).then(res => fixRows(res));
      });

      const fixRows = (res) => {
        let r = [];
        res.forEach(order => {
          let totAmount = 0;
          order.Products.forEach(pr => {totAmount += pr.amount})
          const data = {id: order['_id'], products: totAmount, cost: order.Total_Price, status: order.Status, ORDER: order};
          r.push(data);
        });
        setRows(r.reverse());
      }

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
        onRowSelectionModelChange={itm => setSelectedOrder(itm[0] ? rows.filter(row => row.id === itm[0])[0].ORDER.Products : [])}
      />
    </Box>
    <List dense sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      {selectedOrder.map(singleProduct => (<ListItem
          disablePadding
          divider 
      >
          <ListItemButton>
          <ListItemText primary={`LABEL:  '${singleProduct.title}'`} />
          <ListItemText primary={`ID: ${singleProduct.id}`} />
          <ListItemText primary={`x ${singleProduct.amount}`} />
          </ListItemButton>
      </ListItem>))}
      </List>
    </ThemeProvider>
  );
}
