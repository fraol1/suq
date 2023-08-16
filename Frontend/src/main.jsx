import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,createRoutesFromElements,Route,Router,RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import {Provider} from 'react-redux'
import store from './store.js'
import CartPage from './pages/CartPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index path='/' element={<HomePage/>}/>
    <Route path='/product/:id' element = {<ProductPage/>} />
    <Route path='/cart' element = {<CartPage/>} />
    <Route path='/login' element = {<LoginPage/>} />
    <Route path='/register' element = {<RegistrationPage/>} />
  </Route>

))

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
