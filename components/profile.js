import { View, Text, Image, StyleSheet, TouchableOpacity, } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  profile: {
    height: 60,
    width: 60,
    justifyContent: "center",
  },
});

const Profile = (props) => {
  return (
    <>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={props.nav}>
          <Image
            style={styles.profile}
            source={require("../assets/pp.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", paddingLeft: 15 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
          }}
        >
          Halo, {props.name}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 13,
          }}
        >
          Hati hati dijalan :)
        </Text>
      </View>
    </>
  );
};

export default Profile;
