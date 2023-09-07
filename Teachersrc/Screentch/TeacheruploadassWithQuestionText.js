import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {CustomInput} from '../../components/CustomInput';
import DocumentPickerField from '../../components/DocumentPicker';
import DatePicker from 'react-native-date-picker';
import {COLORS, Url, formatDate} from '../../constants';
import {Button} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const TeacheruploadassWithQuestionText = ({navigation, route}) => {
  let {path} = route.params;
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(false);
  const [assignNumberloader, setAssignNumberloader] = useState(false);
  const [dataBaseLoader, setDataBaseLoader] = useState(false);
  const initialAssignment = {
    Tid: '',
    AssignmentNumber: '',
    Title: '',
    QuestionText: '',
    Deadline: new Date(),
    DatabaseName: '',
    Section: '',
    semester: '',
    assignFile: null,
  };

  const [assignment, setAssignment] = useState(initialAssignment);

  const [databasesList, setDatabasesList] = useState([]);

  const editAssignment = async () => {
    try {
      setLoader(true);
      let data = JSON.stringify({
        Aid: route.params.assignData.Aid,
        Title: assignment.Title,
        DatabaseName: assignment.DatabaseName,
        Deadline: assignment.Deadline,
        Smester: assignment.semester,
        Section: assignment.Section,
        QuestionText: assignment.QuestionText,
      });

      const config = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      };

      const response = await fetch(
        `${Url}/teacher/editAssignmentDetail`,
        config,
      );
      if (response.ok) {
        const responseData = await response.json();
        alert(responseData);
      }
      // console.log(JSON.stringify(responseData));
    } catch (error) {
      console.log('error: ', error);
      alert(error);
    } finally {
      setLoader(false);
    }
  };

  const uploadAssignment = async () => {
    try {
      // Create form data
      setLoader(true);

      console.log('assignment: ', assignment);
      if (!Object.values(assignment).every(field => field)) {
        alert('Please Fill All Data, Before Uploading');
        return;
      }

      const formData = new FormData();
      for (const key in assignment) {
        key == 'Deadline'
          ? formData.append(key, formatDate(assignment[key]))
          : formData.append(key, assignment[key]);
      }
      // Send a POST request to the API endpoint
      const response = await fetch(`${Url}/Teacher/AssgmentEntry`, {
        method: 'POST',
        body: formData,
      });
      console.log('response: ', response);
      if (response.ok) {
        alert('File Uploaded');
        navigation.goBack();
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoader(false);
    }
  };

  const getAssignmentNumber = async () => {
    setAssignNumberloader(true);
    try {
      let response = await axios.get(
        `${Url}/Teacher/getTeacherAssignment?teacherId=10`,
      );

      let data = response.data;
      console.log('data: ', data);
      if (response.status == 200) {
        setAssignment(curr => ({
          ...curr,
          AssignmentNumber: data.length + 1,
        }));
      } else {
        alert('Fetch Failed');
      }
    } catch (error) {
      alert(error);
    } finally {
      setAssignNumberloader(false);
    }
  };

  const getDataBaseList = async () => {
    // Fetch list of databases
    try {
      setDataBaseLoader(true);
      await fetch(`${Url}/Teacher/GetDatabaseList`)
        .then(response => response.json())
        .then(data => {
          setDatabasesList(data);
          if (data.length) {
            setAssignment(curr => ({...curr, DatabaseName: data[0]}));
          }
        })
        .catch(error => console.error(error));
    } catch (error) {
      alert(error);
    } finally {
      setDataBaseLoader(false);
    }
  };

  const setDataforEdit = () => {
    const assignData = route.params.assignData;
    setAssignment({
      AssignmentNumber: assignData.AssignmentNumber?.toString(),
      DatabaseName: assignData.DatabaseName,
      Deadline: new Date(assignData.Deadline),
      Title: assignData.Title,
      Section: assignData.Section,
      semester: assignData.Smester.toString(),
      QuestionText: assignData.QuestionText,
    });
  };


  useEffect(() => {
    if (route.params.userDetail) {
      let {Tid} = route.params.userDetail;
      setAssignment(curr => ({...curr, Tid: Tid}));
    }

    getDataBaseList();
    console.log('path: ', path);
    if (path === 'create') {
      getAssignmentNumber();
    } else if (path === 'edit') {
      setDataforEdit();
    }
  }, [isFocused,path]);

  return assignNumberloader ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <View style={styles.screenContainer}>
      <Text style={styles.header}>
        Assignment Number: {assignment.AssignmentNumber}
      </Text>
      <CustomInput
        placeholder={'Enter Title'}
        value={assignment.Title}
        onChangeText={newText =>
          setAssignment(curr => ({...curr, Title: newText}))
        }
      />
      <CustomInput
        placeholder={'Enter Question Text'}
        value={assignment.QuestionText}
        onChangeText={newText =>
          setAssignment(curr => ({...curr, QuestionText: newText}))
        }
      />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 10,
          }}>
          <Text style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold'}}>
            Section:
          </Text>
          <CustomInput
            maxLength={1}
            inputStyle={{width: 60}}
            placeholder={'SEC'}
            value={assignment.Section}
            onChangeText={newText =>
              setAssignment(curr => ({...curr, Section: newText}))
            }
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold'}}>
            Semester:
          </Text>
          <CustomInput
            maxLength={1}
            keyboardType={'numeric'}
            inputStyle={{width: 60}}
            placeholder={'SEM'}
            value={assignment.semester}
            onChangeText={newText =>
              setAssignment(curr => ({...curr, semester: newText}))
            }
          />
        </View>
      </View>
      <View style={{borderWidth: 1, borderRadius: 11, marginVertical: 5}}>
        <Text style={styles.databasePicker}>Select DataBase</Text>
        {dataBaseLoader ? (
          <ActivityIndicator size={'large'} style={{padding: 10}} />
        ) : (
          <Picker
            selectedValue={assignment.DatabaseName}
            onValueChange={newValue =>
              setAssignment(curr => ({...curr, DatabaseName: newValue}))
            }>
            {databasesList.map((dataBaseName, index) => (
              <Picker.Item
                style={{fontSize: 13}}
                key={index}
                label={dataBaseName}
                value={dataBaseName}
              />
            ))}
          </Picker>
        )}
      </View>
      <DatePicker
        style={styles.itemContainer}
        date={assignment.Deadline}
        onDateChange={newDate => {
          setAssignment(curr => ({...curr, Deadline: newDate}));
        }}
      />
      <DocumentPickerField
        file={assignment.assignFile}
        setFile={setAssignment}
      />

      {loader ? (
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
          Save Changes....
        </Text>
      ) : (
        <Button
          title={path === 'edit' ? 'Edit save' : 'Upload'}
          raised
          onPress={() =>
            path === 'edit' ? editAssignment() : uploadAssignment()
          }
        />
      )}
    </View>
  );
};

export default TeacheruploadassWithQuestionText;
const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: COLORS.blueColor,
    color: 'white',
    marginVertical: 5,
    paddingVertical: 5,
  },
  databasePicker: {
    backgroundColor: COLORS.blueColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  itemContainer: {
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#00000080',
    elevation: 5,
    height: 70,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.26,
    backgroundColor: COLORS.secondry,
    marginVertical: 12,
    paddingVertical: 10,
  },
});
