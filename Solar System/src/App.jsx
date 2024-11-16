import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Component/Home Page/Home';
import Shop from './Component/Shop page/Shop';
import Product1 from './Component/ShopProduct1/Product1';
import ShowItem from './Component/ShopProduct1/ShowItem';
import Addtocart from './Component/AddCart/Addtocart';
import Checkout from './Component/Checkout/Checkout';
import Address from './Component/Address page/Address';
import Login from './Component/Login&Signup/Login';
import Signin from './Component/Login&Signup/Signin';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <BrowserRouter>
      <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='Shop' element={<Shop/>}/> 
      <Route path='Shop/Product' element={<Product1/>}/>
      <Route path='Shop/item' element={<ShowItem/>}/>
      <Route path='Shop/cart' element={<Addtocart/>}/>
      <Route path='Shop/address' element={<Address/>}/>
      <Route path="Shop/checkout" element={<Checkout/>} />
       
      </Routes>
      </BrowserRouter>
       
     </div>
    </>
  )
}

export default App
