import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Stddashboard = (props) => {
  const handleNewAssignmentPress = () => {
    props.navigation.navigate('NewAss');
  };

  const handleAssignmentSolutionPress = () => {
    props.navigation.navigate('AssignmentSolution');
  };

  const handleResultPress = () => {
    props.navigation.navigate('Result');
  };

  const handlePracticePress = () => {
    props.navigation.navigate('Practice');
  };

  return (
   <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Student Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNewAssignmentPress}>
          <Text style={styles.buttonText}>New Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAssignmentSolutionPress}>
          <Text style={styles.buttonText}>Assignment Solution</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResultPress}>
          <Text style={styles.buttonText}>Result</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePracticePress}>
          <Text style={styles.buttonText}>Practice</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    
    marginBottom: 100,
    
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4682B4',
    width: '80%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Stddashboard;
