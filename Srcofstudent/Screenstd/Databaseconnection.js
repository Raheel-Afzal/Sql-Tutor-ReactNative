import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { Url } from '../../constants';

const Databaseconnection = ({ navigation }) => {
  const isFocused = useIsFocused()

  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  useEffect(() => {
    // Fetch list of databases
    fetch(`${Url}/Teacher/GetDatabaseList`)
      .then(response => response.json())
      .then(data => setDatabases(data))
      .catch(error => console.error(error));
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../images/bgkimage3.png')}
        style={styles.image}
      >
        <Text style={styles.header}>DATABASE CONNECTION</Text>

        <View style={styles.dropdownContainer}>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedDatabase}
            onValueChange={(newValue) => setSelectedDatabase(newValue)}
          >
            {databases.map((dataBaseName, index) => (
              <Picker.Item key={index} label={dataBaseName} value={dataBaseName} />
            ))}

          </Picker>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Addnext', { selectedDatabase })}>
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: 420,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  dropdownContainer: {
    flexDirection: 'column',
    marginBottom: 0,
  },
  dropdown: {
    height: 50,
    width: 170,
    marginHorizontal: 10,
    color: '',
    backgroundColor: 'grey',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,

  },
  button: {
    backgroundColor: '#4682B4',
    width: '140%',
    height: 30,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default Databaseconnection;
