import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  Separator,
  AuthTextInput,
  PwdInput,
  Profile,
} from "../components";
import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import FIREBASE from '../config/FIREBASE';
import { getData } from '../utils/localStorage';
import { Heading, Text, Box, Button, HStack, Center, Image } from "native-base";


const Home = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        console.log("isi data", data);
        setProfile(data);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <>
      <Box bg={"#774494"}>
        <Heading ml={4} mt={3} color={"white"}>Selamat Datang!</Heading>
        <Text fontSize={20} ml={4} color={"white"}>{profile?.name}</Text>
      </Box>
      <Box>
        <Heading alignSelf={"center"} mt={10}>PILIH KATEGORI</Heading>
        <HStack alignSelf={"center"} mt={20}>
          <Button h={40} w={40} mr={8} bg={"transparent"} borderColor={"#774494"} borderWidth={2}>
            <Image
              source={require("../assets/icon.png")}
              w="80%"
              h="40%"
              alt="Fisheesh Logo"
              alignSelf={"center"}
              mt={0}
            />
          </Button>
          <Button w={40} bg={"transparent"} borderColor={"#774494"} borderWidth={2}></Button>
        </HStack>
      </Box>
    </>
  )

}

export default Home;
