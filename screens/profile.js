import React, { useState, useEffect } from "react";
import { StatusBar, Box, Heading, Text, Pressable, ScrollView } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Header } from "../components";
import FIREBASE from "../config/FIREBASE";
import { clearStorage, getData } from "../utils/localStorage";

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  const getUserData = async () => {
    try {
      const userData = await getData("user");
      if (userData) {
        const userRef = FIREBASE.database().ref(`users/${userData.uid}`);
        const snapshot = await userRef.once("value");
        const updatedUserData = snapshot.val();
        if (updatedUserData) {
          setProfile(updatedUserData);
        } else {
          console.log("User data not found");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onSubmit = async () => {
    try {
      await FIREBASE.auth().signOut();
      clearStorage();
      navigation.replace("Login");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getUserData);
    return () => unsubscribe();
  }, [navigation]);

  return (
    <>
      <Header title="Profile"/>
      <ScrollView>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Box alignSelf="center" w="90%" bgColor="purple.700" p={5} mt={5} mb={20} borderRadius={10} shadow={9}>
          <Box alignItems="center">
            <Ionicons name="person-circle-outline" color="white" size={100} />
            <Heading mt={2} fontSize={24} fontWeight="bold" color="white">
              User Details
            </Heading>
          </Box>

          <Box mt={6}>
            <Box flexDirection="row" alignItems="center" mb={4}>
              <Ionicons name="information-circle" color="red" size={28} />
              <Text ml={4} fontSize={18} fontWeight="normal" color="white">
                {profile?.name}
              </Text>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Ionicons name="mail" color="red" size={28} />
              <Text ml={4} fontSize={18} fontWeight="normal" color="white">
                {profile?.email}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box mt={-20} mx={5}>
          <Box w="100%" bg="purple.600" h={75} mt={5} borderRadius={10} shadow={9}>
            <Pressable onPress={() => navigation.navigate("EditProfile")}>
              <Box w="100%" h="100%" justifyContent="center" alignItems="center">
                <Heading fontSize={20} fontWeight="bold" color="white">
                  Edit Profile
                </Heading>
              </Box>
            </Pressable>
          </Box>

          <Box w="100%" bg="red.500" h={75} mt={5} borderRadius={10} shadow={9}>
            <Pressable onPress={onSubmit}>
              <Box w="100%" h="100%" justifyContent="center" alignItems="center">
                <Heading fontSize={20} fontWeight="bold" color="white">
                  Log Out
                </Heading>
              </Box>
            </Pressable>
          </Box>
        </Box>

        <Box h={200} />
      </ScrollView>
    </>
  );
};

export default Profile;
