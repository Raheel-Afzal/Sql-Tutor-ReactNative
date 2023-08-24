import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, navigate } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IP from '../../IP';

const Teacherlogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    if (userData) {
      const { Temail, Tpassword } = userData;
    }
  }, [userData]);

  const handleLogin = async () => {

    // Perform API call to verify login credentials
    let response = await fetch(`${IP}/Teacher/Login?Temail=${email}&Tpassword=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let json = await response.json()
    console.log(json)
    navigation.navigate('Teacherdashboard');
  };

  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>BIIT DATABASE TUTOR</Text>
        </View>
        <Image source={require('../../images/bitlogo.jpg')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a0a0a0"
          onChangeText={setEmail}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#a0a0a0"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>
            <Text>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    marginBottom: 50,
    margin: 38,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 150,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 5,
    fontWeight: 'bold',
  },
  showPassword: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4682B4',
    width: '80%',
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default Teacherlogin;
