import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      {/* Barra do app */}
      <StatusBar barStyle='light-content' backgroundColor='#7D40E7' />
      <Routes />
    </>
  );
}
