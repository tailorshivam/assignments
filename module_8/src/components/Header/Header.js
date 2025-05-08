import React from 'react';
import './Header.css';

const Header = ({ onShowCart }) => {
  return (
    <header className="header">
      <h1>ReactEats</h1>
      <button className="cart-button" onClick={onShowCart}>
        🛒 Your Cart
      </button>
    </header>
  );
};

export default Header;
