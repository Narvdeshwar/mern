import { Pets } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    InputBase,
    styled,
    Toolbar,
    Typography,Link
} from "@mui/material";
import React, { useState, useEffect} from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../../actions/userAction';
import PropTypes from "prop-types";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-around",
});

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "6px 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "4vmax",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));

const Header2 = ({onsearch}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.card);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { loading, error, orders } = useSelector((state) => state.myOrders);
   
    let ele = [];
    {
        cartItems && user &&
            cartItems.forEach(element => {
                if (element.user == user.name) {
                    ele.push(element);
                }
            });
    }
    if(cartItems.user='default'){
        ele = cartItems;
      
    }
    const OnSearchHandler =(e)=>{
        onsearch(e.target.value);
    }
    useEffect(() => {
       
    }, [navigate, isAuthenticated, user,orders]);

    const [avatar, setAvatar] = useState("/Profile.png");
    return (
        <>
        
        <AppBar position="sticky" color='default'>
            <StyledToolbar>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
                    <img src="https://img.freepik.com/premium-vector/business-logo-template-fashion-branding-design_278222-2436.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1710115200&semt=ais" style={{ width: "65px", height: "65px" }}  alt="logon"/>
                </Typography>
                <Pets sx={{ display: { xs: "block", sm: "none" } }} />
                <Search component='div'>
                    <InputBase placeholder="Search....." sx={{width:"100%", fontSize:"18px"}} onChange={OnSearchHandler}/>   
                </Search>

                {isAuthenticated ? (<>
                    <Icons>
                        {user && user.role === "admin" ? (<>
                            <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" , fontSize:"20px"}} to='/admin/dashboard'>
                                    <SpaceDashboardIcon sx={{height:"24px" ,width:"24px"}}/>
                                    <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>Dashboard</b></Typography>
                            </Link>
                        </>) : (<></>)}

                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/'>
                                <HomeIcon sx={{height:"24px" ,width:"24px"}}/>
                                <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>Home</b></Typography>

                        </Link>
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/cart'>
                            <Badge badgeContent={ele.length} color="error">
                                <ShoppingCartIcon sx={{height:"24px" ,width:"24px"}}/>
                                <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>Cart</b></Typography>
                            </Badge>

                        </Link>
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/orders'>
                            <Badge badgeContent={orders && orders.length} color="error">
                                <ShoppingCartIcon sx={{height:"24px" ,width:"24px"}}/>
                                <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>MyOrders</b></Typography>
                            </Badge>

                        </Link>
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/account'>
                            <Avatar
                                src={user ?user.avtar.url: avatar} alt="Avatar Preview" sx={{height:"24px" ,width:"24px"}}
                            />
                            <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>Profile</b></Typography>
                        </Link>

                        <Link variant="inherit" underline="none" component="button" sx={{ display: "flex" }} onClick={() => {
                            dispatch(logout());
                            navigate("/");

                        }}>
                            <ExitToAppIcon sx={{height:"24px" ,width:"24px"}}/>
                            <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>Logout</b></Typography>
                        </Link>
                    </Icons>

                </>) : (<>
                    <Icons>

                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" , fontSize:"20px"}} to='/cart'>
                            <Badge badgeContent={ele.length} color="error">
                                <ShoppingCartIcon sx={{height:"24px" ,width:"24px"}}/>
                            </Badge>
                            <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>Cart</b></Typography>
                        </Link>
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/login'>
                            <AccountCircle sx={{height:"24px" ,width:"24px"}}/>
                            <Typography sx={{ paddingLeft: 0.4 , fontSize:"18px"}}><b>Login</b></Typography>
                        </Link>
                    </Icons>

                </>)}
            </StyledToolbar>
        </AppBar>
        
        </>
    );
};

Header2.propTypes = {
    onsearch: PropTypes.func.isRequired, 
};

export default Header2;