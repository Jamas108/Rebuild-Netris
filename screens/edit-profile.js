import React, { useState, useEffect } from "react";
import { StatusBar, Box, Heading, Pressable, Input, VStack, Text, ScrollView } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Header } from "../components";
import { getData } from "../utils/localStorage";
import { updateUserData } from "../actions/AuthAction";
import FIREBASE from "../config/FIREBASE";

const EditProfile = ({ navigation }) => {
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

  const handleInputChange = (field, value) => {
    setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
  };

  const onSubmit = async () => {
    try {
      const userData = await getData("user");
      if (!userData) {
        console.error("User is not authenticated");
        return;
      }

      const updatedProfileData = { ...userData, ...profile };
      setProfile(updatedProfileData);

      await updateUserData(userData.uid, updatedProfileData);

      navigation.navigate("Profile");

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getUserData);
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <>
      <Header title={"Kembali"} withBack={true} />
      <ScrollView>
        <Box mt={4} padding={4}>
          {/* Profile Icon and Title */}
          <Box alignItems="center">
            <Ionicons name="person-circle-outline" color="purple.400" size={100} />
            <Heading mt={2} fontSize={24} fontWeight="bold" color="black">
              Edit Profile
            </Heading>
          </Box>

          {/* Editable Fields */}
          <Box key="name" mt={6}>
            <Text fontWeight="bold" fontSize={18} color="gray.600" mb={2}>
              Nama
            </Text>
            <Input
              borderWidth={2}
              borderColor="gray.300"
              borderRadius={8}
              fontSize={16}
              value={profile?.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
          </Box>

          <Box alignItems="center" mt={10}>
            <Pressable onPress={onSubmit} w="50%">
              <Box
                bgColor="purple.500"
                borderRadius={25}
                h={12}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={18} fontWeight="bold" color="white">
                  Save
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default EditProfile;
