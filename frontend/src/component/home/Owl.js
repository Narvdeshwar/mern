import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Product/ProductCard';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import './Owl.css';


const Owl = () => {
    const dispatch = useDispatch();
    var { products, error, isloading } = useSelector(state => state.products);
    useEffect(() => {
        if (error) {
          alert.error(error)
        }
        dispatch(getProduct());
      }, []);
    return (<>

        <div className='Owl_Carousel'>
            <OwlCarousel items={5} margin={2} autoplay={true} >
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

            </OwlCarousel>
        </div>
    </>)
}
export default Owl;