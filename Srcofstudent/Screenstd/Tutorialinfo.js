import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const TutorialInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../images/bgkimage3.png')} style={styles.backgroundImage} />
      <Text style={styles.header}>SQL Tutorial</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.heading}>What is SQL?</Text>
        <Text style={styles.paragraph}>SQL stands for Structured Query Language and is used to manage relational databases. It is a standard language used to interact with databases and allows you to create, read, update, and delete data from a database.</Text>
        <Text style={styles.paragraph}>SQL is used by many different types of applications, including web applications, mobile applications, and desktop applications. It is also used by many different types of organizations, from small businesses to large enterprises.</Text>
        <Text style={styles.heading}>Why Learn SQL?</Text>
        <Text style={styles.paragraph}>Learning SQL is valuable for anyone who works with data or wants to work with data. It is used by data analysts, data scientists, developers, and business professionals to extract insights from data.</Text>
        <Text style={styles.paragraph}>SQL is also a valuable skill for anyone who wants to work with databases, as it is the most widely used database language in the world. Knowing SQL will allow you to work with a variety of databases, including MySQL, PostgreSQL, Oracle, and Microsoft SQL Server.</Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
  },
  scrollContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default TutorialInfo;
