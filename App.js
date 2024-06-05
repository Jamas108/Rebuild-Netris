import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, configureFonts } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider} from "native-base";
import { StyleSheet, Text, View, LogBox } from "react-native";
import {
  SplashScreen,
  Login,
  Register,
  Article,
  Home,
  Profile,
  Splash,
  EditProfile,
  Tbresmi,
  Tbnonresmi,
  ArticleDetail,
} from "./screens";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import FlashMessage from "react-native-flash-message";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

const TabList = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Splash"}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn == "Home") {
            iconName = focused ? "home" : "home-outline";
            return (
              <CustomTabIcon
                name={iconName}
                focused={focused}
                size={size}
                color={color}
              />
            );
          } else if (rn == "Article") {
            iconName = focused ? "file-document" : "file-document-outline";
            return (
              <CustomTabIcon
                name={iconName}
                focused={focused}
                size={size}
                color={color}
              />
            );
          } else if (rn == "Profile") {
            iconName = focused ? "account" : "account-outline";
            return (
              <CustomTabIcon
                name={iconName}
                focused={focused}
                size={size}
                color={color}
              />
            );
          }

          return (
            <>
              <MaterialCommunityIcons name={iconName} size={30} color={color} />
              {/* {rn === "Home" && rn === "ProfileScreen" ? (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              ) : (
                <MaterialIcons name={iconName} size={size} color={color} />
              )} */}
            </>
          );
        },
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          backgroundColor: "#ffffff",
        },
      })}
      tabBarOptions={{
        activeTintColor: "#774494",
        inactiveTintColor: "#C7C7C7",
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={"Article"}
        component={Article}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

const CustomTabIcon = ({ name, focused, size, color }) => {
  return (
    <View style={styles.tabIconContainer}>
      {focused ? (
        <View
          style={{
            width: "100%",
            height: 7,
            backgroundColor: "#774494",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        />
      ) : null}
      <MaterialCommunityIcons
        name={name}
        size={30}
        color={color}
        style={styles.tabIcon}
      />
    </View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  return fontsLoaded ? (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={"SplashScreen"} component={SplashScreen} />
          <Stack.Screen name={"Splash"} component={Splash} />
          <Stack.Screen name={"Login"} component={Login} />
          {/* <Stack.Screen name={"Home"} component={Home} /> */}
          <Stack.Screen name={"Register"} component={Register} />
          {/* <Stack.Screen name={"Nerby"} component={Nerby} /> */}
          <Stack.Screen name={"HomeTab"} component={TabList} />
          <Stack.Screen name={"EditProfile"} component={EditProfile} />
          <Stack.Screen name={"Tbnonresmi"} component={Tbnonresmi} />
          <Stack.Screen name={"Tbresmi"} component={Tbresmi} />
          <Stack.Screen name={"ArticleDetail"} component={ArticleDetail} />

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    overflow: "hidden",
  },
  tabIcon: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
