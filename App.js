import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Biitdatabasepanel from './Srcofstudent/Screenstd/Biitdatabasepanel';
import Teacherlogin from './Teachersrc/Screentch/Teacherlogin';
import Teacherdashboard from './Teachersrc/Screentch/Teacherdashboard';
import AssignmentSolPage from './Teachersrc/Screentch/Teacherasssol';
import Stddashboard from './Srcofstudent/Screenstd/Studentdashboard';
import Newassignments from './Srcofstudent/Screenstd/Newassignments';
import Studentresultscreen from './Srcofstudent/Screenstd/Studentresultscreen';
import Mysqltutorial from './Srcofstudent/Screenstd/Mysqltutorial';
import Tutorialinfo from './Srcofstudent/Screenstd/Tutorialinfo';
import Databaseconnection from './Srcofstudent/Screenstd/Databaseconnection';
import AssignmentSolution from './Srcofstudent/Screenstd/AssignmentSolution';
import ConnectionPages from './Srcofstudent/Screenstd/Connection';
import Querybuilders from './Srcofstudent/Screenstd/Querybuilder';
import CreateEditStudent from './Srcofstudent/Screenstd/CreateEditStudent';
import ViewStudents from './Teachersrc/Screentch/ViewStudents';
import ViewAssignments from './Teachersrc/Screentch/ViewAssignments';
import MarkAssignments from './Teachersrc/Screentch/MarkAssignments';
import Studentlogin from './Srcofstudent/Screenstd/Studentlogin';
import TeacheruploadassWithQuestionText from './Teachersrc/Screentch/TeacheruploadassWithQuestionText';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Teacherside() {
  return (
   // <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name="Biitdatabasepanel" component={Biitdatabasepanel}  options={{ headerShown: false }}/>
      <Stack.Screen name="Teacherlogin" component={Teacherlogin} />
      <Stack.Screen name="Teacherdashboard" component={Teacherdashboard} />
      <Stack.Screen name="Teacheruploadass" component={TeacheruploadassWithQuestionText} />
      <Stack.Screen name="uploadsol" component={AssignmentSolPage} />
      <Stack.Screen name="ViewStudents" component={ViewStudents} />
      <Stack.Screen name="ViewAssignments" component={ViewAssignments} />
      <Stack.Screen name="MarkAssignments" component={MarkAssignments} />
      <Stack.Screen name="CreateEditStudent" component={CreateEditStudent}/>

      
    </Stack.Navigator>
 //   </NavigationContainer>
  );
}

function Studentside() {
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name="Studentlogin" component={Studentlogin} />
      <Stack.Screen name="Studentdashboard" component={Stddashboard} />
      <Stack.Screen name="NewAss" component={Newassignments} />
      <Stack.Screen name="Editpage" component={Querybuilders} />
      <Stack.Screen name="AssignmentSolution" component={AssignmentSolution} />
      <Stack.Screen name="Result" component={Studentresultscreen} />
      <Stack.Screen name="Practice" component={Mysqltutorial} />
      <Stack.Screen name="info" component={Tutorialinfo} />
      <Stack.Screen name="PracScreen" component={Databaseconnection} />
      <Stack.Screen name="ConnectionPage" component={ConnectionPages} />
      <Stack.Screen name="Addnext" component={Querybuilders} />
    
      </Stack.Navigator>
     // </NavigationContainer>
  );
}

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="TeacherLogin" component={Teacherside}  options={{ headerShown: false }}/>
        <Stack.Screen name="Studentside" component={Studentside} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;