import { useState } from "react";
import FormContainer from "../Component/FormContainer";
import { Form, Row,Button,Col } from "react-bootstrap";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredential } from "../slices/authSlice";
import { useNavigate,Link } from "react-router-dom";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validate = (e) => {
    e.preventDefault()
    if(name && email && password && confirmPassword && (password ===confirmPassword)){
      submission()
    }
  }

  const [register, {isLoading}] = useRegisterMutation()

  const submission = async() => {
    const data = await register({name,email,password}).unwrap()
    console.log(data)
    dispatch(setCredential({...data}))
    navigate('/')
  }

  return (
    <FormContainer>
      <h1> Register Here</h1>
      <Form onSubmit={validate}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your full name'
            value={name}
            onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Passqord</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='ConfirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='Submit' variant='primary' className='mt-2'>
          Register
        </Button>
      </Form>

      <Row>
        <Col>
          Already have an account? <Link to={"/login"}>login here</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegistrationPage