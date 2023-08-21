import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Biitdatabasepanel=(props)=>{
  
   const handleTeacherPress = () => {
    props.navigation.navigate('Teacherlogin');
   };

   const handleStudentPress = () => {
     props.navigation.navigate('Studentlogin');
   };

  return (
   <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
       <SafeAreaView style={styles.container}>
         <View style={styles.header}>
           <Text style={styles.headerText}>BIIT DATABASE TUTOR</Text>
         </View>
         <Image source={require('../../images/bitlogo.jpg')} style={styles.image}  />
         <TouchableOpacity style={styles.button} onPress={handleTeacherPress}>
           <Text style={styles.buttonText}>Teacher</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={handleStudentPress}>
           <Text style={styles.buttonText}>Student</Text>
         </TouchableOpacity>
       </SafeAreaView>
  </ImageBackground>
 
  );
}

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
    marginTop: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 90,
    borderRadius: 150,
  },
  button: {
    backgroundColor: '#4682B4',
    width: '80%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    
  },
});
export default Biitdatabasepanel;

