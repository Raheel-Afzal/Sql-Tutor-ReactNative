import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MSSQL from 'react-native-mssql';

const Databaseconnection = (props) => {
  const [database, setDatabase] = useState('');
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.137.207/FYPAPI/api/Student/GetAllDatabases');
        const jsonData = await response.json();
        setDatabases(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

   const handleStudentPress = () => {
     props.navigation.navigate('Addnext');
   };

  const handleDatabaseChange = (itemValue) => {
    setDatabase(itemValue);
    setSelectedDatabase(databases.find(db => db.name === itemValue));
  };

  const renderDatabaseOptions = () => {
    return databases.map((db, index) => (
      <Picker.Item key={index} label={db.name} value={db.name} />
    ));
  };

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
            selectedValue={database}
            onValueChange={handleDatabaseChange}
          >
            <Picker.Item label=" DATABASE" value="" />
            <Picker.Item label="FYP2" value="FYP2" />
            {renderDatabaseOptions()}
          </Picker>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleStudentPress}>
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
    color: 'black',
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
