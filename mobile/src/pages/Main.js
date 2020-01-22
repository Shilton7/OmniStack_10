import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
  const [localizacaoAtual, setLocalizacaoAtual] = useState(null);

  useEffect(() => {
    async function carregaPosicaoInicial() {
      //permissão
      const { granted } = await requestPermissionsAsync();

      //recuperar localização atual
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true //gps habilitado
        });

        const { latitude, longitude } = coords;
        setLocalizacaoAtual({
          latitude,
          latitudeDelta: 0.04, //zoom maps
          longitude,
          longitudeDelta: 0.04 //zoom maps
        });
      }
    }
    carregaPosicaoInicial();
  }, []);

  if (!localizacaoAtual) {
    return null;
  }

  return (
    <MapView initialRegion={localizacaoAtual} style={styles.map}>
      <Marker coordinate={{ latitude: -19.8872186, longitude: -43.8004105 }}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/8092749?s=460&v=4' }} />

        <Callout
          onPress={() => {
            navigation.navigate('Profile', { github_username: 'Shilton7' });
          }}
        >
          <View style={styles.callout}>
            <Text style={styles.devname}>Shilton</Text>
            <Text style={styles.devBio}>Lorem Ipsum</Text>
            <Text style={styles.devTechs}>PHP, .NET</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  callout: {
    width: 260
  },
  devname: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  }
});

export default Main;
