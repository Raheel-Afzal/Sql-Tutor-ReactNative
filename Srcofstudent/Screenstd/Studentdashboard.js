import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Url } from '../../constants';
const Stddashboard = ({ navigation, route }) => {
  console.log(route.params.paramKey, 'login data')
  console.log(route.params, 'login Sid')
  const [studentDetail, setStudentDetail] = useState({})


  const handleAssignmentSolutionPress = () => {
    navigation.navigate('AssignmentSolution', { paramKey: studentDetail });
  };

  const handleResultPress = () => {
    navigation.navigate('Result', { paramKey: studentDetail });
  };

  const handlePracticePress = () => {
    navigation.navigate('Practice');
  };


  const getloginDetail = async () => {
    let response = await fetch(`${Url}/Teacher/GetStudentInfoByEmail?email=${route.params.paramKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response, 'response')
    let json = await response.json()
    console.log(json, 'json')
    setStudentDetail(json)
  }
  useEffect(() => {
    getloginDetail()
  }, [route.params.paramKey])


  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Student Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewAss',{studentDetail})}>
          <Text style={styles.buttonText}>New Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAssignmentSolutionPress}>
          <Text style={styles.buttonText}>Assignment Solutions</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={handleAssignmentSolutionPress}>
          <Text style={styles.buttonText}>My Assignment</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={handleResultPress}>
          <Text style={styles.buttonText}>My Result</Text>
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
