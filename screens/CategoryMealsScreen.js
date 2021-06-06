import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "../components/MealItem";

import { CATEGORIES, MEALS } from "../data/dummy-data";

const CategoryMealsScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imageUrl={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
          });
        }}
      />
    );
  };

  const catId = props.route.params.categoryId;

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryId.indexOf(catId) >= 0
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        style={{ width: "100%", padding: 15 }}
      />
    </View>
  );
};

// CategoryMealsScreen.navigationOptions = (navigationData) => {
//   const catId = navigationData.route.params.categoryId;

//   const selectedCategory = CATEGORIES.find((category) => category.id === catId);

//   return {
//     headerTitle: selectedCategory.title,
//   };
// };

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
