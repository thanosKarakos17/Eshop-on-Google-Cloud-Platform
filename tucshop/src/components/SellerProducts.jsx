import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { ThemeContext } from '../context/theme.context';
import { EditProductContext } from '../context/editProduct.context';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function SellerProducts({productList}) {

    const {dark} = React.useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
        palette: {
            mode: dark?'dark' : 'light'
        }
      });

    const [checkBox, setCheckbox] = React.useState(-1);
    const {setTitle, setDescription, setImage, setPrice} = React.useContext(EditProductContext);

    const selectItemToEdit = (value, index) => {
        setCheckbox(checkBox === index?-1:index);
        setTitle(value.Title);
        setImage(value.Image);
        setDescription(value.Description);
        setPrice(value.Price);
    }

    React.useEffect(() => {
      if(checkBox === -1){
        setTitle(null);
        setImage(null);
        setDescription(null);
        setPrice(null);
      }
    }, [checkBox]);

  return (
    <ThemeProvider theme={theme}>
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {productList.map((value, index) => {
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={checkBox === index}
              />
            }
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
