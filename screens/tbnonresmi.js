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

const Tbnonresmi = ({ navigation }) => {
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
      nama: "Tambal ban cak imin",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      latitude: -7.3300,
      longitude: 112.7300,
    },
    {
      id: 1,
      nama: "Tambal ban jetis kulon",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      latitude: -7.3320,
      longitude: 112.7320,
    },
    {
      id: 2,
      nama: "Tambal ban mas bro",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      latitude: -7.3340,
      longitude: 112.7340,
    },
    {
      id: 3,
      nama: "Tambal ban sis",
      tipe: "Bengkel mobil",
      alamat: "Jl bareng cuma temen",
      latitude: -7.3360,
      longitude: 112.7360,
    },
    {
      id: 4,
      nama: "Tambal ban pak dono",
      tipe: "Bengkel mobil",
      alamat: "Jl bareng cuma temen",
      latitude: -7.3380,
      longitude: 112.7380,
    },
    {
      id: 5,
      nama: "Tambal ban banjaya",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      latitude: -7.3400,
      longitude: 112.7400,
    },
    {
      id: 6,
      nama: "Tambal ban barokah",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      latitude: -7.3420,
      longitude: 112.7420,
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
          source={require("../assets/tambalBan.jpg")}
        />
      </View>
      <View style={styles.itemTextContainer} >
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
      <Header title={"Tambal Ban Non Resmi"} withBack={true} />
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

export default Tbnonresmi;
