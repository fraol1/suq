import { Row, Col } from "react-bootstrap";
import Product from "../Component/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../Component/Loader";
import Message from '../Component/Message'
const HomePage = () => {
  const {data:products, error,isLoading} = useGetProductsQuery()

  return (
    <>
    {isLoading? (<Loader/>): error ? (<Message variant ='danger'>{error?.data?.message || error.error}</Message>): (
    <>
    <h1>Latest Products</h1>
      <Row>
        {products.map((product)=>(
            <Col sm={12} md ={6} lg ={4} xl={3} key={product._id}>
                <Product product={product}/>
            </Col>
        ))}
      </Row>
      </>)}
      
    </>
  );
};

export default HomePage;
