import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, TextInput, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLogin } from '../store/reducer';

export default function Login({ navigation }) {
   const currentUser = useSelector(state => state.currentUser);
   const isLogin = useSelector(state => state.isLogin);

   const [name, setName] = useState('');

   const dispatch = useDispatch();

   const onUserRegister = () => {
      const user = {
         displayName: name || 'anonymous',
         uid: Math.random().toString(36).substring(7),
      }
      dispatch(setUser(user));
      dispatch(setLogin(true));
      setName('');
   }

   const onUserLogOut = () => {
      dispatch(setUser(null));
      dispatch(setLogin(false));
   }

   return (
      // <View style={styles.container}>
      //    {!isLogin && <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Введите ник" />}
      //    <Button title="Войти в чат" disabled={!isLogin}  onPress={() => navigation.navigate('Chat')} />
      //    {!isLogin && <Button title="Регистрация" onPress={onUserRegister} />}
      // </View>
      <View style={styles.container}>
         <Image
            source={require('../assets/logo.png')}
            style={isLogin ? {top: 0, left: "25%"} : {top: "-13%", left: "25%"}}
         />
         {!isLogin 
            && 
         <TextInput 
            style={styles.input} 
            placeholder="Напиши имя"
            value={name} 
            onChangeText={setName} 
         />}
         {!isLogin 
            && 
         <Button 
            title="Регистрация" 
            disabled={name === ''}
            color="black"
            onPress={onUserRegister}
         />}
         {isLogin 
            && 
         <View>
            <View style={styles.avatarBlock}>
               <Text style={{color: "white", fontSize: 72}}>{currentUser.displayName.slice(0, 2).toUpperCase()}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-evenly",}}>  
               <Button color="black" title="Войти в чат" onPress={() => navigation.navigate('Chat')} />
               <Button color="black" title="Выйти" onPress={onUserLogOut} />
            </View>            
         </View>}
      </View>
   );
}

const styles = StyleSheet.create({
   container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignSelf: 'center', 
      width: "100%", 
      backgroundColor: "#4682B4"
   },
   input: {
      backgroundColor: 'white',
      width: "80%", 
      alignSelf: "center", 
      textAlign: 'center',
      height: 50,
      marginBottom: 20,
      top: -35
   },
   avatarBlock: { 
      width: 200, 
      height: 200, 
      borderRadius: 200 / 2, 
      backgroundColor: "black", 
      alignItems: "center", 
      justifyContent: "center",
      alignSelf: "center",
      marginBottom: 50
   }
})