import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaShoppingBag, FaRegistered } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { removeCredentials } from "../slices/authSlice";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logout,{isloading}] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async() => {
    await logout()
    dispatch(removeCredentials());
  }

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
                    {cartItems.reduce((acc, item) => item.qty + acc, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <Link to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link href='/login'>
                    <FaUser /> Sign In
                  </Nav.Link>
                  <Nav.Link href='/register'>
                    <FaRegistered /> Registration
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
