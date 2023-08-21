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

const Querybuilder = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Result');
  let drawerRef = null;
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const handleInput = (char) => {
    setQuery(query + char);
  };

  const handleBackspace = () => {
    setQuery(query.slice(0, -1));
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleSpace = () => {
    setQuery(query + '  ');
  };

  const handleExecute = () => {
    // TODO: Handle execute button press
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
      return <Text style={styles.content}>Result Content</Text>;
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

  const openDrawer = () => {
    drawerRef.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.closeDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={(ref) => (drawerRef = ref)}
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          <Text style={styles.drawerText}>Drawer Content</Text>
          <TouchableOpacity
            style={styles.accordion}
            onPress={() => setCheckbox1(!checkbox1)}
          >
            <Text style={styles.checkboxText}>Checkbox 1</Text>
            {checkbox1 && <Text>Checked</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.accordion}
            onPress={() => setCheckbox2(!checkbox2)}
          >
            <Text style={styles.checkboxText}>Checkbox 2</Text>
            {checkbox2 && <Text>Checked</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.accordion}
            onPress={() => setCheckbox3(!checkbox3)}
          >
            <Text style={styles.checkboxText}>Checkbox 3</Text>
            {checkbox3 && <Text>Checked</Text>}
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
          <Text style={styles.drawerButtonText}>=</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Query Builder</Text>
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
            <Text style={[styles.tabText, activeTab === 'Result' && styles.activeTabText]}>
              Result
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Sample' && styles.activeTab]}
            onPress={handleSample}
          >
            <Text style={[styles.tabText, activeTab === 'Sample' && styles.activeTabText]}>
              Sample
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Keywords' && styles.activeTab]}
            onPress={handleKeywords}
          >
            <Text style={[styles.tabText, activeTab === 'Keywords' && styles.activeTabText]}>
              Keywords
            </Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleExecute}>
            <Text style={styles.buttonText}>Execute</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
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
          </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  keyboard1Text: {
    fontSize: 16,
    fontWeight: 'bold',
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
    padding: 3,
    borderWidth: 1,
    width: '20%',
    alignItems: 'center',
  },
  keyboard1Key: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 3,
    borderWidth: 1,
    width: '20%',
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
    width: '20%',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxText: {
    fontSize: 16,
  },
});

export default Querybuilder;
