import {Navbar,Nav,Container} from 'react-bootstrap'
import {FaShoppingCart,FaUser,FaShoppingBag} from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Header() {
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
                <FaShoppingCart /> Cart
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

export default Header