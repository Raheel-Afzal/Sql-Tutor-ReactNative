import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image ,navigate} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Studentlogin = ({ navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    if (userData) {
      const { Semail, Spassword } = userData;

    //  if (Semail === email && Spassword === password) {

      //   console.log('login sueccessfully');
      // } else {
      //   // Invalid email or password
      //   console.log('Invalid email or password');
      // }
    }
  }, [userData]);

  const handleLogin = async () => {
    
    // Perform API call to verify login credentials
    let response = await fetch(`http://192.168.0.113/FYPAPI/api/Student/Login?Semail=${email}&Spassword=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let json = await response.json()
    console.log(json)
    navigation.navigate('Studentdashboard');
      // .then(response => response.json())
      // .then(data => {
      //   if (data.success === true) {
      //     // Fetch user data after successful login
      //     fetch(`http://192.168.2.193/FYPAPI/api/Student/GetUserData`, {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer ${data.token}` // Assuming the server returns an access token
      //       }
      //     })
      //       .then(response => response.json())
      //       .then(userData => {
      //         setUserData(userData);
      //       })
      //       .catch(error => {
      //         console.error('Error fetching user data:', error);
      //       });
      //   } else {
          
      //     console.log('Login unsuccessful');
      //   }
      // })
      // .catch(error => {
      //   console.error('Error performing login:', error);
      // });
    
  };

  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>BIIT DATABASE TUTOR</Text>
        </View>
        <Image source={require('../../images/bitlogo.jpg')} style={styles.image}  />
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
    marginBottom:50,
    margin:38,
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
    Color:'white',
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
    color:'white',
    
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


export default Studentlogin;


