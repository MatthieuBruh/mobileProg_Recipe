import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);


  const fetchMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.meals);
      })
      .catch(err => Alert.alert('Error', err.message))
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={recipes}
        renderItem={({item}) =>
          <View >
            <Text style={{fontSize:18, fontWeight: "bold"}} >{item.strMeal}</Text>
            <Image
              style={styles.tinyLogo}
              source={{ uri: `${item.strMealThumb}`, }}
            />
            {listSeparator()}
          </View>
        }
      />
      
      <TextInput
        style={{fontSize:18, width:200}}
        placeholder='keyword'
        onChangeText={text => setKeyword(text)}
      />
      <Button
        title="Search"
        onPress={fetchMeals}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
