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
import { COLORS, Url, formatDate } from '../../constants';
import { Button } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';

const TeacherUploadAssTask1 = ({ navigation }) => {
  const initialAssignment = {
    AssignmentNumber: '',
    Title: '',
    QuestionText: '',
    Deadline: new Date(),
    Section: '', // Initialize Section as an empty string
    semester: '', // Initialize semester as an empty string
    file: null,
  };

  const [assignment, setAssignment] = useState(initialAssignment);
  const [selectedSections, setSelectedSections] = useState([]); // Store selected sections in an array
  const [selectedSemesters, setSelectedSemesters] = useState([]); // Store selected semesters in an array

  const uploadAssignment = () => {
    // Create form data
    const formData = new FormData();
    formData.append('DatabaseName', 'FYPDB');

    // Add other assignment data to the formData object
    for (const key in assignment) {
      key === 'Deadline'
        ? formData.append(key, formatDate(assignment[key]))
        : formData.append(key, assignment[key]);
    }

    // Append selected sections and semesters to formData
    formData.append('Section', selectedSections.join(', ')); // Convert selectedSections array to a comma-separated string
    formData.append('semester', selectedSemesters.join(', ')); // Convert selectedSemesters array to a comma-separated string

    console.log('formData', formData);

    // Send a POST request to the API endpoint
    fetch(`${Url}/Teacher/AssgmentEntry`, {
      method: 'POST',
      body: formData,
    }).then(response => console.log('response', response));
  };

  const sectionOptions = ['A', 'B', 'C', 'D']; // List of section options
  const semesterOptions = ['1', '2', '3', '4', '5', '6', '7', '8']; // List of semester options

  return (
    <View style={styles.screenContainer}>
      <CustomInput
        placeholder={'Enter Title'}
        value={assignment.Title}
        onChangeText={(newText) =>
          setAssignment((curr) => ({ ...curr, Title: newText }))
        }
      />
      <CustomInput
        placeholder={'Enter Assignment No'}
        value={assignment.AssignmentNumber}
        onChangeText={(newText) =>
          setAssignment((curr) => ({ ...curr, AssignmentNumber: newText }))
        }
      />

      <DatePicker
        style={styles.itemContainer}
        date={assignment.Deadline}
        onDateChange={(newDate) =>
          setAssignment((curr) => ({ ...curr, Deadline: newDate }))
        }
      />

      <DocumentPickerField file={assignment.file} setFile={setAssignment} />

      {/* Section checkboxes */}
      <Text>Section:</Text>
      {sectionOptions.map((section, index) => (
        <View key={index}>
          <CheckBox
            value={selectedSections.includes(section)}
            onValueChange={(newValue) => {
              const updatedSections = selectedSections.slice(); // Create a copy of the selectedSections array
              if (newValue) {
                updatedSections.push(section);
              } else {
                const sectionIndex = updatedSections.indexOf(section);
                if (sectionIndex !== -1) {
                  updatedSections.splice(sectionIndex, 1);
                }
              }
              setSelectedSections(updatedSections); // Update the selectedSections array
            }}
          />
          <Text>{section}</Text>
        </View>
      ))}

      {/* Semester checkboxes */}
      <Text>Semester:</Text>
      {semesterOptions.map((semester, index) => (
        <View key={index}>
          <CheckBox
            value={selectedSemesters.includes(semester)}
            onValueChange={(newValue) => {
              const updatedSemesters = selectedSemesters.slice(); // Create a copy of the selectedSemesters array
              if (newValue) {
                updatedSemesters.push(semester);
              } else {
                const semesterIndex = updatedSemesters.indexOf(semester);
                if (semesterIndex !== -1) {
                  updatedSemesters.splice(semesterIndex, 1);
                }
              }
              setSelectedSemesters(updatedSemesters); // Update the selectedSemesters array
            }}
          />
          <Text>{semester}</Text>
        </View>
      ))}

      <Button title={'Upload'} raised onPress={() => uploadAssignment()} />
    </View>
  );
};

export default TeacherUploadAssTask1;
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
