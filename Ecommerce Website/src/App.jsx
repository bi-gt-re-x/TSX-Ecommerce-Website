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

    const loadCart = async () => {
        const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
    };

    useEffect(() => {
        loadCart();
    }, []);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then((response) => {
            setProducts(response.data);
        });
    }, []);

    return (
        <Routes>
            <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
            <Route path="checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
            <Route path="orders" element={<OrdersPage  cart={cart} products={products} />}/>
            <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} products={products} />} />
        </Routes>
    )
}

export default App
