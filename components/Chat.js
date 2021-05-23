import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, FlatList, Keyboard } from 'react-native';
import { Context } from '../App';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';

export default function Chat() {
   const { firestore } = React.useContext(Context);
   const [value, setValue] = React.useState('');
   const [messages] = useCollectionData(firestore.collection('messages').orderBy('createdAt'))
   const currentUser = useSelector(state => state.currentUser);

   const sendMessage = async () => {
      await firestore.collection('messages').add({
         uid: currentUser.uid,
         displayName: currentUser.displayName,
         text: value,
         createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setValue('');
   }
   const [arr, setArr] = useState([]);

   useEffect(() => {
      Keyboard.addListener("keyboardWillShow", _keyboardDidShow);
      Keyboard.addListener("keyboardWillHide", _keyboardDidHide);

   return () => {
      Keyboard.removeListener("keyboardWillShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardDidHide);
    };
   }, []);

   const [keyboardStatus, setKeyboardStatus] = useState(false);
   const _keyboardDidShow = () => setKeyboardStatus(true);
   const _keyboardDidHide = () => setKeyboardStatus(false);

   useEffect(() => {
      setArr(messages)
   }, [messages]);

   const renderItem = ({ item }) => (
      <View style={[styles.userChatBlock, item.uid === currentUser.uid && styles.currentUserChatBlock]} key={Math.random().toString(36).substring(6)}>
         <View style={[styles.avatarBlock, item.uid === currentUser.uid ? { backgroundColor: "#90EE90"} : { backgroundColor: "tomato"}]}>
            <View style={styles.userAvatar}>
               <Text style={{color: "white", fontWeight: "bold"}}>{item.displayName.slice(0,2).toUpperCase()}</Text>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 20}}>{item.displayName}</Text>
         </View>
         <View>
            <Text style={styles.userText}>{item.text}</Text>
         </View>
      </View>
  );

   if (arr === undefined) {
      return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Loading</Text>
         </View>
      )
   }

   return (
      <View style={styles.container}>
         <FlatList
            data={arr}
            renderItem={renderItem}
            keyExtractor={() => Math.random().toString(36).substring(6)}
         />
         <View style={[styles.inputBlock, keyboardStatus && {height: 305}]}>
            <TextInput 
               placeholder="Введите сообщение..."
               style={styles.input} 
               value={value}
               onChangeText={setValue}
            />
            <Button style={styles.button} onPress={sendMessage} title="Отправить" disabled={value === ""} />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#E6E6FA"
   },
   chatBlock: {
      flex: 1,
      borderWidth: 2,
      width: "100%",
      marginBottom: 15,
      padding: 10,
   },
   userChatBlock: {
      width: "80%",
      marginBottom: 10,
      borderWidth: 2,
      borderColor: 'red',
   },
   avatarBlock: {
      flexDirection: "row",
      alignItems: 'center'
   },
   userAvatar: {
      width: 30,
      height: 30,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5,
   },
   userText: {
      padding: 5,
      fontSize: 18,
   },
   currentUserChatBlock: {
      borderColor: 'green',
      alignSelf: "flex-end",
      justifyContent: "flex-end",
   },
   inputBlock: {
      width: "100%",
   },
   input: {
      height: 40,
      borderWidth: 1,
      textAlign: 'center',
      marginBottom: 5
   },
   button: {
      borderWidth: 1,
   }
})