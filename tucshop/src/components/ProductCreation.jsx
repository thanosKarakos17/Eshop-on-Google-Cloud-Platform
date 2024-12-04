import {useContext, useEffect, useRef, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/theme.context';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function ProductCreation({token}) {
    
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
    const [units, setUnits] = useState(null);
    const [encImage, setEncImage] = useState(null);

    const imageRef = useRef();

    useEffect(() => {
        if(image && price && description && title && units)setUploadNotReady(false);
        else setUploadNotReady(true);
    }, [image, price, description, title, units]);

    function convertToBase64(file){
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          };
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }

      async function handleUpload(e) {
        e.preventDefault();
        
        // Convert image to base64 and wait for it to finish
        const encodedImage = await convertToBase64(image);
        setEncImage(encodedImage); // If you need to set it in state too
    
        const data = {
            Title: title,
            Image: encodedImage, // Use the encoded image here
            Description: description,
            Price: Number(price),
            Units: Number(units)
        };
    
        try {
            const response = await fetch(`${global.config.PRODUCT_URL}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("There was an error with the upload:", error);
        }

        setTimeout(clearFields, 500);
    }
    

    function clearFields(){
        setTitle(null);
        setImage(null);
        setDescription(null);
        setPrice(null);
        setUnits(null);
        setEncImage(null);

        imageRef.current.value = null;
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader title='Upload New Product' />
            <CardContent>
                <TextField
                required
                value={title || ''}
                label="Product Title"
                onChange={(e) => {setTitle(e.target.value)}}
                />
                <br/>
                <label for='imager'>Upload Image</label>
                <input
                    ref={imageRef}
                    type="file"
                    id='imager'
                    accept="image/*"
                    onChange={(e) => {setImage(e.target.files[0])}}
                ></input>
                <img src={encImage} width={200}></img>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1.5 }}>
                <TextField
                value={description || ''}
                required
                label="Product Description"
                multiline
                onChange={(e) => {setDescription(e.target.value)}}
                />
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 1.5  }}>
                <TextField
                value={price || ''}
                required
                label="Price"
                onChange={(e) => {setPrice(e.target.value)}}
                />
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 1.5  }}>
                <TextField
                value={units || ''}
                required
                label="Quantity"
                onChange={(e) => {setUnits(e.target.value)}}
                />
                </Typography>
                <Button variant="outlined" disabled={uploadNotReady} sx={{marginTop: 1.5 }} onClick={async (e) => await handleUpload(e)}>Upload</Button>
                <Button variant="outlined" sx={{marginTop: 1.5, marginLeft: 1 }} onClick={clearFields}>Clear</Button>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
}
