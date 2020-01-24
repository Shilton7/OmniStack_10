import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main({ navigation }) {
  const [localizacaoAtual, setLocalizacaoAtual] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');

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

  async function carregaDevs() {
    const { latitude, longitude } = localizacaoAtual;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data);
  }

  //setando localização ao arrastar mapa com a mão
  function handleRegiaoChanged(region) {
    setLocalizacaoAtual(region);
  }

  if (!localizacaoAtual) {
    return null;
  }

  return (
    <>
      <MapView onRegionChangeComplete={handleRegiaoChanged} initialRegion={localizacaoAtual} style={styles.map}>
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: dev.avatar_url
              }}
            />

            <Callout
              onPress={() => {
                navigation.navigate('Profile', { github_username: dev.github_username });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devname}> {dev.name} </Text>
                <Text style={styles.devBio}> {dev.bio} </Text>
                <Text style={styles.devTechs}> {dev.techs.join(', ')} </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar devs por tecnologias'
          placeholderTextColor='#999'
          autoCapitalize='words' //Primeira letra caixa alta
          autoCorrect={false} //Não tentar corrigir o texto
          value={techs}
          onChangeText={setTechs} //chama função e passa o parametro pra ela
        ></TextInput>
        <TouchableOpacity style={styles.searchButton} onPress={carregaDevs}>
          <MaterialIcons name='search' size={40} color='#FFF' />
        </TouchableOpacity>
      </View>
    </>
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
  },
  searchForm: {
    position: 'absolute', //flutuar sobre o mapa
    top: 20,
    left: 20,
    right: 10,
    zIndex: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 20,
    // sombra IOS
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    // sombra android
    elevation: 1
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
});

export default Main;
