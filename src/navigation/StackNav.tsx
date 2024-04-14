import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './screens';
import BottomTabNav from './BottomTabNav';
import SplashScreen from '@/pages/splash';
import Category from '@/pages/category';
import Income_Category from '@/pages/category_income';
import HomeScreen from '@/pages/home';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}
      initialRouteName={Screens.Splash}>
      <Stack.Screen name={Screens.Splash} component={SplashScreen} />
      <Stack.Screen name={Screens.Tabs} component={BottomTabNav} />
      <Stack.Screen name={Screens.Category} component={Category} />
      <Stack.Screen name={Screens.IncomeCategory} component={Income_Category} />
      <Stack.Screen name={Screens.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
