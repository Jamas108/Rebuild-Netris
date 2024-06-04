import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { getData } from '../utils/localStorage';
import { Heading, Text, Box, HStack, Image, VStack } from "native-base";
import FIREBASE from "../config/FIREBASE";

const Home = ({ navigation }) => {
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getUserData);
    return () => unsubscribe();
  }, [navigation]);

  const navigateToCategory = (category) => {
    // Implement navigation to the category page
    // Example:
    // navigation.navigate("Category", { category });
  };

  return (
    <>
      <Box bg="#774494" p={4}>
        <Heading color="white">Selamat Datang!</Heading>
        <Text fontSize={20} color="white">{profile?.name}</Text>
      </Box>
      <Box flex={1} p={4}>
        <Heading alignSelf="center" mt={10}>PILIH KATEGORI</Heading>
        <HStack alignSelf="center" mt={10} space={4}>
          <Pressable onPress={() => navigation.navigate("TbResmi")}>
            {({ pressed }) => (
              <VStack alignItems="center">
                <Image
                  source={require("../assets/resmi.png")}
                  alt="Kategori Resmi"
                  w={170}
                  h={120}
                  borderColor={pressed ? "gray.500" : "black"}
                  borderWidth={2}
                />
                <Text mt={2}>Kategori Resmi</Text>
              </VStack>
            )}
          </Pressable>
          <Pressable onPress={() => navigateToCategory("nonresmi")}>
            {({ pressed }) => (
              <VStack alignItems="center">
                <Image
                  source={require("../assets/nonresmi.jpg")}
                  alt="Kategori Non-Resmi"
                  w={170}
                  h={120}
                  borderColor={pressed ? "gray.500" : "black"}
                  borderWidth={2}
                />
                <Text mt={2}>Kategori Non-Resmi</Text>
              </VStack>
            )}
          </Pressable>
        </HStack>
      </Box>
    </>
  );
}

export default Home;
