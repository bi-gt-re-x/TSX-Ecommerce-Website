import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/Homepage/HomePage.jsx';
import { CheckoutPage } from './Pages/Checkout/CheckoutPage.jsx';
import { OrdersPage } from './Pages/Orders/OrdersPage.jsx';
import { TrackingPage } from './Pages/Tracking/TrackingPage.jsx';
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

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then((response) => {
            setProducts(response.data);
        });
    }, []);

    return (
        <Routes>
            <Route index element={<HomePage cart={cart} />} />
            <Route path="checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
            <Route path="orders" element={<OrdersPage  cart={cart} products={products} />}/>
            <Route path="tracking" element={<TrackingPage />} />
        </Routes>
    )
}

export default App
