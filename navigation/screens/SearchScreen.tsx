import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import FoodItem from '../../component/FoodItem';
import { getActivity } from '../../api/api';



export default function SearchScreen({navigation}) {
  const  [search, setSearch] = useState('');
  const [items, setItems] = useState();
  // const [items, setItems] = useState([{"Brand": "Tang", "ENERC_KCAL": 41.152955607843815, "FAT": 0, "Label": "Tang Orange Drink Mix, Orange"}, {"Brand": "Tang", "ENERC_KCAL": 0, "FAT": 0, "Label": "Tang Orange Liquid Drink Mix, Caffeine Free, 1.62 fl oz Bottle"}, {"Brand": "Tang", "ENERC_KCAL": 380.95238095238096, "FAT": 0, "Label": "Tang Passion Fruit Drink Passion Fruit"}, {"Brand": "Tang", "ENERC_KCAL": 380.95878905546846, "FAT": 0, "Label": "Tang Drink Powder, Orange, Caffeine Free, 20 oz Jar"}, {"Brand": "Tang", "ENERC_KCAL": 371.42857142857144, "FAT": 0, "Label": "Tang Fruit Punch Drink Mix, Fruit Punch"}]);

  const performSearch = async () => {
    try {
      const { data } = await getActivity({ search });
      setItems(data);
      console.log(data);
      console.log({items})
    } catch (error) {
      console.error('Error:', error.message);
    }
    setSearch('');
  };

  return (
    <View style={styles.container}>
      <View style = {styles.searchContainer}>
        <TextInput  
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={performSearch}
          placeholder="Search..."  
          style={styles.input}
        />
      </View>
      <FlatList
        style={{ height: "100%"}}
        data={items}
        renderItem={({ item }) => <FoodItem item={item} />}
        contentContainerStyle={{ gap: 5 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#FFF2D7',
    marginBottom: 30
  },
  searchContainer:{
    width: '100%',
    flexDirection: 'row',

  },
  input:{
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 4,
    flex: 1,
    color: 'black',
    elevation: 5,
  }
});






/*
128314be -> ID
7f7f3fd18e6cbcbc6e6d78037fe29fbe -> Key
*/ 