import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid,
} from 'react-native';
import { Url } from '../../constants';

const Querybuilders = ({ route }) => {
  const { selectedDatabase } = route.params;
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Result');
  const [results, setResults] = useState([])
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
  const [expandedAccordion, setExpandedAccordion] = useState(null);


  const handleRunQuery = async () => {
    try {
      const response = await fetch(
        // `http://localhost/FYPAPI/api/Student/RunQuery?sqlQuery=${finalQuery}`
        `${Url}/QueryRun/RunQuery?databaseName=${selectedDatabase}&query=${query}`,
        {
          method: "POST"
        }
      );
      const data = await response.json();
      console.log('data: ', data);
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (char) => {
    setQuery(query + char);
  };

  // const handleBackspace = () => {
  //   setQuery(query.slice(0, -1));
  // };

  // const handleClear = () => {
  //   setQuery('');
  // };

  // const handleSpace = () => {
  //   setQuery(query + '  ');
  // };

  const handleExecute = () => {
    // TODO: Handle execute button press
    handleRunQuery()
    console.log('Execute button pressed');
  };

  const handleSave = () => {
    // TODO: Handle save button press
    console.log('Save button pressed');
  };

  const handleResult = () => {
    setActiveTab('Result');
  };

  const handleSample = () => {
    setActiveTab('Sample');
  };

  const handleKeywords = () => {
    setActiveTab('Keywords');
  };
  const toggleAccordion = (index) => {
    if (expandedAccordion === index) {
      setExpandedAccordion(null);
    } else {
      setExpandedAccordion(index);
    }
  };
  const handleCheckboxChange = (accordionIndex, itemIndex) => {
    setAccordionData((prevState) => {
      const newData = [...prevState];
      const accordionItem = newData[accordionIndex];
      const checkboxItem = accordionItem.data[itemIndex];
      checkboxItem.checked = !checkboxItem.checked;
      return newData;
    });
  };

  const keyboard = [
    [
      'SELECT',
      'FROM',
      'WHERE',
      'LIKE',
      'INNER JOIN',
      '+',
      '-',
      '*',
      '/',
      '%',
      '&',
      '|',
      '^',
      '=',
      '>',
      '<',
      '>=',
      '<=',
      '<>',
      '+=',
      '-=',
      '*=',
      '/=',
      '%=',
      '&=',
      '^-=',
      '|*=',
      ';',
      ',',
    ],
  ];

  const keyboard1 = [
    [
      'SELECT',
      'UPDATE',
      'WHERE',
      'FULL JOIN',
      'INNER JOIN',
      'LEFT JOIN',
      'RIGHT JOIN',
      'SELF JOIN',
      'GROUP BY',
      'HAVING',
      'EXIST',
      'SELECT INTO',
    ],
  ];

  const renderContent = () => {
    if (activeTab === 'Result') {
      return (
        <View style={styles.content}>
          {
            results.length == 0 ?
              <Text >Result Content</Text>
              :
              <ScrollView  horizontal={true} vertical={true}>
                <View>
                  <ScrollView horizontal>
                    <View style={styles.tableHeaderView}>
                      {Object.keys(results[0]).map((key) => (
                        <Text style={styles.tableHeaderText} key={key}>{key}</Text>
                      ))}
                    </View>
                  </ScrollView>
                  <ScrollView style={{ height: 280 }}>
                    {results.map((result, index) => (
                      <View key={'v' + index} style={styles.tableHeaderView}>
                        {Object.values(result).map((value, index) => (
                          <Text style={styles.tableBodyText} key={index}>{value}</Text>
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
          }
        </View>
      );
    } else if (activeTab === 'Sample') {
      return (
        <ScrollView>
          {keyboard1.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.keyboard1Row}>
              {row.map((key, keyIndex) => (
                <TouchableOpacity
                  key={`key-${keyIndex}`}
                  style={styles.keyboard1Key}
                  onPress={() => handleInput(key)}
                >
                  <Text style={styles.keyboard1Text}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      );
    } else if (activeTab === 'Keywords') {
      return (
        <ScrollView>
          {keyboard.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.keyboardRow}>
              {row.map((key, keyIndex) => (
                <TouchableOpacity
                  key={`key-${keyIndex}`}
                  style={styles.keyboardKey}
                  onPress={() => handleInput(key)}
                >
                  <Text style={styles.keyboardText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  const drawerRef = React.createRef();

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };


  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          <Text style={styles.drawerHeader}>Drawer data</Text>
          {accordionData.map((item, index) => (
            <TouchableOpacity
              key={`accordion-${index}`}
              style={styles.accordionItem}
              onPress={() => toggleAccordion(index)}
            >
              <Text style={styles.accordionTitle}>{item.title}</Text>
              {expandedAccordion === index && (
                <View style={styles.accordionContent}>
                  {item.data.map((checkboxItem, itemIndex) => (
                    <TouchableOpacity
                      key={`checkbox-${itemIndex}`}
                      style={styles.checkboxItem}
                      onPress={() => handleCheckboxChange(index, itemIndex)}
                    >
                      <Text style={styles.checkboxLabel}>{checkboxItem.label}</Text>
                      {checkboxItem.checked && <Text style={styles.checkboxChecked}>✓</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Database :{selectedDatabase}</Text>
        {/* <TouchableOpacity onPress={openDrawer} style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>Open Drawer</Text>
        </TouchableOpacity> */}
        <View style={styles.notepadContainer}>
          <TextInput
            style={styles.notepad}
            multiline
            numberOfLines={4}
            value={query}
            onChangeText={setQuery}
            placeholder="Type your query here"
          />
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Result' && styles.activeTab]}
            onPress={handleResult}
          >
            <Text style={[styles.tabText, activeTab === 'Result' && styles.activeTabText]}>Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Sample' && styles.activeTab]}
            onPress={handleSample}
          >
            <Text style={[styles.tabText, activeTab === 'Sample' && styles.activeTabText]}>Sample</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Keywords' && styles.activeTab]}
            onPress={handleKeywords}
          >
            <Text style={[styles.tabText, activeTab === 'Keywords' && styles.activeTabText]}>Keywords</Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleExecute}>
            <Text style={styles.buttonText}>Execute</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleBackspace}>
            <Text style={styles.buttonText}>BackSp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSpace}>
            <Text style={styles.buttonText}>Space</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tableHeaderText: {
    padding: 5,
    fontWeight: 'bold',
    borderWidth: 0.5,
    height: 40,
    width: 80

  },
  tableHeaderView: {
    flexDirection: 'row',

  },
  tableBodyText: {
    // padding: 5,
    width: 80,
    height:20,
    textAlign:'center',
    borderWidth: 0.3

  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  drawerButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  notepadContainer: {
    padding: 0,
  },
  notepad: {
    height: 120,
    fontSize: 18,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#4682B4',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  keyboardText: {
    fontSize: 14,
    // fontWeight: 'bold',
  },
  keyboard1Text: {
    fontSize: 14,
    // fontWeight: 'bold',
  },
  keyboard: {
    borderWidth: 2,
    margin: 10,
    backgroundColor: '#f5f5f5',
    padding: 2,
  },
  keyboard1: {
    borderWidth: 2,
    margin: 10,
    backgroundColor: '#f5f5f5',
    padding: 2,
  },
  keyboardKey: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    margin: 5,
    // width: '20%',
    alignItems: 'center',
  },
  keyboard1Key: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    margin: 5,
    // width: '0%',
    alignItems: 'center',
  },
  keyboardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  keyboard1Row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#4682B4',
    width: '100%',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  accordion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxText: {
    marginLeft: 5,
  },
  accordionItem: {
    marginBottom: 10,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accordionContent: {
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  drawerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  drawerHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 5,
    marginBottom: 10,
  },
  drawerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionItem: {
    marginBottom: 10,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accordionContent: {
    marginTop: 5,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxChecked: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  notepadContainer: {
    padding: 0,
  },
  notepad: {
    height: 120,
    fontSize: 18,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#4682B4',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default Querybuilders;
