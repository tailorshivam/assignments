import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../context/cart-context';
import './MealItem.css';

const MealItem = ({ id, name, description, price }) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({ id, name, amount, price });
  };

  return (
    <li className="meal">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">${price.toFixed(2)}</div>
      </div>
      <MealItemForm id={id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;