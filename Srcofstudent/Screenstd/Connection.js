import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ConnectionPages = ({ navigation }) => {
  
  const [accordionData, setAccordionData] = useState([
    {
      id: 1,
      title: 'Amarks',
      data: [
        { id: 1, categoryId: 1, label: 'Sid', checked: false },
        { id: 2, categoryId: 1, label: 'Aid', checked: false },
        { id: 3, categoryId: 1, label: 'Amarks', checked: false },
      ],
    },
    {
      id: 2,
      title: 'Assignment',
      data: [
        { id: 4, categoryId: 2, label: 'Aid', checked: false },
        { id: 5, categoryId: 2, label: 'Atitle', checked: false },
        { id: 6, categoryId: 2, label: 'Details', checked: false },
      ],
    },
    {
      id: 3,
      title: 'Course',
      data: [
        { id: 7, categoryId: 3, label: 'Cid', checked: false },
        { id: 8, categoryId: 3, label: 'Cname', checked: false },
      ],
    },
    {
      id: 4,
      title: 'Enrollment',
      data: [
        { id: 9, categoryId: 4, label: 'Sid', checked: false },
        { id: 10, categoryId: 4, label: 'Cid', checked: false },
      ],
    },
    {
      id: 5,
      title: 'Query',
      data: [
        { id: 11, categoryId: 5, label: 'Qid', checked: false },
        { id: 12, categoryId: 5, label: 'Sid', checked: false },
        { id: 13, categoryId: 5, label: 'Aid', checked: false },
        { id: 14, categoryId: 5, label: 'Qno', checked: false },
        { id: 15, categoryId: 5, label: 'Details', checked: false },
      ],
    },
    {
      id: 6,
      title: 'Student',
      data: [
        { id: 16, categoryId: 6, label: 'Fname', checked: false },
        { id: 17, categoryId: 6, label: 'Lname', checked: false },
        { id: 18, categoryId: 6, label: 'Smester', checked: false },
        { id: 19, categoryId: 6, label: 'Section', checked: false },
        { id: 20, categoryId: 6, label: 'Semail', checked: false },
        { id: 21, categoryId: 6, label: 'Spassword', checked: false },
      ],
    },
    {
      id: 7,
      title: 'Teach',
      data: [
        { id: 22, categoryId: 7, label: 'Tid', checked: false },
        { id: 23, categoryId: 7, label: 'Cid', checked: false },
      ],
    },
    {
      id: 8,
      title: 'Teacher',
      data: [
        { id: 24, categoryId: 8, label: 'Tid', checked: false },
        { id: 25, categoryId: 8, label: 'Fname', checked: false },
        { id: 26, categoryId: 8, label: 'Lname', checked: false },
        { id: 27, categoryId: 8, label: 'Temail', checked: false },
        { id: 28, categoryId: 8, label: 'Tpassword', checked: false },
      ],
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    
    try {
      const response = await axios.get('http://192.168.0.121/FYPAPI/api/Student/GetTableColumns');
      const jsonString = JSON.stringify(response.data);
      console.log(jsonString);
      setAccordionData(jsonString);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //console.log(accordionData)
  },[accordionData])
  const handleCheckboxPress = (itemId) => {
    setAccordionData((prevData) =>
      prevData.map((item) => {
        if (prevData) {
          setAccordionData
          return {
            ...item,
            data: item.data.map((dataItem) =>
              dataItem.id === itemId ? { ...dataItem, checked: !dataItem.checked } : dataItem
            ),
          };
        }
        return item;
      })
    );
  };

  const renderAccordion = () => {
    return accordionData.map((item) => (
      <Accordion
        key={item.id} // Add a unique key prop here
        title={item.title}
        data={item.data}
        handleCheckboxPress={handleCheckboxPress}
      />
    ));
    // <FlatList
    // />
  };

  const handleConnectPress = () => {
    navigation.navigate('connect');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/bgkimage3.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Text style={styles.connectionText}>Connection</Text>
      <ScrollView style={styles.contentContainer}>{renderAccordion()}</ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleConnectPress}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Accordion = ({ title, data, handleCheckboxPress }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.accordionTitle}>{title}</Text>
      </TouchableOpacity>
      {expanded && (
        <ScrollView style={styles.itemContainer}>
          {data.map((item) => (
            <View key={item.id} style={styles.item}>
              <CheckBox
                checked={item.checked}
                onPress={() => handleCheckboxPress(item.id, item.categoryId)}
              />
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  connectionText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20

,
  },
  accordionContainer: {
    marginBottom: 20,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  itemContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4682B4',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ConnectionPages;