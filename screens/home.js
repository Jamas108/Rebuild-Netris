import React, { useState, useEffect } from "react";
import { Dimensions, Platform, Pressable } from "react-native";
import { getData } from '../utils/localStorage';
import { Heading, Text, Box, HStack, Image, VStack } from "native-base";

const Home = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getData("user");
        if (data) {
          console.log("isi data", data);
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const navigateToCategory = (category) => {
    // Implementasi navigasi ke halaman yang sesuai berdasarkan kategori di sini
    // Contoh:
    // navigation.navigate("Category", { category });
  };

  return (
    <>
      <Box bg={"#774494"} p={4}>
        <Heading color={"white"}>Selamat Datang!</Heading>
        <Text fontSize={20} color={"white"}>{profile?.name}</Text>
      </Box>
      <Box flex={1} p={4}>
        <Heading alignSelf={"center"} mt={10}>PILIH KATEGORI</Heading>
        <HStack alignSelf={"center"} mt={10} space={4}>
          <Pressable onPress={() => navigateToCategory("resmi")}>
            {({ pressed }) => (
              <VStack alignItems="center">
                <Image
                  source={require("../assets/resmi.png")}
                  alt="Fisheesh Logo"
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
                  alt="Fishe"
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
