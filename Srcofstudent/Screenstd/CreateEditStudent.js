import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,

} from 'react-native';
import { CustomInput } from '../../components/CustomInput';
import { COLORS, Url } from '../../constants';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';


const CreateEditStudent = ({ route, navigation }) => {

  const { path } = route.params;
  const isFocused = useIsFocused()
  const [studentData, setStudentData] = useState({
    Sid: '',
    Fname: '',
    Lname: '',
    Semester: '',
    Section: '',
    Semail: '',
    Spassword: ''
  });


  const handleUpdate = async () => {
    try {
      delete studentData.Sid
      await axios.put(`${Url}/Teacher/UpdateStudentInfo?Sid=${studentData.Sid}`, studentData).then((data) => console.log('data', data));
      alert('Student record updated successfully!');
    } catch (error) {
      console.error('Error updating student record:', error);
    }
    navigation.pop()
  };

  const handleCreate = () => {

    if (Object.values(studentData).includes('') || Object.values(studentData).includes(null)) {
      alert('Please fill in all fields before saving.');
      return;
    }

    axios
      .post(`${Url}/Teacher/AddStudent`, studentData)
      .then((response) => {
        console.log(response);
        alert('Data added successfully!');
        navigation.goBack()
      })
      .catch((error) => {
        alert('try again!');
      });

  };


  useEffect(() => {
    if (path === 'Edit') {
      setStudentData(route.params.studentData)
    }
  }, [isFocused])

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headerText}>Add New Student</Text>
      <CustomInput placeholder={'Student ID'} value={studentData.Sid?.toString()} onChangeText={path === 'Create' ? (newText) => setStudentData(curr => ({ ...curr, Sid: newText })) : () => { }} />
      <CustomInput placeholder={'First Name'} value={studentData.Fname} onChangeText={(newText) => setStudentData(curr => ({ ...curr, Fname: newText }))} />
      <CustomInput placeholder={'Last Name'} value={studentData.Lname} onChangeText={(newText) => setStudentData(curr => ({ ...curr, Lname: newText }))} />
      <CustomInput placeholder={'Semester'} value={studentData.Semester} onChangeText={(newText) => setStudentData(curr => ({ ...curr, Semester: newText }))} />
      <CustomInput placeholder={'Section'} value={studentData.Section} onChangeText={(newText) => setStudentData(curr => ({ ...curr, Section: newText }))} />
      <CustomInput placeholder={'Email'} value={studentData.Semail} onChangeText={(newText) => setStudentData(curr => ({ ...curr, Semail: newText }))} />
      <CustomInput placeholder={'Password'} value={studentData.Spassword} onChangeText={(newText) => setStudentData(curr => ({ ...curr, Spassword: newText }))} />
      <View style={styles.actionBtnContainer}>
        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => { navigation.pop() }}>
          <Text style={styles.actionBtnText} >Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => path === 'Edit' ? handleUpdate() : handleCreate()}>
          <Text style={styles.actionBtnText} >{path === 'Edit' ? 'Update SAVE' : 'Add Student'}</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};


export default CreateEditStudent;
const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,

  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 700,
    alignSelf: 'center',
    marginVertical: 20
  },
  itemContainer: {
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#00000080',
    elevation: 5,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    backgroundColor: COLORS.secondry,
    marginVertical: 12,
    paddingVertical: 10,


  },
  actionBtnContainer: {
    flexDirection: 'row',
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },
  actionBtn: {
    alignSelf: 'center',
    borderRadius: 12,
    width: 120,
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
})
