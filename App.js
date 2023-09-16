import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import Ionicons from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  // function iconButtonPressHandler() {
  //   navigation.navigate('ManageExpense');
  // }

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colours.primary500
        },
        headerTintColor: 'white',
        tabBarStyle:
        {
        backgroundColor: GlobalStyles.colours.primary500
        },
        tabBarActiveTintColor: GlobalStyles.colours.accent500,
        headerRight: ({tintColor}) => <IconButton icon='add' size={24} colour={tintColor} onPress={() => navigation.navigate('ManageExpense')}/>
      })}
    >
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => {
            <Ionicons name="heart-outline" size={size} color={color}></Ionicons>
          }
        }}
      />
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) => {
            <Ionicons name='calendar' size={size} color={color}></Ionicons>
          }
        }}
      />
    </BottomTabs.Navigator>
  );
}


export default function App() {
  return (
    <>
      <StatusBar style='light'/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='ExpensesOverview'
            component={ExpensesOverview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='ManageExpense'
            component={ManageExpense}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
