import { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const PlaceOrderPage = () => {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)

    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        } else if (!cart.paymentMethod){
            navigate('payment')
        }
    },[cart.shippingAddress.address,cart.paymentMethod,navigate])
  
    return (
    <>
    <Row>
        <Col>
        
        </Col>
        </Row></>
  )
}

export default PlaceOrderPage