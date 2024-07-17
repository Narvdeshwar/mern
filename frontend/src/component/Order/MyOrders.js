import React, {useEffect, Fragment } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles,TableBody ,Link} from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@mui/material";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  heading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2vmax",
    marginTop: "1.5vmax",
    color:"#0f589f",
    fontWeight:"bolder"
  },
  table: {
    marginTop: theme.spacing(3),

    '& thead th': {
      fontWeight: '600',
      color: "#0f589f",
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
      textAlign:"left"
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
    alignItems:"center"
  },
  paperpadding: {
    margin: "1vmax",
    borderRadius:"30px",
    height:"500px",
    borderRight:"15px"
  },
  green:{
    color:"green"
  }
}));
const MyOrders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error, useParams]);
  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.container}>
            <Paper elevation={2} sx={{width:"80%"}} className={classes.paperpadding}>
              <Typography className={classes.heading}>{user && user.name}'s Orders</Typography>
              <Table aria-label="simple table" className={classes.table}>
                <TableHead className={classes.table}>
                  <TableRow>
                    <TableCell align="right">Order Id</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Amount&nbsp;($)</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders && orders.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="right">{item._id}</TableCell>
                      <TableCell align="right">{item.orderItems.length}</TableCell>
                      <TableCell align="right">{item.totalPrice}</TableCell>
                      <TableCell align="right" className={item.orderStatus === "Shipped"?classes.green:classes.red}><b>{item.orderStatus}</b></TableCell>
                      <TableCell align="right">
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to={`/order/${item._id}`}>
                          <Typography sx={{ paddingLeft: 0.4, paddingTop: 0.7 }}><b>View</b></Typography>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

          </div>

        </>


      )}
    </Fragment>
  );
};
export default MyOrders;