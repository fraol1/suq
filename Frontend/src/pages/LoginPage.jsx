import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Toast } from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom"
import FormContainer from "../Component/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredential } from "../slices/authSlice";
import {toast} from 'react-toastify'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login,{isloading}] = useLoginMutation()

  const { userInfo } = useSelector(state => state.auth)

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

   useEffect(() => {
     if (userInfo) {
       navigate(redirect);
     }
   }, [navigate, redirect, userInfo]);

   

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      const data = await login({email,password}).unwrap()
      dispatch(setCredential({...data }));
      navigate(redirect)
    } catch (error) {
      console.log( error.error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}>
              
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Passqord</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Button type="Submit" variant="primary" className="mt-2">
          Sign In
        </Button>
      </Form>

      <Row>
        <Col>
        new Customer? <Link to={'register'}>register here</Link>
        </Col>
        </Row>
    </FormContainer>
  );
};

export default LoginPage;
