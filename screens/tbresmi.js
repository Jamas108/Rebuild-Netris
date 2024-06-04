import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    Linking,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
  import * as Location from "expo-location";
  import { Header } from "../components";
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    map: {
      width: "100%",
      height: "100%",
    },
    zoomControls: {
      position: "absolute",
      bottom: 10,
      right: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    zoomButton: {
      width: 50,
      height: 50,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      marginHorizontal: 5,
      elevation: 5,
    },
    itemContainer: {
      height: Dimensions.get("window").height * 0.22,
      width: Dimensions.get("window").width * 0.8,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: "#A7A7A7",
      marginHorizontal: 15,
      marginVertical: 20,
    },
    selectedItem: {
      backgroundColor: "#DCCDE5",
    },
    itemImage: {
      width: "100%",
      height: "100%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    itemTextContainer: {
      flex: 1.3,
      paddingLeft: 10,
      justifyContent: "center",
    },
    itemTitle: {
      fontFamily: "Inter_700Bold",
      fontSize: 16,
      color: "#5A1781",
    },
    itemSubtitle: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
    },
  });
  
  const Tbresmi = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [chooseItem, setChooseItem] = useState(null);
    const [region, setRegion] = useState({
      latitude: -7.3385169,
      longitude: 112.719163,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  
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
          setRegion((prevRegion) => ({
            ...prevRegion,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }));
        } catch (error) {
          setError("Error getting user location: " + error);
        }
      };
      fetchCurrentLocation();
    }, []);
  
    const listTambalBan = [
      {
        id: 0,
        nama: "Planet Ban Ketintang",
        tipe: "Bengkel dan Tambal ban motor",
        alamat: "Jl Ketintang no 168, Ketintang, Kec. Gayungan",
        latitude: -7.309561701488813,
        longitude: 112.7309468107077,
        image: require("../assets/TambalBanKetintang.jpg"),
      },
      {
        id: 1,
        nama: "Planet Ban Kebon Agung Karah",
        tipe: "Bengkel dan Tambal ban motor",
        alamat: "Jl Kebon Agung No 36A, Karah, Kec. Jambangan",
        latitude: -7.309275037695425,
        longitude: 112.71891753824961,
        image: require("../assets/planetbankarah.jpg"),
      },
      {
        id: 2,
        nama: "Planet Ban Siwalankerto",
        tipe: "Bengkel dan Tambal ban motor",
        alamat: "Jl Siwalankerto Timur No 280",
        latitude: -7.33483197680102,
        longitude: 112.74193339221941,
        image: require("../assets/planetbansiwalankerto.jpg"),
      },
      {
        id: 3,
        nama: "Planet Ban Bendul Merisi Jagir",
        tipe: "Bengkel dan Tambal ban motor",
        alamat: "Jl Bendul Merisi No 165",
        latitude: -7.30508835993015,
        longitude: 112.74816359962314,
        image: require("../assets/planetbanbendulmerisi.jpg"),
      },
      {
        id: 4,
        nama: "Planet Ban Bratang Gede",
        tipe: "Bengkel dan Tambal ban motor",
        alamat: "Jl Bratang Gede No. 128",
        latitude: -7.297097025988237,
        longitude: 112.75514652967456,
        image: require("../assets/planetbanngagel.jpg"),
      },
      {
        id: 5,
        nama: "Planet Ban Kalibokor Pucang Sewu",
        tipe: "Bengkel dan Tambal ban motor",
        alamat: "Jl Pucang Sewu",
        latitude: -7.282999180629228,
        longitude: 112.75115594565331,
        image: require("../assets/planetbanpucangsewu.jpg"),
      },
      {
        id: 6,
        nama: "Planet Ban Kertajaya",
        tipe: "Bengkel dan Tambal ban motor",
        alamat: "Jl Kertajaya No 146",
        latitude: -7.2775928714798965,
        longitude: 112.75643453289021,
        image: require("../assets/planetbankertajaya.jpg"),
      },
    ];
  
    const handlePressItem = (item) => {
        setChooseItem(item.id);
        setRegion({
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      };
    
      const openInGoogleMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url);
      };
    
      const renderItem = ({ item }) => (
        <TouchableOpacity
          onPress={() => handlePressItem(item)}
          style={[
            styles.itemContainer,
            item.id === chooseItem && styles.selectedItem,
          ]}
        >
          <View style={{ flex: 1 }}>
            <Image
              style={styles.itemImage}
              source={item.image}
            />
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>{item.nama}</Text>
            <Text style={styles.itemSubtitle}>{item.tipe}</Text>
            <Text style={styles.itemSubtitle}>{item.alamat}</Text>
            {item.id === chooseItem && (
              <TouchableOpacity
                onPress={() => openInGoogleMaps(item.latitude, item.longitude)}
                style={{
                    marginTop: 10,
                    marginLeft: -5,
                    width: "100%",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: '#5A1781',
                    borderRadius: 5,
                }}
              >
                <Text style={{ color: '#fff' }}>Buka di Google Maps</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      );
    
      const handleZoomIn = () => {
        setRegion((prevRegion) => ({
          ...prevRegion,
          latitudeDelta: prevRegion.latitudeDelta / 2,
          longitudeDelta: prevRegion.longitudeDelta / 2,
        }));
      };
    
      const handleZoomOut = () => {
        setRegion((prevRegion) => ({
          ...prevRegion,
          latitudeDelta: prevRegion.latitudeDelta * 2,
          longitudeDelta: prevRegion.longitudeDelta * 2,
        }));
      };
    
      return (
        <>
          <Header title={"Tambal Ban Resmi"} withBack={true} />
          <View style={styles.container}>
            <View style={{ flex: 3 }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsCompass={true}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
                style={styles.map}
              >
                {currentLocation && (
                  <Marker
                    coordinate={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                    }}
                    title="My Location"
                  />
                )}
                {listTambalBan.map((item) => (
                  <Marker
                    key={item.id}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    title={item.nama}
                    description={item.alamat}
                  />
                ))}
              </MapView>
              <View style={styles.zoomControls}>
                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
                  <Text style={{ fontSize: 18 }}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
                  <Text style={{ fontSize: 18 }}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
            >
              <FlatList
                data={listTambalBan}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </>
      );
    };
    
    export default Tbresmi;