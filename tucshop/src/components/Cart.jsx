import { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import { CartContext } from '../context/cart.context';
import { List, TextField } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {Button} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Cart() {
     
    const {dark} = useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
        palette: {
            mode: dark?'dark' : 'light'
        }
      });

    const {showCart} = useContext(CartContext);
    const [cart, setCart] = useState(showCart());
    

    function totalCost(){
        let res = 0;
        if(cart.length >= 1){
            cart.forEach(element => {
                res += element.product.Price*element.quantity;
            });
        }
        return res;
    }

    function addAmount(product2, newAmount){
        setCart(prev => prev.map(singlePr => product2.product.id === singlePr.product.id ? {product: singlePr.product, quantity: newAmount} : singlePr));
        console.log(cart);
    }

    const handleDownloadPDF = () => {
        const input = document.getElementById('pdf-content');
        // Specify the id of the element you want to convert to PDF
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save(`order-${new Date().toLocaleDateString()}`); 
          // Specify the name of the downloaded PDF file
        });
      };

    return (
        <ThemeProvider theme={theme}>
            <div id='pdf-content'>
            <Card sx={{ maxWidth: 500 }}>
                <CardHeader title={'Order Details'} />
            <CardContent>
                <List dense sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {cart.map(cartProduct => (
                <ListItem
                    disablePadding
                    divider 
                >
                    <ListItemButton>
                    <ListItemAvatar>
                        <Avatar
                        alt={`Avatar`}
                        src={cartProduct.product.Image}
                        />
                    </ListItemAvatar>
                    <ListItemText primary={cartProduct.product.Title} />
                    <ListItemText primary={cartProduct.product.Price + '€'} />
                    <ListItemText primary={`x ${cartProduct.quantity}`} />
                    <TextField type='number' variant='standard' label='quantity' value={cartProduct.quantity}
                    slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      onChange={(e) => {addAmount(cartProduct, e.target.valueAsNumber)}}></TextField>
                    </ListItemButton>
                </ListItem>
                 ))}
                </List>
                {showCart().length > 0 &&
                (
                <>
                <Typography>
                    {new Date().toString()}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 1.5 }}>
                                Total Order: {totalCost().toFixed(2)} €
                </Typography></>)}
            </CardContent>
            </Card>
            </div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<CreditCardIcon/>}
                onClick={handleDownloadPDF}
                disabled={showCart().length < 1}
            >
                Purchase
            </Button>
        </ThemeProvider>
    );
}
