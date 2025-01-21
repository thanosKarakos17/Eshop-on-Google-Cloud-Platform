import {useContext, useEffect, useRef, useState} from 'react';
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

export default function ProductEditor({token}) {
    
    const {dark} = useContext(ThemeContext);
    const theme = createTheme({
        colorSchemes: {
          dark: dark,
        },
        palette: {
            mode: dark?'dark' : 'light'
        }
      });

    const {title: curTitle, description: curDescription, image: curImage, price: curPrice, units: curUnits, id} = useContext(EditProductContext);
    const [image, setImage] = useState(curImage || '');
    const [price, setPrice] = useState(curPrice || '');
    const [description, setDescription] = useState(curDescription || '');
    const [title, setTitle] = useState(curTitle || '');
    const [units, setUnits] = useState(curUnits || '');
    const imageInputRef = useRef();

    useEffect(() => {
        setTitle(curTitle || '');  // Reinitialize local state when context updates
        setDescription(curDescription || '');
        setImage(curImage || '');
        setPrice(curPrice || '');
        setUnits(curUnits || '');
        imageInputRef.current.value='';
      }, [curTitle, curDescription, curImage, curPrice, curUnits]);


        const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Convert image to base64 string for preview
            };
            reader.readAsDataURL(file);
        }
    };

    async function handleRemove(e){
        e.preventDefault();
        await fetch(`${global.config.PRODUCT_URL}/${id}`, {
            method: 'DELETE',
            headers: { 
                'authorization': `Bearer ${token}`
             }
        });

        alert('Product deleted refresh (and login) to see the changes');
    }

    async function handleUpdate(e){
        e.preventDefault();

        const data = {
            Title: title,
            Image: image,
            Description: description,
            Price: Number(price),
            Units: Number(units)
        };

        await fetch(`${global.config.PRODUCT_URL}/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
             },
            body: JSON.stringify(data)
        });

        alert('Product updated refresh (and login) to see the changes');
    }

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
                    ref={imageInputRef}
                    type="file"
                    id='imager'
                    accept="image/*"
                    onChange={handleImageUpload}
                ></input>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1.5 }}>
                <TextField
                required
                label="Product Description"
                value={description}
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
                <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 1.5  }}>
                <TextField
                required
                label="Quantity"
                value={units}
                onChange={(e) => {setUnits(e.target.value)}}
                />
                </Typography>
                <Button variant="outlined" sx={{marginTop: 1.5 }} disabled={title===''} onClick={async (e) => await handleUpdate(e)}>Update</Button>
                <Button variant="outlined" sx={{marginTop: 1.5, marginLeft: 1.5 }} disabled={title===''} onClick={async (e) => await handleRemove(e)}>Remove</Button>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
}
