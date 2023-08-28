import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Url } from '../../constants';
import { FlatList } from 'react-native';
const StudentResultScreen = ({ navigation, route }) => {
  console.log(route.params.paramKey, 'route.params.paramKey');
  const student = {
    name: 'Ali Ahmed',
    RegNo: '2023-Arid-7621',
    Email: 'Ali@gmail.com',
  };
  const [result, setResult] = useState([]);
  console.log(result, 'result');

  const getResult = async () => {
    let response = await fetch(
      `${Url}/Teacher/marks?Sid=${route.params.paramKey.Sid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response, 'response');
    let json = await response.json();
    console.log(json, 'json');
    setResult(json);
  };
  useEffect(() => {
    getResult();
  }, [route.params.paramKey]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/bgkimage3.png')}
        style={styles.backgroundImage}
      />
      <Text style={styles.header}>View Result</Text>

      <View style={styles.studentContainer}>
        <Text style={styles.studentInfo}>
          Name:{' '}
          {route.params.paramKey.Fname + ' ' + route.params.paramKey.Lname}
        </Text>
        {/* <Text style={styles.studentInfo}>Reg No: {student.RegNo}</Text> */}
        <Text style={styles.studentInfo}>
          Email: {route.params.paramKey.Semail}
        </Text>
      </View>

      <FlatList
        data={result}
        renderItem={({ item ,index}) => (
          <View key={index} style={styles.assignmentContainer}>
            <Text>Student {item?.Sid}</Text>
            <Text style={styles.assignmentTitle}>
              {'Assignment' + ' ' + item.AssignmentNumber}
            </Text>

            <View style={styles.marksContainer}>

              <Text style={styles.marksText}>Marks: {item.Amarks}</Text>

            </View>
          </View>
        )}
      />
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
        {result.map((assignment, index) => {
          return (
            <View key={index} style={styles.assignmentContainer}>
              <Text>Student {assignment?.Sid}</Text>
              <Text style={styles.assignmentTitle}>
                {'Assignment' + ' ' + assignment.AssignmentNumber}
              </Text>

              <View style={styles.marksContainer}>

                <Text style={styles.marksText}>Marks: {assignment.Amarks}</Text>

              </View>
            </View>
          );
        })}
      </ScrollView> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // width:"80px",
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  studentContainer: {
    backgroundColor: '#fff',
    width: '60%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  studentInfo: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  scrollContainer: {
    flex: 1
  },
  assignmentContainer: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  assignmentDetails: {
    fontSize: 12,
    marginBottom: 3,
  },
  marksContainer: {
    width: 190,
    flexDirection: 'row',
    alignItems: 'center',
  },
  marksBox: {
    backgroundColor: '#f0f0f0',
    width: 30,
    height: 25,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marksText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  totalMarks: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 19,
    color: '#fff',
  },
});

export default StudentResultScreen;
