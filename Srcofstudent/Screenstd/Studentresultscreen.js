import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const StudentResultScreen = ({ navigation }) => {
  const student = {
    name: 'Ali Ahmed',
    RegNo: '2023-Arid-7621',
    Email: 'Ali@gmail.com',
  };

  const assignments = [
    { id: 1, title: 'Assignment 1', marks: 2, topic: 'Query with X product', date: 'June 1, 2023' },
    { id: 2, title: 'Assignment 2', marks: 10, topic: 'Query with join', date: 'June 5, 2023' },
    { id: 3, title: 'Assignment 3', marks: 5, topic: 'Query syntax test', date: 'June 10, 2023' },
    { id: 4, title: 'Assignment 4', marks: 8, topic: 'Query with where', date: 'June 15, 2023' },
  ];

  return (
    <View style={styles.container}>
      <Image source={require('../../images/bgkimage3.png')} style={styles.backgroundImage} />
      <Text style={styles.header}>View Result</Text>

      <View style={styles.studentContainer}>
        <Text style={styles.studentInfo}>Name: {student.name}</Text>
        <Text style={styles.studentInfo}>Reg No: {student.RegNo}</Text>
        <Text style={styles.studentInfo}>Email: {student.Email}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {assignments.map((assignment) => (
          <View key={assignment.id} style={styles.assignmentContainer}>
            <Text style={styles.assignmentTitle}>{assignment.title}</Text>
            <Text style={styles.assignmentDetails}>Topic: {assignment.topic}</Text>
            <Text style={styles.assignmentDetails}>Date: {assignment.date}</Text>
            <View style={styles.marksContainer}>
              <View
                style={[styles.marksBox, { backgroundColor: assignment.marks >= 3 ? '#00cc00' : '#ff0000' }]}
              >
                <Text style={styles.marksText}>{assignment.marks}</Text>
              </View>
              <Text style={styles.totalMarks}>/ 10</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    alignItems: 'center',
    paddingBottom: 20,
  },
  assignmentContainer: {
    backgroundColor: '#fff',
    width: '90%',
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
    color: '#fff',
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
