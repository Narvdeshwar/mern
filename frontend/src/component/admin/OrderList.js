import React, { Fragment, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel, TableBody , Link, Typography, Paper, IconButton} from '@material-ui/core'
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import { useNavigate } from "react-router-dom";

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
      backgroundColor:"rgb(237 237 237)",
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
      color:"black"
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
  },
  
}));

const OrderList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);



  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 className={classes.heading}>ALL ORDERS</h1>
          <Paper elevation={2} sx={{width:"100%"}} className={classes.paperpadding}>
              <Table aria-label="simple table" className={classes.table}>
                <TableHead className={classes.table}>
                  <TableRow>
                    <TableCell align="right">Order Id</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Items Qty</TableCell>
                    <TableCell align="right">Amount&nbsp;($)</TableCell>
                    <TableCell align="right">Actions</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders && orders.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="right">{item._id}</TableCell>
                      <TableCell align="right">{item.orderStatus}</TableCell>
                      <TableCell align="right">{item.orderItems.length}</TableCell>
                      <TableCell align="right">{item.totalPrice}</TableCell>
                      <TableCell align="right">
                        <Link variant="inherit" underline="none" component={RouterLink } sx={{ display: "flex" }} to={`/admin/order/${item._id}`}>
                          <Typography sx={{ paddingLeft: 0.4, paddingTop: 0.7 }}><b><EditIcon/></b></Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Link variant="inherit" underline="none" component={RouterLink } sx={{ display: "flex" , color:"red"}}>
                          <IconButton  onClick={()=>{deleteOrderHandler(item._id)}}><DeleteIcon color="error"/></IconButton>
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

export default OrderList;