import React, { Component, useState } from "react";

function FunctionalCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Functional Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
    </div>
  );
}

export default FunctionalCounter;