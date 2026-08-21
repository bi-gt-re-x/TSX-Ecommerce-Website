import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');


  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const searchProducts = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" alt="Logo" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Mobile Logo" />
        </Link>
      </div>

      <form className="middle-section" onSubmit={searchProducts}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" alt="Search" />
        </button>
      </form>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>
        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
