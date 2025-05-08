import React from 'react';
import './Meals.css';
import MealItem from './MealItem';
import DUMMY_MEALS from '../../data/dummy-meals';

const Meals = () => {
  return (
    <section className="meals">
      <ul>
        {DUMMY_MEALS.map((meal) => (
          <MealItem key={meal.id} {...meal} />
        ))}
      </ul>
    </section>
  );
};

export default Meals;