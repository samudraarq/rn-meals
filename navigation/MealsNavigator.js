import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Colors from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import { CATEGORIES, MEALS } from "../data/dummy-data";

const stackScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const MealsNavigatorStack = createStackNavigator();

const MealsNavigator = () => {
  return (
    <MealsNavigatorStack.Navigator screenOptions={stackScreenOptions}>
      <MealsNavigatorStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={({ navigation }) => {
          return {
            title: "Meal Categories",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <MealsNavigatorStack.Screen
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
      <MealsNavigatorStack.Screen
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
    </MealsNavigatorStack.Navigator>
  );
};

const FavNavigatorStack = createStackNavigator();

const FavoriteNavigator = () => {
  return (
    <FavNavigatorStack.Navigator screenOptions={stackScreenOptions}>
      <FavNavigatorStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => {
          return {
            title: "Your Favorites",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <FavNavigatorStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
      />
    </FavNavigatorStack.Navigator>
  );
};

const FilterNavigatorStack = createStackNavigator();

const FilterNavigator = () => {
  return (
    <FilterNavigatorStack.Navigator>
      <FilterNavigatorStack.Screen
        name="Filters"
        component={FiltersScreen}
        options={({ navigation }) => {
          return {
            title: "Filter Meals",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </FilterNavigatorStack.Navigator>
  );
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const MealsFavNavigator = () => {
  return (
    <MealsFavTabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: (tabInfo) => {
          let iconName;
          if (route.name === "Meals") {
            iconName = "ios-restaurant";
          } else if (route.name === "Favorite") {
            iconName = "ios-star";
          }
          return (
            <Ionicons
              name={iconName}
              color={tabInfo.color}
              size={tabInfo.size}
            />
          );
        },
      })}
    >
      <MealsFavTabNavigator.Screen name="Meals" component={MealsNavigator} />
      <MealsFavTabNavigator.Screen
        name="Favorite"
        component={FavoriteNavigator}
      />
    </MealsFavTabNavigator.Navigator>
  );
};

const MainNavigatorDrawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <MainNavigatorDrawer.Navigator>
      <MainNavigatorDrawer.Screen
        name="MealsFavs"
        component={MealsFavNavigator}
      />
      <MainNavigatorDrawer.Screen name="Filters" component={FilterNavigator} />
    </MainNavigatorDrawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
