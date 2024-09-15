import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);
        return response.json()
      })
      .then(data => setRepositories(data.meals))
      .catch(err => console.error(err));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />

      <View style={styles.buttonContainer}>
        <Button title="FIND" onPress={handleFetch} />
      </View>

      <FlatList
        data={repositories}
        keyExtractor={(item) => item.idMeal} 
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.mealName}>
              {item.strMeal}
            </Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.mealImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 20,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});