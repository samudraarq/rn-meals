import React from "react";
import MealList from "../components/MealList";

import { MEALS } from "../data/dummy-data";

const CategoryMealsScreen = (props) => {
  const catId = props.route.params.categoryId;

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryId.indexOf(catId) >= 0
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

export default CategoryMealsScreen;
