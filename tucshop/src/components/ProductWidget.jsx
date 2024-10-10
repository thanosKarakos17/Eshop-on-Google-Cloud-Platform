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

export default function ProductWidget({Title, Image, Description, Price}) {
    
    const {dark} = React.useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={Title} />
            <CardMedia
                component="img"
                maxHeight="194"
                image={Image}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {Description}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                <b><h3>{Price} €</h3></b>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="outlined"><ShoppingCartIcon/> Add to cart</Button>
            </CardActions>
            </Card>
        </ThemeProvider>
    );
}
