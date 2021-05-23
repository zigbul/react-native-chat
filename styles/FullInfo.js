import React from 'react';
import { View, Text } from 'react-native';
import { gStyle } from '../styles/style';

export default function FullInfo({ route }) {
   // const loadScene = () => {
   //    navigation.goBack();
   // }

    return (
      <View style={gStyle.main}>
        <Text style={gStyle.title}>{route.params.name}</Text>
        <Text>{route.params.full}</Text>
        {/* <Button title="Открыть страницу" onPress={loadScene} /> */}
      </View>
    );
}