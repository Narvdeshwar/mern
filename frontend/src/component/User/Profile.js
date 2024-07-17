import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";


const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "65vmax",
  height: "35vmax",
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const Container = styled(Box)(({ }) => ({
  height: "70vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}))

const Profile = () => {

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Container spacing={2}>
      <DemoPaper square={false} elevation={3}>
      <h1>My Profile</h1>
        <div className='profileContainer'>
        <div>
          <img src={user && user.avtar.url} alt={user.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
        </div>
      
      </DemoPaper>
    </Container>
  );
}
export default Profile;