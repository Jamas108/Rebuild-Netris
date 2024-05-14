import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    FlatList,
  } from "react-native";
  import { TextInput } from "react-native-paper";
  import {
    Separator,
    Button,
    AuthTextInput,
    PwdInput,
    Profile,
  } from "../components";
  import React, { useRef, useState, useEffect } from "react";
  import Carousel, { ParallaxImage } from "react-native-snap-carousel";
  import MapView, { Marker } from "react-native-maps";
  import * as Location from "expo-location";
  import FIREBASE from '../config/FIREBASE';
  import { clearStorage, getData } from '../utils/localStorage';
  
  const ENTRIES1 = [
    {
      title: "Beautiful and dramatic Antelope Canyon",
      subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
      illustration: "https://i.imgur.com/UYiroysl.jpg",
    },
    {
      title: "Earlier this morning, NYC",
      subtitle: "Lorem ipsum dolor sit amet",
      illustration: "https://i.imgur.com/UPrs1EWl.jpg",
    },
    {
      title: "White Pocket Sunset",
      subtitle: "Lorem ipsum dolor sit amet et nuncat ",
      illustration: "https://i.imgur.com/MABUbpDl.jpg",
    },
    {
      title: "Acrocorinth, Greece",
      subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
      illustration: "https://i.imgur.com/KZsmUi2l.jpg",
    },
    {
      title: "The lone tree, majestic landscape of New Zealand",
      subtitle: "Lorem ipsum dolor sit amet",
      illustration: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
  ];
  
  const { width: screenWidth } = Dimensions.get("window");
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingHorizontal: 20,
      // paddingVertical: 20,
      backgroundColor: "white",
    },
    containerMainMenu: {
      width: "100%",
      height: "100%",
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      backgroundColor: "white",
    },
    item: {
      width: 300,
      height: 150,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: "white",
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: "cover",
    },
    containerProfile: {
      flex: 1,
      paddingHorizontal: 20,
      // paddingVertical: 10,
      justifyContent: "center",
    },
    containerBody: {
      flex: 6,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    containerMainBox: {
      width: "100%",
      height: 300,
      backgroundColor: "#DCCDE5",
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 20,
      alignItems: "center",
      // justifyContent: "center",
    },
    containerMapView: {
      flex: 4,
      width: "100%",
      paddingBottom: 20,
    },
  });
  
  const Home = ({ navigation }) => {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [profile, setProfile] = useState(null);
  
    const goForward = () => {
      carouselRef.current.snapToNext();
    };
  
    const getUserData = () => {
      getData("user").then((res) => {
        const data = res;
        if (data) {
          console.log("isi data", data);
          setProfile(data);
        } else {
          // navigation.replace('Login');
        }
      });
    };
  
    useEffect(() => {
      const fetchCurrentLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setError("Permission to access location was denied");
            return;
          }
  
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location.coords);
        } catch (error) {
          setError("Error getting user location: " + error);
        }
      };
      fetchCurrentLocation();
    });
  
    useEffect(() => {
      setEntries(ENTRIES1);
    }, []);
  
    const dataBerita = [
      {
        id: 0,
        judul: "Pentingnya performa ban untuk berkendara",
        subJudul: "Performa buruk berbahaya",
        img: "https://i.ibb.co/mS5z6YM/ban.jpg",
      },
      {
        id: 1,
        judul: "Kriteria ban yang baik untuk kendaraanmu",
        subJudul: "beberapa kriteria ban yang baik",
        img: "https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2019/10/20210943/pjimage-2020-07-20T210935.586.jpg",
      },
      {
        id: 2,
        judul: "Ban bocor berpotensi sobek?",
        subJudul: "Bahaya ban bocor",
        img: "https://www.wahanahonda.com/assets/upload/berita/BERITA_1612703202_f313da56f339b5fb48dda003e147fb92.jpg",
      },
    ];
  
    const renderItem = ({ item, index }, parallaxProps) => {
      return (
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.illustration }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          {/* <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text> */}
        </View>
      );
    };
  
    const renderBerita = ({ item }) => {
      return (
        <>
          <View
            style={{
              width: "100%",
              height: 80,
              borderRadius: 10,
              backgroundColor: "#DCCDE5",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius:10 }}
                  source={{
                    uri: item.img,
                  }}
                ></Image>
                <View style={{ paddingHorizontal: 10, maxWidth: "80%" }}>
                  <Text
                    style={{
                      fontFamily: "Inter_700Bold",
                      color: "#5A1781",
                      fontSize: 13,
                    }}
                  >
                    {item.judul}
                  </Text>
                  {/* <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
                    {item.img}
                  </Text> */}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  // backgroundColor: "blue",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#774494",
                    width: "80%",
                    height: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>lebih</Text>
                </View>
              </View>
            </View>
          </View>
          <Separator h={15} />
        </>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.containerProfile}>
          <View style={{ flexDirection: "row" }}>
            <Profile name={"jamas"} />
          </View>
          {/* <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={100}
            itemWidth={screenWidth - 60}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
          /> */}
        </View>
        <View style={styles.containerBody}>
          <View style={{ flex: 1 }}>
            <View style={styles.containerMainBox}>
              <View style={styles.containerMapView}>
                <MapView
                  showsUserLocation={true}
                  showsCompass={true}
                  initialRegion={{
                    latitude: parseFloat(-7.3385169),
                    longitude: parseFloat(112.719163),
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                ></MapView>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Button
                  left={false}
                  text={"Cari tambal ban"}
                  op={() => navigation.navigate("Nerby")}
                  full={true}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1, paddingVertical: 20 }}>
            <Separator h={10} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16 }}>
                Seputar tambal ban
                <Text>{profile?.name}</Text>
              </Text>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
                Lihat semua
              </Text>
            </View>
            <Separator h={10} />
            {/* card berita */}
            <FlatList
              data={dataBerita}
              renderItem={renderBerita}
              keyExtractor={(item) => item.id}
              // horizontal={true}
              showsVerticalScrollIndicator={false}
            />
            {/* card berita */}
            {/* <View
              style={{
                width: "100%",
                height: 80,
                borderRadius: 10,
                backgroundColor: "#DCCDE5",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flex: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../assets/pp.png")}
                  ></Image>
                  <View style={{ paddingHorizontal: 10, maxWidth: "80%" }}>
                    <Text style={{ fontFamily: "Inter_700Bold" }}>Ini judul</Text>
                    <Text
                      style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}
                    >
                      Kabar hari ini mbah nafi tengah hamil tua
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    // backgroundColor: "blue",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#774494",
                      width: "80%",
                      height: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>lebih</Text>
                  </View>
                </View>
              </View>
            </View> */}
          </View>
        </View>
      </View>
    );
  };
  
  export default Home;
  