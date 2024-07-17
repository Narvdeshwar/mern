import React, { Fragment, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, CardMedia, IconButton, CssBaseline, Badge, Container, Avatar } from "@mui/material";
import { FaRegUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './header.css';
import UserOption from './UserOption';


const useStyles = makeStyles((theme) => ({
    logon: {
        textAlign: "left",
    },
    links: {
        textDecoration: "none",
        color: "inherit",
        marginLeft: 30,
        display: "flex",
        "&:hover": {
            color: "red"
        },
    },
    largeIcon: {
        width: 90,
        height: 90,
        position: "fixed",
        right: "10vmax",
        top: "0.9vmax",
        textDecoration: "none"
    },

}))
const Header = () => {
    const classes = useStyles();
    const { cartItems } = useSelector((state) => state.card);
    const { user } = useSelector((state) => state.user);
    const { isAuthenticated, users } = useSelector((state) => state.user);

    let ele = [];
    {
        cartItems && user &&
            cartItems.forEach(element => {
                if (element.user == user.name) {
                    ele.push(element);
                }
            });
    }

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    return (<>
        <AppBar position="sticky" color='default' sx={{ height: "80px", justifyContent: "center" }}>
            <CssBaseline />

            <Container maxWidth="xl">
                <Toolbar>
                    <Box >
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/011/401/535/small/online-shopping-trolley-click-and-collect-order-logo-design-template-vector.jpg" style={{ width: "100px" }} />
                            <span>E-shopping</span>
                    </Box>
                    <Box>
                        <div>
                            <form className='searchBar'>
                                <input type="text" placeholder="Search a Product ..." className='searchBar' />
                                <IconButton className='search-logon'>
                                    <FaSearch />
                                </IconButton>

                            </form>
                        </div>
                    </Box>
                    <Box>
                    <div id='cart-image'>
                            <IconButton>
                                <Badge badgeContent={ele.length} color="error">
                                    <Link to='/cart'>
                                        <FaShoppingCart />
                                    </Link>
                                </Badge>

                            </IconButton>
                        </div>
                        {isAuthenticated ? <UserOption user={user} /> : (
                            <Fragment>
                                <Link to='/login'>
                                    <div id='login-image'>
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <p>Login</p>
                                    </div></Link>

                            </Fragment>
                        )}
                    </Box>

                </Toolbar>
            </Container>



        </AppBar>
    </>)
}

export default Header;