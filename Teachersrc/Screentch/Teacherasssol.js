import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, ScrollView, Alert, Linking } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const AssignmentSolPage = ({ navigation }) => {
  const [fileUris, setFileUris] = useState([]);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        multiple: true,
      });
      const newUris = res.map((file) => ({
        uri: file.uri,
        name: file.name,
        uploadTime: new Date().toLocaleString(),
      }));
      setFileUris([...fileUris, ...newUris]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the file selection
        console.log('User cancelled file picker');
      } else {
        // Error occurred while picking the file
        console.log('Error picking file:', err);
        Alert.alert('Error', 'Failed to pick file. Please try again.');
      }
    }
  };

  const openFile = (fileUri) => {
    Linking.openURL(fileUri);
  };

  const cancelFile = (index) => {
    const updatedFileUris = [...fileUris];
    updatedFileUris.splice(index, 1);
    setFileUris(updatedFileUris);
  };

  useEffect(() => {
    const deletionTimer = setTimeout(() => {
      setFileUris([]);
      // Perform additional deletion logic here, such as deleting the file from the server
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    return () => {
      clearTimeout(deletionTimer);
    };
  }, []);
  const handleUploadButton = () => {
  // Handle upload logic here
  alert('File uploaded successfully!');
};

  return (
    <ImageBackground source={require('../../images/bgkimage3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Upload Solution</Text>

        <ScrollView style={styles.fileContainer}>
          {fileUris.length > 0 ? (
            fileUris.map((file, index) => (
              <View key={index} style={styles.fileBox}>
                <Text style={styles.fileText}>
                  Selected File {index + 1}: {file.name}
                </Text>
                <Text style={styles.uploadTimeText}>Uploaded on: {file.uploadTime}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.downloadButton} onPress={() => openFile(file.uri)}>
                    <Text style={styles.buttonText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => cancelFile(index)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noFileText}>No files selected</Text>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={pickFile}>
          <Text style={styles.buttonText}>Select File</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StudentDashboard')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleUploadButton}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 80,
    marginTop: 40, // Added marginTop to move the title to the top
  },
  fileContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  fileBox: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  fileText: {
    fontSize: 15,
  },
  uploadTimeText: {
    fontSize: 12,
    marginBottom: 5,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 40,
    alignSelf: 'flex-start',
  },
  cancelButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 40,
    alignSelf: 'flex-start',
  },
  noFileText: {
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 10,
    margin: 10,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center',
  },
};

export default AssignmentSolPage;
