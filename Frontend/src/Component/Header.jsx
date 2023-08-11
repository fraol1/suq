import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Link to={"/"}>
            <Navbar.Brand>
              <FaShoppingBag /> Suq
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <FaShoppingCart /> Cart{" "}
                {cartItems.length > 0 && (
                  <Badge pill style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc,item) => item.qty + acc,0)}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link href='/Login'>
                <FaUser /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
