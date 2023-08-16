import { Container } from "react-bootstrap"
import Header from "./Component/Header"
import Footer from "./Component/Footer";
import { ToastContainer } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
      <Container>
        <Outlet/>
      </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  );
}

export default App
