import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const backgroundImage = require('../../images/bgkimage3.png');

const Teacheruploadass = ({ navigation }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleBrowseFiles = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow picking all types of files
      });

      // Handle the selected file here
      const newFile = {
        uri: res.uri,
        name: res.name,
        date: new Date().toLocaleString(), // Add the current date and time
      };

      setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the file picking
        console.log('File picking cancelled');
      } else {
        // Error occurred while picking the file
        console.log('Error picking file:', err);
      }
    }
  };

  const handleCancelFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleDownloadFile = async (file) => {
  try {
    const { uri, name } = file;
    const downloadPath = `${RNFS.DocumentDirectoryPath}/${name}`;

    const options = {
      fromUrl: uri,
      toFile: downloadPath,
    };

    // Show downloading message
    console.log('Downloading file...');

    // Display a message to the user
    alert('Start downloading...');

    const downloadResult = await RNFS.downloadFile(options).promise;

    if (downloadResult.statusCode === 200) {
      await RNFS.openFile(downloadPath);
    } else {
      console.log('Error downloading file:', downloadResult);
    }
  } catch (err) {
    console.log('Error downloading file:', err);
  }
};




  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleUploadButton = () => {
  // Handle upload logic here
  alert('File uploaded successfully!');
};
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Upload Assignment</Text>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Semester</Text>
          <Picker style={styles.dropdown}>
            <Picker.Item label="Fall 2023 Semester 2" value="fall2023 Semester 2" />
            <Picker.Item label="Fall 2023 Semester 3" value="fall2023 Semester 3" />
            <Picker.Item label="Fall 2023 Semester 4" value="fall2023 Semester 4" />
            <Picker.Item label="Fall 2023 Semester 5" value="fall2023 Semester 5" />
            <Picker.Item label="Fall 2023 Semester 6" value="fall2023 Semester 6" />
            <Picker.Item label="Fall 2023 Semester 7" value="fall2023 Semester 7" />
            <Picker.Item label="Fall 2023 Semester 8" value="fall2023 Semester 8" />
            <Picker.Item label="Spring 2023 Semester 1" value="spring2023 Semester 1" />
            <Picker.Item label="Spring 2023 Semester 2" value="spring2023  Semester 2" />
            <Picker.Item label="Spring 2023 Semester 3" value="spring2023  Semester 3" />
            <Picker.Item label="Spring 2023 Semester 4" value="spring2023  Semester 4" />
            <Picker.Item label="Spring 2023 Semester 5" value="spring2023  Semester 5" />
            <Picker.Item label="Spring 2023 Semester 6" value="spring2023  Semester 6" />
            <Picker.Item label="Spring 2023 Semester 7" value="spring2023  Semester 7" />
            <Picker.Item label="Spring 2023 Semester 8" value="spring2023  Semester 8" />
            <Picker.Item label="Summer 2023 Semester 1" value="summer2023 Semester 1" />
            <Picker.Item label="Summer 2023 Semester 2" value="summer2023 Semester 2" />
            <Picker.Item label="Summer 2023 Semester 3" value="summer2023 Semester 3" />
            <Picker.Item label="Summer 2023 Semester 4" value="summer2023 Semester 4" />
            <Picker.Item label="Summer 2023 Semester 5" value="summer2023 Semester 5" />
            <Picker.Item label="Summer 2023 Semester 6" value="summer2023 Semester 6" />
            <Picker.Item label="Summer 2023 Semester 7" value="summer2023 Semester 7" />
            <Picker.Item label="Summer 2023 Semester 8" value="summer2023 Semester 8" />
          </Picker>
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Section</Text>
          <Picker style={styles.dropdown}>
            <Picker.Item label="Section BsCS A" value="section Bscs A " />
            <Picker.Item label="Section BsCS B" value="section Bscs B" />
            <Picker.Item label="Section BsCS C" value="section Bscs C " />
             <Picker.Item label="Section BsIT A" value="section BsIT A " />
            <Picker.Item label="Section BsIT B" value="section BsIT B" />
            <Picker.Item label="Section BsIT C" value="section BsIT C " />
             <Picker.Item label="Section BsSE A" value="section BsSE A " />
            <Picker.Item label="Section BsSE B" value="section BsSE B" />
            <Picker.Item label="Section BsSE C" value="section BsSE C " />
            <Picker.Item label="Section BsAI A" value="section BsAI A " />
            <Picker.Item label="Section BsAI B" value="section BsAI B" />
            <Picker.Item label="Section BsAI C" value="section BsAI C " />
          </Picker>
        </View>
        <View style={styles.fileBoxContainer}>
          <Text style={styles.label}>Browse Files</Text>
          <ScrollView style={styles.fileBox}>
            {selectedFiles.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <Text style={styles.fileItemText}>
                  File {index + 1}
                  {'\n'}
                  Date: {file.date}
                  {'\n'}
                  URL: {file.uri}
                </Text>
                <View style={styles.fileItemButtons}>
                  <TouchableOpacity
                    style={styles.fileItemButton}
                    onPress={() => handleDownloadFile(file)}
                  >
                    <Text style={styles.fileItemButtonText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.fileItemButton}
                    onPress={() => handleCancelFile(index)}
                  >
                    <Text style={styles.fileItemButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={handleBrowseFiles}>
            <Text style={styles.buttonText}>Browse</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadButton}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
  fileBoxContainer: {
    width: '100%',
    marginBottom: 20,
  },
  fileBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    height: 100,
    marginBottom: 10,
  },
  fileItem: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  fileItemText: {
    fontSize: 12,
  },
  fileItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  fileItemButton: {
    backgroundColor: '#4682B4',
    padding: 5,
    borderRadius: 5,
    width: '48%',
  },
  fileItemButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  uploadButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    marginLeft: 70,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Teacheruploadass;
