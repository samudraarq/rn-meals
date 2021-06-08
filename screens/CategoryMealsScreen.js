import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

import MealList from "../components/MealList";

const CategoryMealsScreen = (props) => {
  const catId = props.route.params.categoryId;

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryId.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
