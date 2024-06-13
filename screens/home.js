import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { getData } from '../utils/localStorage';
import { Heading, Text, Box, HStack, Image, VStack, ScrollView, View, StatusBar } from "native-base";
import FIREBASE from "../config/FIREBASE";
import { Header } from "../components";

const imagesSlideshow1 = [
  require('../assets/baner3.png'),
  require('../assets/baner1.png'),
];

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
    if (category === "Tbnonresmi") {
      navigation.navigate("Tbnonresmi", { category });
    } else if (category === "Tbresmi") {
      navigation.navigate("Tbresmi", { category });
    }
  };
  return (
    <>
      <StatusBar barStyle="auto" backgroundColor="#774494" />
      <ScrollView>
        <Box bg="#774494" p={4}>
          <Heading color="white">Selamat Datang!</Heading>
          <Text fontSize={20} color="white">{profile?.name}</Text>
        </Box>
        <Box justifyContent="center" alignItems="center" my={5} mx={3} bg={"transparent"} borderColor={"#774494"} borderWidth={3} borderRadius={10}>
          <ScrollView borderRadius={"20"} horizontal pagingEnabled w={"100%"} h={150}>
            {imagesSlideshow1.map((image, index) => (
              <Image
                key={index}
                source={image}
                alt={`Slide ${index}`}
                style={{ width: 330, height: 150 }} // Menggunakan style untuk mengatur ukuran gambar
              />
            ))}
          </ScrollView>
        </Box>
        <Box flex={1} p={4} borderRadius={10}>
          <Heading>KATEGORI</Heading>
          <HStack mt={3} space={9}>
            <Pressable onPress={() => navigateToCategory("Tbresmi")}>
              {({ pressed }) => (
                <VStack alignItems="center">
                  <Image
                    source={require("../assets/img2.jpg")}
                    alt="Kategori Resmi"
                    style={{ width: 150, height: 120, borderColor: pressed ? "gray.500" : "#774494", borderWidth: 3, borderRadius: 10 }}
                  />
                  <Text bold mt={2}>Tambal Ban Resmi</Text>
                </VStack>
              )}
            </Pressable>

            <Pressable onPress={() => navigateToCategory("Tbnonresmi")} >
              {({ pressed }) => (
                <VStack alignItems="center">
                  <Image
                    source={require("../assets/nonresmi.jpg")}
                    alt="Kategori Non-Resmi"
                    style={{ width: 150, height: 120, borderColor: pressed ? "gray.500" : "#774494", borderWidth: 3, borderRadius: 10, }}
                  />
                  <Text bold mt={2}>Tambal Ban Non-Resmi</Text>
                </VStack>
              )}
            </Pressable>
          </HStack>
        </Box>
        <Box alignSelf={"center"} w={"90%"} h={166} bg={"white"} borderRadius={10} borderWidth={3} borderColor={"#774494"} mt={5}>
          <Image source={require("../assets/baner2.png")} style={{ width: "100%", height: 160, borderRadius:6 }} alt="poster1" />
        </Box>
        <Text my={5} alignSelf={"center"}>Powered by Netris Development </Text>
      </ScrollView>
    </>
  );
}

export default Home;
