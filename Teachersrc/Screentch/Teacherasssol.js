import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { CustomInput } from '../../components/CustomInput';
import DocumentPickerField from '../../components/DocumentPicker';
import { COLORS, Url } from '../../constants';
import { Button } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';


const AssignmentSolPage = ({ navigation }) => {

  const isFocused = useIsFocused()

  const initialAssignment = {
    AssignmentNumber: '',
    section: '',
    semester: '',
    file: null
  };

  const [solution, setSolution] = useState(initialAssignment);


  const handleSolutionUpload = async () => {
    const formData = new FormData();
    formData.append('file', solution.file);
    console.log('formData: ', formData);

    try {
      // console.log(`${Url}/Student/UploadSolution?assignmentNumber=${solution.AssignmentNumber}&semester=${solution.semester}&section=${solution.section}`)
      await axios.post(`${Url}/Student/UploadSolution?assignmentNumber=${solution.AssignmentNumber}&semester=${solution.semester}&section=${solution.section}`, formData);
      // File upload successful
      alert('Assignment solution uploaded successfully.');
      navigation.goBack()

    } catch (error) {
      console.log('>>>>>error',error)
      // Handle the error
      alert('Error uploading file:');
    }
  };


  return (
    <View style={styles.screenContainer}>
      <CustomInput placeholder={'Enter Assignment Number'} value={solution.AssignmentNumber} onChangeText={(newText) => setSolution(curr => ({ ...curr, AssignmentNumber: newText }))} />
      <CustomInput placeholder={'Enter Semester No'} value={solution.semester} onChangeText={(newText) => setSolution(curr => ({ ...curr, semester: newText }))} />
      <CustomInput placeholder={'Enter Section '} value={solution.section} onChangeText={(newText) => setSolution(curr => ({ ...curr, section: newText }))} />
      <DocumentPickerField file={solution.file} setFile={setSolution} />
      <Button title={"Upload"} raised onPress={() => handleSolutionUpload()} />
    </View>
  );
};


export default AssignmentSolPage;
const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 50,
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
