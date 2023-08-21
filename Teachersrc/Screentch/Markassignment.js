import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Markassignment = () => {
  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    // Navigate to the previous page or any other desired screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/bgkimage3.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Assignment Marks</Text>
        <View style={styles.fileBox}>
          <TextInput
            style={styles.fileInput}
            placeholder="Upload assignment file"
          />
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackButtonPress}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'grey',
  },
  fileBox: {
    width: '80%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  fileInput: {
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#4287f5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Markassignment;
