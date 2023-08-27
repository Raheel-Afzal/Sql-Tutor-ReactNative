import React, { useEffect, useState } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const Teacheruploadass = ({ navigation }) => {

  const isFocused = useIsFocused()

  const initialAssignment = {
    AssignmentNumber: '',
    Title: '',
    QuestionText: '',
    Deadline: new Date(),
    DatabaseName: '',
    Section: '',
    semester: '',
    file: null
  };

  const [assignment, setAssignment] = useState(initialAssignment);
  const [databasesList, setDatabasesList] = useState([]);


  const uploadAssignment = () => {
    // Create form data

    const formData = new FormData();
    // Add other assignment data to the formData object
    for (const key in assignment) {
      key == 'Deadline' ?
        formData.append(key, formatDate(assignment[key]))
        :
        formData.append(key, assignment[key]);
    }
    console.log('formData', formData)
    // Send a POST request to the API endpoint
    fetch(`${Url}/Teacher/AssgmentEntry`, {
      method: 'POST',
      body: formData,
    }).then(response => console.log('response', response))


  };

  useEffect(() => {
    // Fetch list of databases
    fetch(`${Url}/Teacher/GetDatabaseList`)
      .then(response => response.json())
      .then(data => setDatabasesList(data))
      .catch(error => console.error(error));
  }, [isFocused]);
  
  return (
    <View style={styles.screenContainer}>
      <CustomInput placeholder={'Enter Title'} value={assignment.Title} onChangeText={(newText) => setAssignment(curr => ({ ...curr, Title: newText }))} />
      <CustomInput placeholder={'Enter Assignment No'} value={assignment.AssignmentNumber} onChangeText={(newText) => setAssignment(curr => ({ ...curr, AssignmentNumber: newText }))} />

      <View style={{ flexDirection: 'row', width: 150, gap: 20 }}>
        <CustomInput placeholder={'Enter Section'} value={assignment.Section} onChangeText={(newText) => setAssignment(curr => ({ ...curr, Section: newText }))} />
        <CustomInput placeholder={'Enter Semester'} value={assignment.semester} onChangeText={(newText) => setAssignment(curr => ({ ...curr, semester: newText }))} />
      </View>
      <Text>Select DataBase</Text>
      <Picker
        selectedValue={assignment.DatabaseName}
        onValueChange={(newValue) => setAssignment(curr => ({ ...curr, DatabaseName: newValue }))}
      >
        {databasesList.map((dataBaseName, index) => (
          <Picker.Item key={index} label={dataBaseName} value={dataBaseName} />
        ))}

      </Picker>
      <DatePicker style={styles.itemContainer} date={assignment.Deadline} onDateChange={(newDate) => { setAssignment(curr => ({ ...curr, Deadline: newDate })) }} />
      <DocumentPickerField file={assignment.file} setFile={setAssignment} />

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
