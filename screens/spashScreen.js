import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import Svg, { G, Path } from "react-native-svg";
import { NetrisLogo, Separator } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NetrisLogo width="100%" height="100%" strokeWidth={6} />
      </View>
      <View style={{ flex: 5 }}>
        <Swiper
          dot={
            <View
              style={{
                backgroundColor: "#C7B4D3",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#774494",
                width: 20,
                height: 8,
                borderRadius: 10,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          style={styles.wrapper}
          showsButtons={false}
          loop={false}
        >
          <View style={styles.slide1}>
            <Image
              resizeMode="contain"
              style={{ height: "40%" }}
              source={require("../assets/slide1.png")}
            />
            <Separator h={15} />
            <Text
              style={{
                color: "#774494",
                fontFamily: "Inter_700Bold",
                fontSize: 18,
              }}
            >
             Easy To Use
            </Text>
            <Separator h={10} />
            <View style={{ width: "75%" }}>
              <Text
                style={{
                  color: "#774494",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "Inter_400Regular",
                }}
              >
                jika terjadi masalah ban, buka smartphone anda dan temukan
                bengkel ban terdekat
              </Text>
            </View>
          </View>
          <View style={styles.slide2}>
            <Image
              resizeMode="contain"
              style={{ height: "40%" }}
              source={require("../assets/slide2.png")}
            />
            <Separator h={15} />
            <Text
              style={{
                color: "#774494",
                fontFamily: "Inter_700Bold",
                fontSize: 18,
              }}
            >
              Quick Response
            </Text>
            <Separator h={10} />
            <View style={{ width: "75%" }}>
              <Text
                style={{
                  color: "#774494",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "Inter_400Regular",
                }}
              >
                Respon Cepat akan segera menuju lokasi Anda dengan peralatan lengkap.
              </Text>
            </View>
          </View>
          <View style={styles.slide3}>
            <Image
              resizeMode="contain"
              style={{ height: "40%" }}
              source={require("../assets/slide3.png")}
            />
            <Separator h={15} />
            <Text
              style={{
                color: "#774494",
                fontFamily: "Inter_700Bold",
                fontSize: 18,
              }}
            >
              Emergency Call
            </Text>
            <Separator h={10} />
            <View style={{ width: "75%" }}>
              <Text
                style={{
                  color: "#774494",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "Inter_400Regular",
                }}
              >
                24/7 Layanan siap membantu kapan saja, di mana saja, tanpa henti!
              </Text>
            </View>
          </View>
        </Swiper>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <View
            style={{
              width: 110,
              height: "40%",
              backgroundColor: "#774494",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "white", fontFamily: "Inter_400Regular" }}>
              Ayo Mulai!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;
