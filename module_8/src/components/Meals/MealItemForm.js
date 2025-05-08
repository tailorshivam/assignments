import React, { useRef, useState } from 'react';
import './MealItemForm.css';
import Input from '../UI/Input';

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [isValid, setIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input-group">
        {/* <label htmlFor={'amount_' + props.id}>Quntity</label> */}
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
          }}
        />
      </div>
      <button className="add-button">
        + Add
      </button>
      {!isValid && <p>Please enter a valid quntity (1–5).</p>}
    </form>
  );
};

export default MealItemForm;
