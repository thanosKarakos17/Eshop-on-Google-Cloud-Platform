import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { ThemeContext } from '../context/theme.context';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Cart({productList}) {

    const {dark} = React.useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
      });

  return (
    <ThemeProvider theme={theme}>
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {productList.map((value, index) => {
        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton onClick={() => {selectItemToEdit(value, index)}}>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar`}
                  src={value.Image}
                />
              </ListItemAvatar>
              <ListItemText primary={value.Title} />
              <ListItemText primary={value.Price + '€'} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </ThemeProvider>
  );
}
