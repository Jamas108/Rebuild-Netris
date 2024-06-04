import React, { useState, useEffect } from "react";
import { StatusBar, Image, Box, Heading, Pressable, Input, VStack, Text, ScrollView } from "native-base";
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
            // Fetch the latest data from Firebase
            const userRef = FIREBASE.database().ref(`users/${userData.uid}`);
            const snapshot = await userRef.once("value");
            const updatedUserData = snapshot.val();

            if (updatedUserData) {
                console.log("Updated user data:", updatedUserData);
                setProfile(updatedUserData);
            } else {
                console.log("User data not found");
            }
        } else {
            // Handle the case when user data is not available
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
      // Get the user data from local storage
      const userData = await getData("user");

      // Check if userData is available
      if (!userData) {
        console.error("User is not authenticated");
        return;
      }

      // Update the local profile data
      const updatedProfileData = { ...userData, ...profile };
      setProfile(updatedProfileData);

      // Update the user data in Firebase
      await updateUserData(userData.uid, updatedProfileData);

      // Navigate to the Profile screen
      navigation.navigate("Profile");

      // You can navigate or perform other actions after a successful update
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
      <Header title={"Edit Profile"} withBack={true} />
      <ScrollView>
        <StatusBar backgroundColor="#ffffff" />
        <Box mt={1} padding={1} alignContent="baseline">
          {/* <Image
            source={require("../assets/admin.png")}
            borderRadius={5}
            h={200}
            w="100%"
            alt="-"
          /> */}
        </Box>

        {/* Identitas */}
        <Box
          mt={6}
          alignSelf="center"
          w="95%"
          bgColor="gray.100"
          h={377}
          shadow={"0"}
          mb={280}
          borderColor="gray.100"
          borderWidth={"0"}
          borderRadius={0}
        >
          <Box alignItems="start">
            <Box
              alignItems="center"
              w={58}
              h={58}
              bgColor="blue.400"
              borderRadius={90}
              borderColor="blue.100"
              borderWidth={8}
              mt={1}
              ml={2}
            >
              <Ionicons name="person-circle-outline" color="white" size={39} />
            </Box>
            <Heading
              shadow={5}
              alignSelf="center"
              ml={8}
              mt={-41}
              fontSize={20}
              fontWeight="extrabold"
              color="black"
            >
              DETAIL USER
            </Heading>
    
            {/* Editable Fields */}
            {["name", "email", "nomorhp"].map((field) => (
              <Box key={field} marginTop={6} w={"100%"} borderBottomRadius={2} borderBottomWidth={3} borderBottomColor={"gray.300"}>
                {/* <Ionicons name="information-circle" color="red" size={28} /> */}
                <Input 
                  alignSelf={"center"}
                  borderWidth={"0"}
                  borderRadius={5}
                  borderBottomColor={"info.400"}
                  w={"100%"}
                  mt={10}
                  fontSize={18}
                  fontWeight="semibold"
                  color="black"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profile?.[field]}
                  onChangeText={(value) => handleInputChange(field, value)}
                  
                />
              </Box>
            ))}

              <VStack space={86} mt={-290} ml={3} mb={10}>
                <Text fontWeight={"bold"} fontSize={16} color={"gray.400"}>
                  Username
                </Text>
                <Text fontWeight={"bold"} fontSize={16} color={"gray.400"}>
                  Email
                </Text>
                <Text fontWeight={"bold"} fontSize={16} color={"gray.400"}>
                  No. Handphone
                </Text>
              </VStack>

            {/* Submit */}
            <Box
              alignSelf={"flex-end"}
              w="40%"
              bgColor="red.500"
              h={"12%"}
              mt={16}
              shadow={0}
              mb={0}
              borderColor="white"
              borderWidth={1}
              borderRadius={32}
            >
              <Pressable onPress={onSubmit}>
                <Box w="100%" h="100%" mt={0}>
                  <Heading
                    ml={0}
                    mt={3}
                    fontSize={20}
                    fontWeight="bold"
                    color="white"
                    alignSelf="center"
                  >
                    Save
                  </Heading>
                </Box>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};




export default EditProfile;
