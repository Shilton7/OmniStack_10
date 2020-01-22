import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
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

  return <MapView initialRegion={localizacaoAtual} style={syles.map} />;
}

const syles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default Main;
