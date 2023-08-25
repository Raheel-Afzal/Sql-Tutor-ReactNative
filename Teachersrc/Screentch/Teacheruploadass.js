import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,

} from 'react-native';
import { CustomInput } from '../../components/CustomInput';
import DocumentPickerField from '../../components/DocumentPicker';
import DatePicker from 'react-native-date-picker'
import { COLORS, Url } from '../../constants';
import { Button } from 'react-native-elements';


const Teacheruploadass = ({ navigation }) => {

  const initialAssignment = {
    AssignmentNumber: '',
    Title: '',
    QuestionText: '',
    Deadline: new Date(),
    // DatabaseName: '',
    Section: '',
    semester: '',
  };


  const [assignment, setAssignment] = useState(initialAssignment);
  const [file, setFile] = useState(null);

  const uploadAssignment = () => {

    setAssignment((curr) => ({ ...curr, QuestionText: file.name }))
    // Create form data
    const formData = new FormData();
    formData.append('DatabaseName', 'FYPDB')
    formData.append('file', file);

    // Add other assignment data to the formData object
    for (const key in assignment) {
      formData.append(key, assignment[key]);
    }
    console.log('formData', formData)
    // Send a POST request to the API endpoint
    fetch(`${Url}/Teacher/AssgmentEntry`, {
      method: 'POST',
      body: formData,
    }).then(response => console.log('response', response))


  };

  return (
    <View style={styles.screenContainer}>
      <CustomInput placeholder={'Enter Title'} value={assignment.Title} onChangeText={(newText) => setAssignment(curr => ({ ...curr, Title: newText }))} />
      <CustomInput placeholder={'Enter Assignment No'} value={assignment.AssignmentNumber} onChangeText={(newText) => setAssignment(curr => ({ ...curr, AssignmentNumber: newText }))} />
      <CustomInput placeholder={'Enter Section'} value={assignment.Section} onChangeText={(newText) => setAssignment(curr => ({ ...curr, Section: newText }))} />
      <CustomInput placeholder={'Enter Semester'} value={assignment.semester} onChangeText={(newText) => setAssignment(curr => ({ ...curr, semester: newText }))} />
      <DatePicker style={styles.itemContainer} date={assignment.Deadline} onDateChange={(newDate) => { setAssignment(curr => ({ ...curr, Deadline: newDate })) }} />
      <DocumentPickerField file={file} setFile={setFile} />
      <Button title={"Upload"} raised onPress={() => uploadAssignment()} />
    </View>
  );
};


export default Teacheruploadass;
const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 700,
    color: 'white',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#394791',
    textAlign: 'center',
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
})
