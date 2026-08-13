import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/HomePage.jsx';
import { CheckoutPage } from './Pages/Checkout/CheckoutPage.jsx';
import { OrdersPage } from './Pages/OrdersPage.jsx';
import { TrackingPage } from './Pages/TrackingPage.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('/api/cart-items?expand=product').then((response) => {
            setCart(response.data);
        });
    }, []);

    return (
        <Routes>
            <Route index element={<HomePage cart={cart} />} />
            <Route path="checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
            <Route path="orders" element={<OrdersPage  cart={cart} />}/>
            <Route path="tracking" element={<TrackingPage />} />
        </Routes>
    )
}

export default App
