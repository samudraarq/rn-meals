import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MEALS } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";

const MealDetailScreen = (props) => {
  const mealId = props.route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button
        title="Go back to categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

// MealDetailScreen.navigationOptions = (navigationData) => {
//   const mealId = navigationData.route.params.mealId;
//   const selectedMeal = MEALS.find((meal) => meal.id === mealId);
//   return {
//     headerTitle: selectedMeal.title,
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Favorite"
//           iconName="ios-star"
//           onPress={() => {
//             console.log("Mark as favorite");
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

export default MealDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
