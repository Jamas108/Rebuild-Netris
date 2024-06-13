import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  SplashScreen,
  Login,
  Register,
  Article,
  Home,
  Profile,
  EditProfile,
  Tbresmi,
  Tbnonresmi,
  ArticleDetail,
  Splash
} from './screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabList = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Article') {
            iconName = focused ? 'file-document' : 'file-document-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: '#774494',
        tabBarInactiveTintColor: '#C7C7C7',
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          backgroundColor: '#ffffff',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarShowLabel: false }} />
      <Tab.Screen name="Article" component={Article} options={{ tabBarShowLabel: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarShowLabel: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  React.useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeTab" component={TabList} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Tbnonresmi" component={Tbnonresmi} />
          <Stack.Screen name="Tbresmi" component={Tbresmi} />
          <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
