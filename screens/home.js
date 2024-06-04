import React, { useState, useEffect } from "react";
import { Pressable, ImageBackground, StyleSheet } from "react-native";
import { getData } from '../utils/localStorage';
import { Heading, Text, Box, HStack, Image, VStack, ScrollView, View } from "native-base";
import FIREBASE from "../config/FIREBASE";
import { Header } from "../components";
import { StatusBar } from "native-base";

const imagesSlideshow1 = [
  require('../assets/resmi.png'),
  require('../assets/resmi.png'),
  require('../assets/resmi.png'),
  // tambahkan gambar lainnya di sini
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
    navigation.navigate("Tbnonresmi", { category });
    navigation.navigate("Tbresmi", { category });
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
          <ScrollView borderRadius={"20"} horizontal pagingEnabled w={"100%"} h={"20%"}>
            {imagesSlideshow1.map((image, index) => (
              <Image
                key={index}
                source={image}
                alt={`Slide ${index}`}
                width={340} // Sesuaikan ukuran gambar sesuai kebutuhan
                height={250}
              />
            ))}
          </ScrollView>
        </Box>
        <Box flex={1} p={4} borderRadius={10}>
          <Heading >KATEGORI</Heading>
          <HStack alignSelf="center" mt={3} space={9}>
            <Pressable onPress={() => navigation.navigate("Tbresmi")}>
              {({ pressed }) => (
                <VStack alignItems="center">
                  <Image
                    source={require("../assets/resmi.png")}
                    alt="Kategori Resmi"
                    w={170}
                    h={120}
                    borderColor={pressed ? "gray.500" : "#774494"}
                    borderWidth={3}
                    borderRadius={10}
                  />
                  <Text bold mt={2}>Tambal Ban Resmi</Text>
                </VStack>
              )}
            </Pressable>
            <Pressable onPress={() => navigateToCategory("Tbnonresmi")}>
              {({ pressed }) => (
                <VStack alignItems="center">
                  <Image
                    source={require("../assets/nonresmi.jpg")}
                    alt="Kategori Non-Resmi"
                    w={170}
                    h={120}
                    borderColor={pressed ? "gray.500" : "#774494"}
                    borderWidth={3}
                    borderRadius={10}
                  />
                  <Text bold mt={2}>Tambal Ban Non-Resmi</Text>
                </VStack>
              )}
            </Pressable>
          </HStack>
        </Box>
          <Box alignSelf={"center"} w={"90%"} h={180} bg={"white"} borderRadius={10} borderWidth={3} borderColor={"#774494"} mt={-10}>
            <Image source={require("../assets/poster1.png")} w={"100%"} h={100} borderTopRadius={10} alt="poster1" />
            <Text ml={3} mt={3}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
          </Box>
          <Box alignSelf={"center"} w={"90%"} h={180} bg={"white"} borderRadius={10} borderWidth={3} borderColor={"#774494"} mt={10}>
            <Image source={require("../assets/poster1.png")} w={"100%"} h={100} borderTopRadius={10} alt="poster1" />
            <Text ml={3} mt={3}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
          </Box>

      </ScrollView>

    </>
  );
}

export default Home;
