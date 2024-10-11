import {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import { EditProductContext } from '../context/editProduct.context';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function ProductEditor() {
    
    const {dark} = useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
      });

    const {title: curTitle, description: curDescription, image: curImage, price: curPrice} = useContext(EditProductContext);
    const [image, setImage] = useState(curImage || '');
    const [price, setPrice] = useState(curPrice || '');
    const [description, setDescription] = useState(curDescription || '');
    const [title, setTitle] = useState(curTitle || '');

    useEffect(() => {
        setTitle(curTitle || '');  // Reinitialize local state when context updates
        setDescription(curDescription || '');
        setImage(curImage || '');
        setPrice(curPrice || '');
      }, [curTitle, curDescription, curImage, curPrice]);

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader title={`Edit Item "${title}"`} />
            <CardContent>
                <TextField
                required
                label="Product Title"
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
                />
                <CardMedia sx={{marginTop: 1.5}}
                component="img"
                maxHeight="194"
                image={image}
            />
                <br/>
                <label for='imager'>Upload New Image</label>
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
                defaultValue={curDescription}
                multiline
                onChange={(e) => {setDescription(e.target.value)}}
                />
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 1.5  }}>
                <TextField
                required
                label="Price"
                
                value={price}
                onChange={(e) => {setPrice(e.target.value)}}
                />
                </Typography>
                <Button variant="outlined" sx={{marginTop: 1.5 }}>Update</Button>
                <Button variant="outlined" sx={{marginTop: 1.5, marginLeft: 1.5 }}>Remove</Button>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
}
