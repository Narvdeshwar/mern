import {combineReducers, createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productsReducer,productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer';
import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cardReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';
import { getProduct } from './actions/productAction';
import { useSelector } from 'react-redux';


const reducer = combineReducers({products:productsReducer,
productDetails:productDetailsReducer,
user : userReducer,
profile : profileReducer,
forgotPassword : forgotPasswordReducer,
card : cartReducer,
newOrder : newOrderReducer,
myOrders: myOrdersReducer,
orderDetails : orderDetailsReducer,
newReview : newReviewReducer,
newProduct : newProductReducer,
product: productReducer,
allOrders : allOrdersReducer,
order : orderReducer,
allUsers: allUsersReducer,
userDetails : userDetailsReducer,
productReviews : productReviewsReducer,
review : reviewReducer
});

let initialState = {
    card: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
  };
const middleware = [thunk];

const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
