import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
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
            <TextField
            required
            label="Product Title"
            />
            <CardContent>
                <Button variant="contained" component="label">
                Upload Image
                <input
                    type="file"
                    hidden
                    accept="image/*"
                />
                </Button>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <TextField
                required
                label="Product Description"
                />
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                <TextField
                required
                label="Required"
                />
                </Typography>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
}
