import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../context/cart-context';
import './Cart.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <li key={item.id} className="cart-item">
          <div>
            <h2>{item.name}</h2>
            <div className="summary">
              <span className="price">${item.price.toFixed(2)}</span>
              <span className="amount">x {item.amount}</span>
            </div>
          </div>
          <div className="actions">
            <button onClick={() => cartItemRemoveHandler(item.id)}>-</button>
            <button onClick={() => cartItemAddHandler(item)}>+</button>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className="actions">
        <button className="button--alt" onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className="button">Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
