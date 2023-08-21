import { Text, View, TouchableOpacity,ImageBackground,StyleSheet } from 'react-native';

const Assignmentquspage = () => {
  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
    <View>
      <Text style={styles.title}>Assignments</Text>
      <Text style={styles.title1}>Assignment 2</Text>
      <Text style={styles.text}>Qno:
        Write a query that show data of all students where age greater than 20?
      </Text>
      <Text style={styles.text}>Qno:Write a query that show data of all students from 7 semester section A and B?  </Text>
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => Navigation.navigate('Studentdashboard')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Navigation.navigate('Solveassignmentpage')}>
          <Text style={styles.buttonText}>Solve</Text>
        </TouchableOpacity>
      </View>
    </View >
      </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 60,
    marginontop:60,
    color:'black',
  },
  title1: {
    fontSize:25 ,
    textAlign: 'center',
    marginontop:30,
  },
  text: {
    margin: 16,
    fontSize:25,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color:'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4682B4',
    padding: 15,
    margin: 30,
    fontSize: 30,
    color:'white',
  },
});

export default Assignmentquspage;
