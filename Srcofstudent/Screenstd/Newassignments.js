import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native';

const Newassignments = ({ navigation }) => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Assignment 1', checked: false, url: 'https://gbihr.org/images/docs/test.pdf', Database: 'FYP2', lastDate: '2023-06-08 18:00PM' },
    { id: 2, title: 'Assignment 2', checked: false, url: 'https://filesamples.com/formats/pdf', Database: 'Task1',  lastDate: '2023-06-10 14:00PM' },
    { id: 3, title: 'Assignment 3', checked: false, url: 'https://www.ucd.ie/t4cms/Test%20PDF-8mb.pdf', Database: 'Task2', lastDate: '2023-06-13 12:00AM' },
    { id: 4, title: 'Assignment 4', checked: false, url: 'https://icseindia.org/document/sample.pdf', Database: 'Task3', lastDate: '2023-06-16 20:00AM' },
    { id: 5, title: 'Assignment 5', checked: false, url: 'https://www.novapdf.com/wpub/downloads/samples/pdf-example-bookmarks.pdf', Database: 'Task4', lastDate: '2023-06-18 16:00PM' },
    { id: 6, title: 'Assignment 6', checked: false, url: 'https://assets.website-files.com/6026a1a0afd16a6f17bbfd66/60ab82e17fc04754ed61773a_dummy.pdf', Database: 'Task5', lastDate: '2023-03-08 11:00PM' },
    { id: 7, title: 'Assignment 7', checked: false, url: 'SampleDocs-sample-pdf-file.pdf', Database: 'Task6', lastDate: '2023-09-08 22:00PM' },
  ]);

  const handleOpenFile = (url) => {
    // Perform any desired action when a file is opened
    // For now, open the URL in the device's default browser
    Linking.openURL(url);
  };
  const handlesolve = () => {
     navigation.navigate('Editpage');
   };

  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Assignments</Text>
        <Text style={styles.title}>New Assignments</Text>
        <ScrollView style={styles.assignmentScrollView}>
          {assignments.map((assignment) => (
            <TouchableOpacity key={assignment.id} onPress={() => handleOpenFile(assignment.url)}>
              <View style={styles.assignmentBox}>
                <Text style={styles.assignmentNumber}>{assignment.title}</Text>
                <Text style={styles.assignmentInfo}>URL: {assignment.url}</Text>
                <Text style={styles.assignmentInfo}>Database {assignment.Database}</Text>
                <Text style={styles.assignmentInfo}>Last Date: {assignment.lastDate}</Text>
                <TouchableOpacity onPress={() => handleOpenFile(assignment.url)}>
                  <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={handlesolve}>
           <Text style={styles.downloadText}>Solve</Text>
         </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
