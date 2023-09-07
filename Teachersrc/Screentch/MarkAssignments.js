import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {COLORS, Url} from '../../constants';
import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';
import {CustomInput} from '../../components/CustomInput';

const MarkAssignments = ({navigation,route}) => {
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(false);
  const [assignments, setAssignments] = useState([]);

  const handleDelete = Aid => {
    // Send a DELETE request to the API endpoint
    fetch(`${Url}/Teacher/DeleteAssignment?Aid=${Aid}`, {
      method: 'DELETE',
    })
      .then(message => {
        console.log('message: ', message);
        alert(message.json());
        getAssignments();
      })
      .catch(error => console.error(error));
  };

  const getAssignments = async () => {
    setLoader(true);
    await axios
      .get(`${Url}/Teacher/getStudentAssignment?tid=${route.params.userDetail.Tid}`)
      .then(response => {
        const assignmentData = response.data
          .filter(data => data.submittedAssignDetail.assignMarks === -1)
          .map(data => ({...data, marks: ''}));
        console.log('assignmentData: ', assignmentData);

        setAssignments(assignmentData);
      })
      .catch(error => {
        console.log(error);
      });
    setLoader(false);
  };

  const handleSaveMarks = async assignment => {
    let mid = assignment.submittedAssignDetail.mid;
    let marks = assignment.marks;

    try {
      console.log('`${Url}/Teacher/markStudentAssigment?mid=${mid}&marks=${marks}`: ', `${Url}/Teacher/markStudentAssigment?mid=${mid}&marks=${marks}`);
      let response = await axios.put(
        `${Url}/Teacher/markStudentAssigment?mid=${mid}&marks=${marks}`,
      );
      if (response.status == 200) {
        let data = await response.data;
        if (data == 'marks saved') {
          getAssignments();
        }
        alert(data);
      }
    } catch (error) {
      alert(error);
    }

    // // Prepare the form data in 'x-www-form-urlencoded' format
    // const formData = new URLSearchParams();
    // formData.append('Sid', assignment.Sid);
    // formData.append('AssignmentNumber', assignment.AssignmentNumber);
    // formData.append('Amarks', assignment.marks);

    // await fetch(`${Url}/Teacher/InsertAmarkRecord`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: formData.toString(),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     alert('Marks saved successfully:', data);
    //   })
    //   .catch(error => console.log(error));
  };

  const handleMarksChange = (newText, index) => {
    console.log('newText: ', newText);
    const temp = [...assignments];
    temp[index].marks = newText;
    setAssignments(temp);
  };

  useEffect(() => {
    getAssignments();
  }, [isFocused]);

  return loader ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.headerText}>Marks Assignment</Text>
      <ScrollView style={styles.scrollView}>
        {assignments.map((assignment, index) => (
          <View key={index} style={styles.assignmentContainer}>
            <View style={styles.assignmentBox}>
              <Text
                style={
                  styles.titleText
                }>{`id: ${assignment.studentDetail.Sid} - ${assignment.studentDetail.Fname}  ${assignment.studentDetail.Lname} (BCS ${assignment.studentDetail.Semester}${assignment.studentDetail.Section})`}</Text>
              <Text style={styles.titleText}>
                Assignment Number: {assignment.assignDetail.AssignmentNumber}
              </Text>
              <Text style={styles.QuestionText}>
                Qno: {assignment.assignDetail.QuestionText}
              </Text>
              <Text style={styles.descriptionText}>
              Answer: {assignment.submittedAssignDetail.answer}
              </Text>

              <View style={styles.actionBtnContainer}>
                <CustomInput
                  placeholder={'0'}
                  value={assignment.marks}
                  onChangeText={newText => handleMarksChange(newText, index)}
                />
                <TouchableOpacity
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={() => handleSaveMarks(assignment)}>
                  <Text style={styles.actionBtnText}>Save Marks</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomBtn}>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {width: 100, backgroundColor: COLORS.blueColor},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.actionBtnText}>Back</Text>
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
    height: 50,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  actionBtn: {
    marginVertical: 5,
    borderRadius: 12,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
  },
  actionBtnText: {
    color: COLORS.secondry,
  },
  editBtn: {
    backgroundColor: COLORS.green,
  },
  deleteBtn: {
    backgroundColor: COLORS.red,
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
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  QuestionText: {
    textAlign: 'left',
    marginVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  descriptionText: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.secondry,
    fontSize: 14,
    color: COLORS.primary,
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

export default MarkAssignments;
