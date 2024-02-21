import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import * as Location from "expo-location";

type MapInfo = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type GeoCode = {
  geocodes: {
      main: {
          longitude: number;
          latitude: number;
      };
  }
}

export default function Map() {
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

  const options = {
    method: "GET",
    headers: {
      accept: 'spplication/json',
      Authorization: 'fsq3XWC+lwpQPOnGwwcl9tPoxaxCM3TyWkcIveFR/mgZiUo='
    }
  }

  useEffect(() => {
    userLocation()
    
    fetch(`https://api.foursquare.com/v3/places/search?query=coffee&ll=${mapInfo.latitude}%2C${mapInfo.longitude}&radius=5000&categories=13035`, options).then((res) => {
      return res.json()
    }).then(({results}) => {
      setGeoCodes(results)
    })
  }, [])

  function handleZoom() {
    // e.preventDefault()
    // console.log(mapInfo)
    
    //  mapRef.current?.animateCamera({center: coffeShop, zoom: 18}, { duration: 2000 })
  }

  //implement ternary with map zoom for individual coffee shop for props - for mapInfo
  return (
    <>
      <Text>Find us on Google</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapInfo}
        showsUserLocation
        showsMyLocationButton
        // ref={mapRef}
      >
      {geoCodes.map((geoCode, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: geoCode.geocodes.main.latitude,
            longitude: geoCode.geocodes.main.longitude,
          }}
          title={geoCode.name}
        />
        ))}
        {/* <Marker coordinate={coffeeShop1} title={coffeeShop1.name} onPress={handleZoom}/> */}
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
    height: '100%'
  },
  map: {
    width: "80%",
    height: "25%",
    marginBottom: 80
  },
});
