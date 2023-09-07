import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Teacherdashboard = ({ navigation ,route}) => {
let {userDetail} = route.params
  return (

    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Teacher Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Teacheruploadass',{path:'create' ,userDetail})}>
          <Text style={styles.buttonText}>Upload Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewAssignments',{userDetail})}>
          <Text style={styles.buttonText}>View Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MarkAssignments',{userDetail})}>
          <Text style={styles.buttonText}>Mark Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewStudentMarks',{userDetail})}>
          <Text style={styles.buttonText}>View Student Marks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewTopStudents',{userDetail})}>
          <Text style={styles.buttonText}>View TOP Students</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewStudents',{userDetail})}>
          <Text style={styles.buttonText}>View Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('uploadsol',{userDetail})}>
          <Text style={styles.buttonText}>UpLoad Solution</Text>
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

export default Teacherdashboard;
