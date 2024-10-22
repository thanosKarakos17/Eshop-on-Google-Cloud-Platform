import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import { Button } from '@mui/material';
import { CartContext } from '../context/cart.context';

export default function ProductWidget({productData}) {
    
    const {dark} = React.useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
        palette: {
            mode: dark?'dark' : 'light'
        }
      });

    const {addToCart} = React.useContext(CartContext);

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345,
                        height: '100%', // Ensures all cards are the same height
                        display: 'flex',
                        flexDirection: 'column', // Makes content stack vertically
                        justifyContent: 'space-between'}} >
            <CardHeader title={productData.Title} />
            <CardMedia
                component="img"
                maxHeight="194"
                image={productData.Image}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {productData.Description}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                <b><h3>{productData.Price} €</h3></b>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="outlined" onClick={() => {addToCart(productData)}}><ShoppingCartIcon/> Add to cart</Button>
            </CardActions>
            </Card>
        </ThemeProvider>
    );
}
