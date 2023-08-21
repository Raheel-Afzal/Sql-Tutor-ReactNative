import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MysqlTutorial = ({ navigation }) => {
  const handleUpPractice = () => {
   navigation.navigate('PracScreen');
  };
  
  const handleOverview = () => {
    navigation.navigate('info');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../images/bgkimage3.png')} style={styles.backgroundImage} />
      <Text style={styles.header}>SQL Tutorial</Text>
      <TouchableOpacity style={styles.button} onPress={handleOverview}>
        <Text style={styles.buttonText}>Overview</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUpPractice}>
        <Text style={styles.buttonText}>Practice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 120,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default MysqlTutorial;
