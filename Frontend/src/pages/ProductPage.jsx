import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form
} from "react-bootstrap";
import Rating from "../Component/Rating";
import { useGetProductQuery } from "../slices/productApiSlice";
import Loader from "../Component/Loader";
import Message from "../Component/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductPage = () => {

  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(productId);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const addToCartHandler = () => {
    dispatch(addToCart({...product,qty}))
    navigate('/') 
  };

  return (
    <>
      <Link className='btn btn-primary my-3' to={"/"}>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <p>${product.price}</p>
                </ListGroupItem>
                <ListGroupItem>
                  <p>{product.description}</p>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>{product.countInStock} in stock</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                        
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange ={(e) => setQty(Number(e.target.value))}>
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x+1} value={x + 1}>{x + 1}</option>
                              ))}
                            </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                      >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
