import React from 'react';
import {  Typography, Box, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    img: {
        width: "9.5vmax",
        heigth: "1vmax",
        border: "none"
    },
    container: {
        "background-color": "rgb(34, 33, 33)",
         paddingTop:"1vmax",
         display:"flex",
         justifyContent:"center",
         alignItems:"center"
    },
    "img-container": {
        display: "flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:"white",
        fontSize: "0.8vmax",
        "font-family": "Roboto",
        textDecoration:"none",
        textAlign:"center"
    },
    linkstyle:{
    textDecoration:"none",
    color:"white",
    fontSize:"0.8vmax"
    }
}))

const Footer = () => {
    const classes = useStyles();
    return (<>
        <Toolbar className={classes.container}>
            <Box flexGrow={1}>
                <Typography className={classes.text}sx={{fontSize:"0.8vmax"}}>DOWNLOAD OUR APP</Typography>
                <Typography className={classes.text}sx={{fontSize:"0.8vmax"}}>Download App for Android and IOS mobile phone</Typography>
                <div className={classes['img-container']}>
                    <img className={classes.img} src="https://cdn.pixabay.com/photo/2021/09/22/16/07/google-play-6647242_1280.png" alt="download_app"/>
                    <img className={classes.img} src="https://cdn.pixabay.com/photo/2021/09/22/16/07/google-play-6647242_1280.png" alt="playstore_app"/>
                </div>
            </Box>
            <Box flexGrow={1}>
                <Typography variant='h1' sx={{color:"red", textAlign:"center"}}>ECOMMERCE.</Typography>
                <Typography className={classes.text} sx={{fontSize:"0.8vmax"}}>High Quality is our first priority</Typography>
                <Typography className={classes.text} sx={{fontSize:"0.8vmax"}}>Copyrights 2021 @ReenaYadav</Typography>

            </Box>
            <Box flexGrow={1.7}>
                <Typography className={classes.text} ><Link style={{"color":"white", fontSize:"20px"}} to="/">Follow Us</Link></Typography>
                <Typography className={classes.text}><Link  to="/"  className={classes.linkstyle}>Instagram</Link></Typography>
                <Typography className={classes.text}><Link  to="/" className={classes.linkstyle}>Youtube</Link></Typography>
                <Typography className={classes.text}><Link  to="/" className={classes.linkstyle}>Facebook</Link></Typography>

            </Box>
        </Toolbar>
    </>)
}

export default Footer;