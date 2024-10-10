import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function ProductCreation() {
    
    const {dark} = React.useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader title='Upload New Product' />
            <CardContent>
                <TextField
                required
                label="Product Title"
                />
                <br/>
                <label for='imager'>Upload Image</label>
                <input
                    type="file"
                    id='imager'
                    accept="image/*"
                ></input>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <TextField
                required
                label="Product Description"
                />
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                <TextField
                required
                label="Price"
                />
                </Typography>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
}
