import React, { useContext } from 'react';
import CartContext from '../../context/cart-context';
import './HeaderCartButton.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const totalItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className="button" onClick={props.onClick}>
      <span>🛒 Your Cart</span>
      <span className="badge">{totalItems}</span>
    </button>
  );
};

export default HeaderCartButton;
