import './App.css';
import { useEffect, useState } from 'react';
import Home from './component/home/Home';
import Footer from './component/layout/Footer';
import Header from './component/layout/Header';
import Loader from './component/layout/Loader/Loader'
import { getProduct } from './actions/productAction';
import ProductDetails from './component/product/ProductDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './component/product/Products';
import Search from './component/product/Search';
import LoginSignUp from './component/User/LoginSignup';
import { loadUser } from './actions/userAction';
import store from './store';
import { useSelector } from 'react-redux';
import UserOption from './component/layout/UserOption';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReview from './component/admin/ProductReviews';
import Header2 from './component/layout/Header2';
import ProductLists from './component/Product/ProductLists';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { products, error, isloading } = useSelector(state => state.products);
  const [searchname, setSerachName]  = useState("");
  console.log(searchname);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getProduct());
    getStripeApiKey();
  }, []);
  return (
    <div className="App">
      <Header2 onsearch={setSerachName}/>
      <Routes>

        <Route exact path='/account' Component={Profile} />
        <Route exact path='password/update' Component={UpdatePassword}  />
         <Route
            path="/"
            element={( <Home  text={searchname} />)}
          /> 
        <Route exact path="/me/update" Component={UpdateProfile} />
        <Route exact path="//password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />

        <Route exact path='/product/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route exact path='/search' Component={Search} />
        <Route exact path='/login' Component={LoginSignUp} />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path='/shipping' Component={Shipping} />
        <Route exact path='/order/confirm' Component={ConfirmOrder} />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={(
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            )}
          />
        )}
        <Route exact path='/success' Component={OrderSuccess} />
        <Route exact path='/orders' Component={MyOrders} />
        <Route exact path='/order/:id' Component={OrderDetails} />
        <Route exact path='/admin/dashboard'isAdmin={true} Component={Dashboard} />
        <Route exact
          path="/admin/products"
          isAdmin={true}
          Component={ProductList} />
        <Route exact
          path="/admin/product"
          isAdmin={true}
          Component={NewProduct} />
        <Route exact
          path="/admin/product/:id"
          isAdmin={true}
          Component={UpdateProduct} />

        <Route exact
          path="/admin/orders"
          isAdmin={true}
          Component={OrderList} />
        <Route
          exact
          path="/admin/order/:id"
          isAdmin={true}

          Component={ProcessOrder}
        />
        <Route
          exact
          path="/admin/users"
          isAdmin={true}

          Component={UsersList}
        />
          <Route
          exact
          path="/admin/user/:id"
          isAdmin={true}

          Component={UpdateUser}
        />
         <Route
          exact
          path="/admin/reviews"
          isAdmin={true}
          Component={ProductReview}
        />
        <Route
          exact
          path="/products/lists"
          Component={ProductLists}
        />

      </Routes>


      <Footer />

    </div>
  );
}

export default App;