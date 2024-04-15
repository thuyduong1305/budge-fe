import HistoryScreen from '@/pages/history';
import HomeScreen from '@/pages/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabsNav = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'History'} component={HistoryScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNav;
