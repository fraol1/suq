import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,createRoutesFromElements,Route,Router,RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index path='/' element={<HomePage/>}/>
    <Route path='/product/:id' element = {<ProductPage/>} />
  </Route>

))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
