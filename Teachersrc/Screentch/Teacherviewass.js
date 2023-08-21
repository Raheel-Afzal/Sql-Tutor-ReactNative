import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

const assignments = [
  {
    id: 1,
    title: 'Assignment ',
    description: 'Student: Ali Billal\nEmail: ali@example.com \n Reg no:2023-arid-7098 \n Sec: BSCS',
    date: 'June 6, 2023 10:00 PM',
    fileURL: 'https://gbihr.org/images/docs/test.pdf',
  },
  {
    id: 2,
    title: 'Assignment ',
    description: 'Student: Noman Ahmed\nEmail: Noman@example.com\n Reg no:2023-arid-5343 \n Sec: BSCS',
    date: 'June 9, 2023 10:37 AM',
     fileURL: 'https://filesamples.com/formats/pdf',
  },
  {
    id: 3,
    title: 'Assignment ',
    description: 'Student: Usman Riasat\nEmail: Usman@example.com\n Reg no:2023-arid-2395\n Sec: BSSE',
    date: 'June 3, 2023 2:48  PM',
     fileURL: 'https://www.ucd.ie/t4cms/Test%20PDF-8mb.pdf',
  },
  {
    id: 4,
    title: 'Assignment ',
    description: 'Student: Raheel bilawal\nEmail: Raheel@example.com\n Reg no:2023-arid-1769 \n Sec: BSAI',
    date: 'June 1, 2023 10:00 AM',
     fileURL: 'https://icseindia.org/document/sample.pdf',
  },
  {
    id: 5,
    title: 'Assignment ',
    description: 'Student: Umer Hasnain\nEmail: Umer@example.com\n Reg no:2023-arid-2048 \n Sec: BSSE',
    date: 'June 11, 2023 1:00 PM',
     fileURL: 'https://myprojects.cld.bz/50-page-sample-PDF-indd/51/',
  },
   {
    id: 6,
    title: 'Assignment ',
     description: 'Student: Aadil Ayaan\nEmail: Aadil@example.com\n Reg no:2023-arid-2377 \n Sec: BSSE',
     date: 'June 13, 2023 9:54 PM',
     fileURL: 'https://www.novapdf.com/wpub/downloads/samples/pdf-example-bookmarks.pdf',
  },
  {
    id: 7,
    title: 'Assignment ',
    description: 'Student: Aahil Junaid\nEmail: Aahil@example.com\n Reg no:2023-arid-1439 \n Sec: BSCS ',
    date: 'June 4, 2023 10:45 AM',
     fileURL: 'https://cartographicperspectives.org/index.php/journal/article/view/cp47-issue/pdf',
  },
  {
    id: 8 ,
    title: 'Assignment ',
    description: 'Student: Hamza Hasnain\nEmail: Hamza@example.com\n Reg no:2023-arid-2826 \n Sec: BSAI',
    date: 'June 4, 2023 8:00 PM',
     fileURL: 'SampleDocs-sample-pdf-file.pdf',
  },
];

const ViewAssignment = ({ navigation }) => {
  const handleViewAssignment = (id) => {
    navigation.navigate('Markassignment', { assignmentId: id });
  };

  const handleDownload = (fileURL) => {
    Linking.openURL(fileURL);
  };

  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.headerText}>View Student</Text>
        <ScrollView style={styles.scrollView}>
          {assignments.map((assignment) => (
            <TouchableOpacity
              key={assignment.id}
              style={styles.assignmentContainer}
              onPress={() => handleViewAssignment(assignment.id)}
            >
              <View style={styles.assignmentBox}>
                <Text style={styles.titleText}>{assignment.title}</Text>
                <Text style={styles.descriptionText}>{assignment.description}</Text>
                <Text style={styles.dateText}>{assignment.date}</Text>
                <Text style={styles.fileURLText}>{assignment.fileURL}</Text>
                <TouchableOpacity onPress={() => handleDownload(assignment.fileURL)}>
                  <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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

export default ViewAssignment;
