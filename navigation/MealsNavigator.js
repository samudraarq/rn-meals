import React from "react";
import { Platform } from "react-native";

import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

import { CATEGORIES, MEALS } from "../data/dummy-data";

// const MealsNavigator = createStackNavigator(
//   {
//     Categories: CategoriesScreen,
//     CategoryMeals: {
//       screen: CategoryMealsScreen,
//     },
//     MealDetail: MealDetailScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
//       },
//       headerTintColor:
//         Platform.OS === "android" ? "white" : Colors.primaryColor,
//     },
//   }
// );

const Stack = createStackNavigator();

const MealsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
        },
        headerTintColor:
          Platform.OS === "android" ? "white" : Colors.primaryColor,
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Meal Categories" }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => {
          const catId = route.params.categoryId;
          const selectedCategory = CATEGORIES.find(
            (category) => category.id === catId
          );
          return { title: selectedCategory.title };
        }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const mealId = route.params.mealId;
          const selectedMeal = MEALS.find((meal) => meal.id === mealId);
          return {
            title: selectedMeal.title,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Favorite"
                  iconName="ios-star"
                  onPress={() => {
                    console.log("Mark as favorite");
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const MealsFavTabNavigator = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MealsFavTabNavigator.Navigator>
        <MealsFavTabNavigator.Screen name="Meals" component={MealsNavigator} />
        <MealsFavTabNavigator.Screen
          name="Favorite"
          component={FavoriteScreen}
        />
      </MealsFavTabNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
