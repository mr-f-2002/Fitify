import React, { useEffect, useState, useContext} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { GlobalContext } from '../../GlobalState';

const DietScreen = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const meal = generateMealPlan(globalState.height, globalState.weight);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Daily Diet</Text>
      <Text style={styles.category}>({meal.category})</Text>
      <Text style={styles.mealType}>Breakfast Options</Text>
      {meal.breakfast.map((item, index) => (
        <Text key={`breakfast-${index}`} style={styles.mealItem}>{item}</Text>
      ))}
      <Text style={styles.mealType}>Lunch Options</Text>
      {meal.lunch.map((item, index) => (
        <Text key={`lunch-${index}`} style={styles.mealItem}>{item}</Text>
      ))}
      <Text style={styles.mealType}>Dinner Options</Text>
      {meal.dinner.map((item, index) => (
        <Text key={`dinner-${index}`} style={styles.mealItem}>{item}</Text>
      ))}
      <Text style={styles.mealType}>Snacks Options</Text>
      {meal.snacks.map((item, index) => (
        <Text key={`dinner-${index}`} style={styles.mealItem}>{item}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#F8F4E1',
    paddingBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    // color: 'white',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 1
  },
  category: {
    fontSize: 18,
    marginBottom: 30,
    color: '#543310',
    textAlign: 'center',
    // textDecorationLine: 'underline',

  },
  mealType: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    // color: 'white'
  },
  mealItem: {
    fontSize: 14,
    marginBottom: 5,
    // color: 'white',
    width: '100%',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    elevation: 1
  },
});

export default DietScreen;


const generateMealPlan = (height, weight) => {
  const category = getUserCategory(height, weight);
  const mealPlan = bangladeshiMealPlans[category];

  return {
    category: category,
    breakfast: mealPlan.breakfast,
    lunch: mealPlan.lunch,
    dinner: mealPlan.dinner,
    snacks: mealPlan.snacks,
  };
};


const bangladeshiMealPlans = {
  'Very Low Calorie': {
    breakfast: [
      'Panta Bhat with Chutney',
      'Chirer Panta (soaked flattened rice) with Lemon',
      'Doi Chira (flattened rice with yogurt)',
    ],
    lunch: [
      'Rui Fish Curry with Brown Rice and Vegetable Bhaji',
      'Lentil Soup with Mixed Vegetables',
      'Grilled Fish with Quinoa and Salad',
    ],
    dinner: [
      'Masoor Dal with Mixed Vegetable Stew',
      'Vegetable Pulao with Cucumber Raita',
      'Chicken Soup with Spinach',
    ],
    snacks: ['Jhal Muri', 'Cucumber Slices', 'Fruit Salad', 'Sprout Salad'],
  },
  'Low Calorie': {
    breakfast: [
      'Paratha with Aloo Bhaji',
      'Mughlai Paratha with Chutney',
      'Vegetable Omelette with Whole Wheat Bread',
    ],
    lunch: [
      'Chicken Curry with Basmati Rice and Spinach Bhaji',
      'Mutton Curry with Brown Rice and Salad',
      'Prawn Malai Curry with Vegetable Fried Rice',
    ],
    dinner: [
      'Khichuri with Eggplant Fry',
      'Beef Curry with Mixed Vegetables and Rice',
      'Chicken Biryani with Boiled Egg and Salad',
    ],
    snacks: ['Fruit Chaat', 'Nuts and Raisins', 'Chana Chaat', 'Vegetable Pakoras'],
  },
  'Moderate Calorie': {
    breakfast: [
      'Chirer Polao',
      'Luchi with Aloo Dum',
      'Chicken Sandwich with Mayo and Lettuce',
    ],
    lunch: [
      'Beef Bhuna with Pulao and Green Salad',
      'Fish Korma with Ghee Rice',
      'Chicken Rezala with Biryani and Salad',
    ],
    dinner: [
      'Biriyani with Raita',
      'Prawn Curry with Jeera Rice',
      'Beef Tehari with Tomato Salad',
    ],
    snacks: ['Samosa', 'Mishti Doi', 'Chicken Patties', 'Narkel Naru'],
  },
  'High Calorie': {
    breakfast: [
      'Pancakes with Honey and Nuts',
      'Khichuri with Fried Eggs',
      'Misti Doi with Fruits',
    ],
    lunch: [
      'Mutton Tehari with Salad',
      'Chicken Polao with Mixed Vegetables',
      'Fish Bhuna with Steamed Rice',
    ],
    dinner: [
      'Prawn Biryani with Raita',
      'Kacchi Biryani with Salad',
      'Chicken Roast with Fried Rice',
    ],
    snacks: ['Chingri Malai Curry', 'Chapati with Ghee', 'Peanut Brittle'],
  },
  'Very High Calorie': {
    breakfast: [
      'Halwa Poori',
      'Bhapa Pitha',
      'Ruti with Ghee and Sugar',
    ],
    lunch: [
      'Beef Korma with Butter Naan',
      'Duck Curry with Sticky Rice',
      'Korma Polao with Pickles',
    ],
    dinner: [
      'Kacchi Biryani with Borhani',
      'Mutton Curry with Fried Rice',
      'Butter Chicken with Naan',
    ],
    snacks: ['Gulab Jamun', 'Roshogolla', 'Chomchom', 'Pithas'],
  },
  'Ultra High Calorie': {
    breakfast: [
      'Luchi with Kosha Mangsho',
      'Misti Doi with Gurer Shondesh',
      'Paratha with Butter Chicken',
    ],
    lunch: [
      'Beef Bhuna with Butter Naan',
      'Prawn Malai Curry with Basmati Rice',
      'Mutton Rogan Josh with Fried Rice',
    ],
    dinner: [
      'Biryani with Shami Kebab',
      'Chicken Rezala with Pulao',
      'Kacchi Biryani with Keema Nan',
    ],
    snacks: ['Laddu', 'Chhena Jalebi', 'Malpua', 'Roshogolla'],
  },
};


const getUserCategory = (height, weight) => {
  const bmi = weight / (height ** 2);
  if(bmi<15){
    return 'Ultra High Calorie';
  }else if (bmi >= 15 && bmi < 18.5) {
    return 'Very High Calorie'; // Underweight
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'High Calorie'; // Normal weight
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Moderate Calorie'; // Overweight
  } else if (bmi >= 30 && bmi < 34.9) {
    return 'Low Calorie'; // Obesity Class 1
  } else if (bmi >= 35 && bmi < 39.9) {
    return 'Very Low Calorie'; // Obesity Class 2
  } else {
    return 'Ultra High Calorie'; // Obesity Class 3
  }
};
