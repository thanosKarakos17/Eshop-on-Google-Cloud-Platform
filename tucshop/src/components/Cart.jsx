import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
//import { CartContext } from '../context/cart.context';

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

    //const {productSet} = useContext(CartContext);

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader title={'Order Details'} />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1.5 }}>
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 1.5  }}>
            
                </Typography>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
}
