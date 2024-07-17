import React, { Fragment, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, makeStyles,TableBody , Link, Typography, Paper, IconButton} from '@material-ui/core'
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  heading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2vmax",
    marginTop: "3vmax",
    color:"#0f589f"
  },
  table: {
    marginTop: theme.spacing(3),

    '& thead th': {
      fontWeight: '600',
      color: "#1976d2",
      backgroundColor: "rgb(237 237 237)",
      textAlign:"left"

    },
    '& tbody td': {
      fontWeight: '400',
      textAlign:"left"
    },
    '& tbody tr td': {
      fontWeight: '300',
      height: '40',
      textAlign:"left",
      color:"black",
      fontSize:"20px",
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  container: {
    height: "80vh",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    backgroundColor:'smoke'
  },
  paperpadding :{
    margin:"1vmax"
  }
}));

const UsersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {id} = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  return (
    <Fragment>
    <MetaData title={`ALL USERS - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 className={classes.heading}>ALL USERS</h1>
        <Paper elevation={2} sx={{width:"100%"}} className={classes.paperpadding}>
            <Table aria-label="simple table" className={classes.table}>
              <TableHead className={classes.table}>
                <TableRow>
                  <TableCell align="right">User ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.map((user, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="right">{user._id}</TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.role}</TableCell>
                    <TableCell align="right">
                      <Link variant="inherit" underline="none" component={RouterLink } sx={{ display: "flex" }} to={`/admin/user/${user._id}`}>
                        <Typography sx={{ paddingLeft: 0.4, paddingTop: 0.7 }}><b><EditIcon/></b></Typography>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link variant="inherit" underline="none" component={RouterLink } sx={{ display: "flex" , color:"red"}}>
                        <IconButton  onClick={()=>{deleteUserHandler(user._id)}}><DeleteIcon color="error"/></IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
      </div>
    </div>
  </Fragment>
  );
};

export default UsersList;