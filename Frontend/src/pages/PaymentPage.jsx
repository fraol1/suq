import FormContainer from '../Component/FormContainer'
import CheckoutSteps from "../Component/CheckoutSteps";
import { Col, Form } from 'react-bootstrap'
import {useState} from "react"

const PaymentPage = () => {
  const [paymentMethod,setpaymentMethod] = useState('paypal')
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form>
        <Form.Group>
          <Form.Label as={"legend"}>
            <Col>
              <Form.Check type='radio' className='my-2' label = 'paypal or creditCard' id = 'paypal' name='paymentMethod' value={'paypal'} checked onChange={(e)=> setPaymentMethod(e.target.value)}></Form.Check>
            </Col>
          </Form.Label>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage