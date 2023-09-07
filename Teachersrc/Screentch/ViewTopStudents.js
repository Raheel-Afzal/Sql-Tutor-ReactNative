import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {COLORS, Url} from '../../constants';
import axios from 'axios';
import { Button } from 'react-native-elements';

const ViewTopStudents = ({navigation,route}) => {
  const [filter, setFilter] = useState({
    aid: '',
    section: '',
    semester: '',
    howmany: '',
  });
  const sections = ['A', 'B', 'C', 'D'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const howMany = ['1', '2', '3', '4', '5', '6', '7', '8','9','10'];
  const [assignNumber, setAssignNumber] = useState([]);
  console.log('assignNumber: ', assignNumber);

  const getAssignmentNumber = async () => {
    try {
      let response = await axios.get(
        `${Url}/Teacher/getTeacherAssignment?teacherId=${route.params.userDetail.Tid}`,
      );

      let data = response.data;
      console.log('data: ', data);
      if (response.status == 200) {
        setAssignNumber(response.data);
      } else {
        alert('Fetch Failed');
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAssignmentNumber();
  }, []);
  return (
    <View>
      <View style={{marginVertical: 30, marginHorizontal: 30}}>
        <Text>Select Section</Text>
        <Picker
          style={{
            backgroundColor: COLORS.lightGrey,
          }}
          selectedValue={filter.section}
          onValueChange={newText =>
            setFilter(curr => ({...curr, section: newText}))
          }>
          {sections.map((data, index) => {
            return <Picker.Item key={index} label={data} value={data} />;
          })}
        </Picker>
      </View>
      <View style={{marginVertical: 30, marginHorizontal: 30}}>
        <Text>Select Semester</Text>
        <Picker
          style={{
            backgroundColor: COLORS.lightGrey,
          }}
          selectedValue={filter.semester}
          onValueChange={newText =>
            setFilter(curr => ({...curr, semester: newText}))
          }>
          {semesters.map((data, index) => {
            return <Picker.Item key={index} label={data} value={data} />;
          })}
        </Picker>
      </View>
      <View style={{marginVertical: 30, marginHorizontal: 30}}>
        <Text>Select Assignment No</Text>
        <Picker
          style={{
            backgroundColor: COLORS.lightGrey,
          }}
          selectedValue={filter.aid}
          onValueChange={newText =>
            setFilter(curr => ({...curr, aid: newText}))
          }>
          {assignNumber?.map((data, index) => {
            return (
              <Picker.Item
                key={index}
                label={(index + 1).toString()}
                value={data.Aid}
              />
            );
          })}
        </Picker>
      </View>
      <View style={{marginVertical: 30, marginHorizontal: 30}}>
        <Text>Select Top</Text>
        <Picker
          style={{
            backgroundColor: COLORS.lightGrey,
          }}
          selectedValue={filter.howmany}
          onValueChange={newText =>
            setFilter(curr => ({...curr, howmany: newText}))
          }>
          {howMany?.map((data, index) => {
            return (
              <Picker.Item
                key={index}
                label={(index + 1).toString()}
                value={data}
              />
            );
          })}
        </Picker>
      </View>
      <View style={{marginHorizontal:100}}>
      <Button
          title={'Select'}
          raised
          onPress={()=>navigation.navigate('SelectTopStudent',{filter})}
      
        />
           </View>
    </View>
  );
};

export default ViewTopStudents;
