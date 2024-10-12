import {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function ProductCreation() {
    
    const {dark} = useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
        palette: {
            mode: dark?'dark' : 'light'
        }
      });

    const [uploadNotReady, setUploadNotReady] = useState(true);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if(image && price && description && title)setUploadNotReady(false);
        else setUploadNotReady(true);
    }, [image, price, description, title]);

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader title='Upload New Product' />
            <CardContent>
                <TextField
                required
                label="Product Title"
                onChange={(e) => {setTitle(e.target.value)}}
                />
                <br/>
                <label for='imager'>Upload Image</label>
                <input
                    type="file"
                    id='imager'
                    accept="image/*"
                    onChange={(e) => {setImage(e.target.value)}}
                ></input>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1.5 }}>
                <TextField
                required
                label="Product Description"
                multiline
                onChange={(e) => {setDescription(e.target.value)}}
                />
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 1.5  }}>
                <TextField
                required
                label="Price"
                onChange={(e) => {setPrice(e.target.value)}}
                />
                </Typography>
                <Button variant="outlined" disabled={uploadNotReady} sx={{marginTop: 1.5 }}>Upload</Button>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
}
