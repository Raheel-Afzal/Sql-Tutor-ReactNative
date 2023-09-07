import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { COLORS, Url } from '../../constants';
import { useIsFocused } from '@react-navigation/native';

const Newassignments = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const [queryData, setQueryData] = useState([]);

  const { Sid, Semester, Section } = route.params.studentDetail
  console.log('studentDetail: ', route);
  const [assignments, setAssignments] = useState([]);

  const handleOpenFile = (file) => {
    console.log('file: ', file);
    // const downloadUrl = `${Url}/Student/DownloadAssignment?assignmentId=${assignmentId}`;

    Linking.openURL(`http://192.168.18.252/FYPAPI/Uploads/${file}`);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(`${Url}/Student/GetAssgs?Smester=${Semester}&section=${Section}`);
        const data = await response.json();
        const sortedAssignments = data.sort((a, b) => a.AssignmentNumber - b.AssignmentNumber);
        console.log('sortedAssignments: ', sortedAssignments);
        // console.log('sortedAssignments: ', sortedAssignments);

        // Update state with the fetched data
        setAssignments(sortedAssignments);


      } catch (error) {
        console.error("Error fetching data:>>>", error);
      }
    };
    if (Semester && Section)
      fetchData();
  }, [Semester, Section]);

  const isOverDue = (Deadline) => {
    if (new Date(Deadline) < new Date()) {
      return true
    }
    else {
      return false
    }
  }


  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>New Assignments</Text>
        <ScrollView style={styles.assignmentScrollView}>
          {assignments.map((assignment, index) => (
            <View key={index} >
              <View style={styles.assignmentBox}>
                <Text style={styles.assignmentNumber}>{assignment.Title}</Text>
                <Text style={styles.assignmentInfo}>Due Data: {isOverDue(assignment.Deadline) ? "Due Date is Over" : new Date(assignment.Deadline).toLocaleDateString()}</Text>
                <Text style={styles.assignmentInfo}>Database {assignment.DatabaseName}</Text>
                <TouchableOpacity onPress={() => handleOpenFile(assignment.assignFile)}>
                  <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={isOverDue(assignment.Deadline)} onPress={() => navigation.navigate('Addnext', { selectedDatabase: assignment.DatabaseName ,aid:assignment.Aid,tid:assignment.Tid,Sid})}>
                  <Text style={[styles.downloadText, { color: isOverDue(assignment.Deadline) ? COLORS.red : COLORS.blueColor }]}>Solve</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
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
    padding: 20,
  },
  header: {
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 100,
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'black',
    textAlign: 'center',
  },
  assignmentScrollView: {
    flex: 1,
  },
  assignmentBox: {
    width: 230,
    height: 185,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  assignmentNumber: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  assignmentInfo: {
    fontSize: 14,
    color: 'black',
  },
  downloadText: {
    color: '#4682B4',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Newassignments;
