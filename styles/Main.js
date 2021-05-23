import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { gStyle } from '../styles/style';

export default function Main({ navigation }) {
   const [news, setNews] = useState([
      { name: 'Google', anons: 'Google!!!', full: 'Google is cool!' },
      { name: 'Apple', anons: 'Apple!!!', full: 'Apple is cool!' },
      { name: 'FaceBook', anons: 'FaceBook!!!', full: 'FaceBook is cool!' },
   ]);

   return (
      <View style={gStyle.main}>
        <Text style={gStyle.title}>Главная страница</Text>
        <FlatList data={news} renderItem={({ item }) => (
           <TouchableOpacity onPress={() => navigation.navigate('FullInfo', item)}>
              <Text>{ item.name }</Text>
              <Text>{ item.anons }</Text>
           </TouchableOpacity>
        )}/>
      </View>
   );
}