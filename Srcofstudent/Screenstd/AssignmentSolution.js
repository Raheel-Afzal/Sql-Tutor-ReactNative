import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native';
import {Url} from '../../constants';
import axios from 'axios';
const AssignmentSolution = ({ navigation,route }) => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Assignment 1', checked: false, url: 'https://gbihr.org/images/docs/test.pdf', topic: ' Outputting Data Order By' , section:'BsCS A' , label:'Fall 2023 Semester 2'},
    { id: 2, title: 'Assignment 2', checked: false, url: 'https://filesamples.com/formats/pdf',  topic: ' Find Intersection of 2 Tables' , section:'BsIT B' , label:'Fall 2023 Semester 6' },
    { id: 3, title: 'Assignment 3', checked: false, url: 'https://www.ucd.ie/t4cms/Test%20PDF-8mb.pdf',  topic: ' Displaying a List of Procedures' , section:'BsIT A' , label:'Fall 2023 Semester 4'},
    { id: 4, title: 'Assignment 4', checked: false, url: 'https://icseindia.org/document/sample.pdf',  topic: ' Modifying and Deleting Tables' , section:' BsAI B' , label:'Fall 2023 Semester 7'},
    { id: 5, title: 'Assignment 5', checked: false, url: 'https://www.novapdf.com/wpub/downloads/samples/pdf-example-bookmarks.pdf',  topic: ' UNION' , section:'BsSE B' , label:'Fall 2023 Semester 3' },
  ]);
  const [assignmentSolution,setAssignmentSolution] = useState([])
  const handleOpenFile = (url) => {
    // Perform any desired action when a file is opened
    // For now, open the URL in the device's default browser
    Linking.openURL(url);
  };
  const handleDownload = (solutionId) => {
    axios({
      url: 'http://localhost/FYPAPI/api/Student/DownloadSolution',
      method: 'GET',
      responseType: 'blob',
      params: {
        solutionId: solutionId,
      },
    })
      .then((response) => {
        // Create a temporary link element
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `solution_${solutionId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading solution:', error);
      });
  };
  const getAssignmentSolution = async () => {
    let response = await fetch(
      `${Url}/Student/GetSolutions?section=${route.params.paramKey.Section}&Semester=${route.params.paramKey.Semester}`,
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
    setAssignmentSolution(json);
  };
  useEffect(() => {
    getAssignmentSolution();
  }, [route.params.paramKey]);
  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Assignment Solutions</Text>
        <ScrollView style={styles.assignmentScrollView}>
          {assignmentSolution.map((assignment) => (
            <TouchableOpacity key={assignment.id} onPress={() => handleOpenFile(assignment.url)}>
              <View style={styles.assignmentBox}>
                <Text style={styles.assignmentNumber}>Assignment{assignment?.AssignmentNumber}</Text>
                {/* <Text style={styles.assignmentInfo}>URL: {assignment.url}</Text>
                <Text style={styles.assignmentInfo}> label:{assignment.label}</Text> */}
                <Text style={styles.assignmentInfo}>Section: {assignment?.Section}</Text>
                <Text style={styles.assignmentInfo}>Semester: {assignment?.Semester}</Text>
                <TouchableOpacity onPress={() => handleDownload(assignment.SolutionId)}>
                  <Text style={styles.downloadText}>Download</Text>
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
  
  assignmentScrollView: {
    flex: 1,
  },
  assignmentBox: {
    width: 350,
    height: 195,
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

export default AssignmentSolution;
