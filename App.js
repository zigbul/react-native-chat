import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import MainStack from './navigate';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { createContext } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDEYUpsIQBF4QVE-hNxC-navN4foSVnknE",
  authDomain: "chat-react-26831.firebaseapp.com",
  projectId: "chat-react-26831",
  storageBucket: "chat-react-26831.appspot.com",
  messagingSenderId: "687047977946",
  appId: "1:687047977946:web:df3e5ac1ac7b04a45b2ee3",
  measurementId: "G-PT568C5HVL"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export const Context = createContext(null)

export default function App() {
    return (
      <Provider store={store}>
        <Context.Provider value={{
          firebase,
          firestore
        }}>
          <MainStack />
        </Context.Provider>
      </Provider>
    );
}
