import React, { useState, useEffect } from "react";
import { StatusBar, Image, Box, Heading, Text, Pressable, ScrollView } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons"
import { Header } from "../components";
import FIREBASE from "../config/FIREBASE";
import { clearStorage, getData } from "../utils/localStorage";

const Profile = ({ navigation }) => {
    const [Profile, setProfile] = useState(null);

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

    const onSubmit = (Profile) => {
        if (Profile) {
            FIREBASE.auth()
                .signOut()
                .then(() => {
                    // Sign-out successful.
                    clearStorage();
                    navigation.replace("Login");
                })
                .catch((error) => {
                    // An error happened.
                    alert(error);
                });
        } else {
            navigation.replace("Login");
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", getUserData);

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    return (
         <ScrollView>
            <Header title={"Profile"} />
                <StatusBar backgroundColor="#ffffff" barStyle='dark-content' />
                
                <Box mt={"1"} padding={"1"} alignContent={"baseline"}>
                    <Image
                        source={require("../assets/tambalBan.jpg")}
                        borderRadius={5} h={200} w="100%"
                        alt="-" />
                </Box>

                <Box alignSelf="center" w={"90%"} bgColor={"purple.700"} h={"25%"}
                    shadow={"9"}mt={5} mb={20} borderColor={"white"}
                    borderWidth={"1"} borderRadius={10}>

                    {/*Detail User */}
                    <Box alignItems={"center"} w={58}  h={58} bgColor={"purple.500"} borderRadius={90} borderColor={"blue.100"} borderWidth={8} mt={4} ml={3}>
                        <Ionicons name="person-circle-outline" color={"white"} size={39} />
                    </Box>

                    <Heading shadow={5} alignSelf={"center"} ml={8} mt={-41} fontSize={20} fontWeight={"extrabold"} color={"white"}>
                        DETAIL USER
                    </Heading>

                    <Box marginTop={6} ml={"16"}>
                        <Ionicons name="information-circle" color={"red"} size={28}
                        />
                        <Text ml={"10"} mt={-6} fontSize={18} fontWeight={"normal"}
                            color={"white"}>
                            {Profile?.name}
                        </Text>
                    </Box>

                    <Box marginTop={"6"} ml={"16"}>
                        <Ionicons name="mail" color={"red"} size={28} />
                        <Text ml={"10"} mt={-7} fontSize={18} fontWeight={"normal"}
                            color={"white"}>
                            {Profile?.email}
                        </Text>
                    </Box>

                    {/* <Box marginTop={"6"} ml={"16"}>
                        <Ionicons name="call" color={"red"} size={28} />
                        <Text ml={"10"} mt={-7} fontSize={18} fontWeight={"normal"}
                            color={"black"}>
                            {Profile?.nomorhp}
                        </Text>
                    </Box> */}
                </Box>

                <Box mt={-20} mx={5}>
                    {/* Riwayat  Transaksi */}
                    {/* <Box w={"100%"} bg={"info.500"} h={"75"} mt={"8"}
                        shadow={"9"} mb={"0"} borderColor={"white"} borderWidth={"1"} borderRadius={10}>
                        <Pressable onPress={() => navigation.navigate("riwayat-transaksi")} >

                            <Box w={"100%"} h={"100%"} mt={"0"}>
                                <Heading ml={2} mt={5} fontSize={20} fontWeight={"bold"} color={"white"} alignSelf={"center"} >
                                    Riwayat Transaksi
                                </Heading>
                            </Box>
                        </Pressable>
                    </Box> */}

                    {/* Edit Profile */}
                    <Box w={"100%"} bg={"purple.600"} h={"75"} mt={"5"}
                        shadow={"9"} mb={"0"} borderColor={"white"} borderWidth={"1"} borderRadius={10}>
                        <Pressable onPress={() => navigation.navigate("edit-profile")} >

                            <Box w={"100%"} h={"100%"} mt={"0"}>
                                <Heading ml={2} mt={5} fontSize={20} fontWeight={"bold"} color={"white"} alignSelf={"center"} >
                                    Edit Profile
                                </Heading>
                            </Box>
                        </Pressable>
                    </Box>

                    {/* Logout */}
                    <Box w={"100%"} bgColor={"red.500"} h={"75"} mt={"5"}
                        shadow={"9"} mb={"0"} borderColor={"white"} borderWidth={"1"} borderRadius={10}>
                        <Pressable onPress={() => onSubmit(Profile)} >

                            <Box w={"100%"} h={"100%"} mt={"0"}>
                                <Heading ml={2} mt={5} fontSize={20} fontWeight={"bold"} color={"white"} alignSelf={"center"}>
                                    Log Out
                                </Heading>
                            </Box>
                        </Pressable>
                    </Box>

                   
                </Box>
                <Box h={200}/>
            </ScrollView>
    );
};

export default Profile;