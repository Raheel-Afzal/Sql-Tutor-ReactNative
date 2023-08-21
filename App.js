import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const TeacherUploadAss = () => {
  const [visible, setVisible] = React.useState(false);
  const [semester, setSemester] = React.useState('Semester');
  const [section, setSection] = React.useState('Section');

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);
  const handleSemesterSelect = (semester) => {
    setSemester(semester);
    hideMenu();
  };
  const handleSectionSelect = (section) => {
    setSection(section);
    hideMenu();
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        result.uri,
        result.type, // mime type
        result.name,
        result.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.log('Error picking file:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Teacheruploadass</Text>
      <View style={styles.dropdownContainer}>
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          anchor={<Button onPress={showMenu}>{semester}</Button>}
        >
          <Menu.Item onPress={() => handleSemesterSelect('Semester 1')} title="Semester 1" />
          <Menu.Item onPress={() => handleSemesterSelect('Semester 2')} title="Semester 2" />
          {/* Add more semesters as needed */}
        </Menu>
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          anchor={<Button onPress={showMenu}>{section}</Button>}
        >
          <Menu.Item onPress={() => handleSectionSelect('Section A')} title="Section A" />
          <Menu.Item onPress={() => handleSectionSelect('Section B')} title="Section B" />
          {/* Add more sections as needed */}
        </Menu>
      </View>
      <View style={styles.uploadContainer}>
        <Text>Upload your file:</Text>
        <Button onPress={pickFile}>Pick File</Button>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.buttonContainer}>
        <Button mode="contained">Back</Button>
        <Button mode="contained">Upload</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TeacherUploadAss;
