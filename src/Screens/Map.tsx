import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { Text } from "react-native-ui-lib";
import * as Location from "expo-location";
import axios from "axios";

type MapInfo = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type GeoCode = {
    name: string,
    location: {
        long: number;
        lat: number;
    };
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface Props {
  longitude: number;
  latitude: number;
  name: string;
}

export default function Map({latitude = 0, longitude = 0, name = ''}: Props ) {

  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [errorMsg, setErrorMsg] = useState("");
  const [mapInfo, setMapInfo] = useState<MapInfo>({
    latitude: 53.477992,
    longitude: -2.244891,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [geoCodes, setGeoCodes] = useState<GeoCode[]>([]);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    setMapInfo({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
  };

  useEffect(() => {
    userLocation()
    
    axios.get('https://javarewards-api.onrender.com/shops')
    .then((res) => {
      setGeoCodes(res.data.shops)
    })
  }, [])

  const mapRef = useRef<MapView | null>(null);

  function handleZoom(latitude: number, longitude: number) {
    if (mapRef.current) {
      const region = {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current.animateCamera({center: region, zoom: 18}, { duration: 2000 });
  }
  }

  return (
    <>
      <Text text80BO>Maps</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...mapInfo,
          latitude: latitude || mapInfo.latitude,
          longitude: longitude || mapInfo.longitude,
          latitudeDelta: latitude && longitude ? 0.002 : mapInfo.latitudeDelta,
          longitudeDelta: latitude && longitude ? 0.002 : mapInfo.longitudeDelta
        }}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
      >
      {latitude && longitude ? 
      (<Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={name}
      onPress={(e) => {
        handleZoom(latitude, longitude)
        console.log(e.nativeEvent)
      }
    }
      />) : geoCodes.map((geoCode, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: geoCode.location.lat,
            longitude: geoCode.location.long,
          }}
          title={geoCode.name}
          onPress={() => handleZoom(geoCode.location.lat, geoCode.location.long)}
        />
        ))}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    borderColor: 'black',
    width: '100%',
  },
  map: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    alignItems: 'center',
    borderRadius: 10
  },
});



