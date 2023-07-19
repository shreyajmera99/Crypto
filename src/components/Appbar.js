import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Slider from './Slider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function ButtonAppBar() {
    const [showSlider, setShowSlider] = useState(false);
    const handleClick = () => {
        setShowSlider(true);
      };
    const homepage = () => {
        setShowSlider(false);
      };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRYPTO
          </Typography>
          {!showSlider ? (
            <Button onClick={handleClick} color="inherit">
              Trending Coins
            </Button>):<Button onClick={homepage} color="inherit">
               Coins
            </Button>}
            <Button  >All Coins</Button>
        </Toolbar>
      </AppBar>
      {showSlider && <Slider />}

    </Box>
  );
}

// import { Container, Typography } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import React from "react";


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#fff',
//     },
//     type : 'dark'
//   },
// });
// export default function Appbar() {
  

//   return (
//     <ThemeProvider theme={theme}>
//       <Appbar color="transparent" position="static">
//         <Container>
//           <Typography variant="h5" color="initial">Crypto</Typography>
//         </Container>

//       </Appbar>
//     </ThemeProvider>
//   )
// }
