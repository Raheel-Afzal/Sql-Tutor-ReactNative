import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { COLORS, Url } from '../../constants';
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';

const ViewAssignments = ({ navigation }) => {

  const isFocused = useIsFocused()
  const [students, setStudents] = useState([])


  const handleDelete = (sid) => {
    console.log('selectedSid: ',);
    axios.delete(`${Url}/Teacher/DeleteStudent?Sid=${sid}`)
      .then(response => {
        alert('Student deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      }).then(() => {
        getStudents()
      })
  };


  const getStudents = () => {

    axios.get(`${Url}/Teacher/GetTStudentInfo`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  useEffect(() => {
    getStudents()
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>View Student</Text>
      <ScrollView style={styles.scrollView}>
        {students.map((student) => (
          <TouchableOpacity
            key={student.Sid}
            style={styles.assignmentContainer}
          >
            <View style={styles.assignmentBox}>
              <Text style={styles.titleText}>{`${student.Fname} ${student.Lname}`}</Text>
              <Text style={styles.descriptionText}>{student.Email}</Text>
              <Text style={styles.dateText}>Email: {student.Semail}</Text>
              <Text style={styles.dateText}>Semester: {student.Semester}</Text>
              <Text style={styles.fileURLText}>Section: {student.Section}</Text>
              <View style={styles.actionBtnContainer}>
                <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => { navigation.navigate('CreateEditStudent', { path: 'Edit', studentData: student }) }}>
                  <Text style={styles.actionBtnText} >Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(student.Sid)}>
                  <Text style={styles.actionBtnText} >Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomBtn}>
        <TouchableOpacity style={[styles.actionBtn, { width: 100, backgroundColor: COLORS.blueColor }]} onPress={() => navigation.goBack()} >
          <Text style={styles.actionBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.editBtn, { width: 150 }]} onPress={() => navigation.navigate('CreateEditStudent', { path: 'Create' })}>
          <Text style={styles.actionBtnText} >Add New Student +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  actionBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center'
  },
  actionBtn: {
    borderRadius: 12,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10
  },
  actionBtnText: {
    color: COLORS.secondry
  },
  editBtn: {
    backgroundColor: COLORS.green
  },
  deleteBtn: {
    backgroundColor: COLORS.red
  },
  bottomBtn: {
    marginVertical: 10,
    flexDirection: 'row',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  assignmentContainer: {
    marginBottom: 10,
  },
  assignmentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  descriptionText: {
    fontSize: 14,
    color: 'white',
  },
  dateText: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  fileURLText: {
    fontSize: 15,
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  downloadText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ViewAssignments;
