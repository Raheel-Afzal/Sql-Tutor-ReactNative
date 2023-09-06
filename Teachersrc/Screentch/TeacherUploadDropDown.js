import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {CustomInput} from '../../components/CustomInput';
import DocumentPickerField from '../../components/DocumentPicker';
import DatePicker from 'react-native-date-picker';
import {COLORS, Url, formatDate} from '../../constants';
import {Button} from 'react-native-elements';

const TeacherUploadDropDown = ({navigation}) => {
  const initialAssignment = {
    AssignmentNumber: '',
    Title: '',
    QuestionText: '',
    Deadline: new Date(),
    // DatabaseName: '',
    Section: '',
    semester: '',
    file: null,
  };

  const [assignment, setAssignment] = useState(initialAssignment);
  // const [file, setFile] = useState(null);
  const section = [
    {id: 1, section: 'A'},
    {id: 2, section: 'B'},
    {id: 3, section: 'C'},
    {id: 4, section: 'D'},
  ];
  const semesters = [
    {id: 1, semesterr: "1"},
    {id: 2, semesterr: "2"},
    {id: 3, semesterr: "3"},
    {id: 4, semesterr: "4"},
    {id: 5, semesterr: "5"},
    {id: 6, semesterr: "6"},
    {id: 7, semesterr: "7"},
    {id: 8, semesterr: "8"},
  ];
  const uploadAssignment = () => {
    // Create form data

    const formData = new FormData();
    formData.append('DatabaseName', 'FYPDB');

    // Add other assignment data to the formData object
    for (const key in assignment) {
      key == 'Deadline'
        ? formData.append(key, formatDate(assignment[key]))
        : formData.append(key, assignment[key]);
    }
    console.log('formData', formData);
    // Send a POST request to the API endpoint
    fetch(`${Url}/Teacher/AssgmentEntry`, {
      method: 'POST',
      body: formData,
    }).then(response => console.log('response', response));
  };

  return (
    <View style={styles.screenContainer}>
      <CustomInput
        placeholder={'Enter Title'}
        value={assignment.Title}
        onChangeText={newText =>
          setAssignment(curr => ({...curr, Title: newText}))
        }
      />
      <CustomInput
        placeholder={'Enter Assignment No'}
        value={assignment.AssignmentNumber}
        onChangeText={newText =>
          setAssignment(curr => ({...curr, AssignmentNumber: newText}))
        }
      />
      {/* <CustomInput placeholder={'Enter Section'} value={assignment.Section} onChangeText={(newText) => setAssignment(curr => ({ ...curr, Section: newText }))} /> */}
      <Picker
        style={{
          backgroundColor: 'blue',
          color: 'white',
          width: 290,
          left: 0,
          top: 20,
        }}
        selectedValue={assignment.Section}
        onValueChange={newText =>
          setAssignment(curr => ({...curr, Section: newText}))
        }>
        {section.map(data => {
          return (
            <Picker.Item
              key={data?.id}
              label={data?.section}
              value={data?.section}
            />
          );
        })}
      </Picker>
      <Picker
        style={{
          backgroundColor: 'blue',
          color: 'white',
          width: 290,
          left: 0,
          top: 30,
        }}
        selectedValue={assignment.semester}
        onValueChange={newText =>
          setAssignment(curr => ({...curr, semester: newText}))
        }>
        {semesters.map(data => {
          return (
            <Picker.Item
              key={data?.id}
              label={data?.semesterr}
              value={data?.semesterr}
            />
          );
        })}
      </Picker>
      {/* <CustomInput
        placeholder={'Enter Semester'}
        value={assignment.semester}
        onChangeText={newText =>
          setAssignment(curr => ({...curr, semester: newText}))
        }
      /> */}
      <DatePicker
        style={styles.itemContainer}
        date={assignment.Deadline}
        onDateChange={newDate => {
          setAssignment(curr => ({...curr, Deadline: newDate}));
        }}
      />
      <DocumentPickerField file={assignment.file} setFile={setAssignment} />
      <Button title={'Upload'} raised onPress={() => uploadAssignment()} />
    </View>
  );
};

export default TeacherUploadDropDown;
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
    marginVertical: 20,
  },
  itemContainer: {
    marginRight: 10,
    marginTop:50,
    alignItems: 'center',
    shadowColor: '#00000080',
    elevation: 5,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.26,
    backgroundColor: COLORS.secondry,
    marginVertical: 12,
    paddingVertical: 10,
  },
});
