import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';



export default function RegistroScreen( {navigation}: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('Registro Correcto')
        navigation.navigate('Login')
        console.log(user)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode)
        console.log(errorMessage)
        Alert.alert('ERROR', 'Registro no valido')
      });
  }

  return (
    <View>
      <Text>REGISTRO</Text>

      <TextInput
        placeholder='Ingresar correo'
        onChangeText={(text) => (setCorreo(text))}
        keyboardType='email-address'
      />

      <TextInput
        placeholder='Ingresar contrasenia'
        onChangeText={(text) => (setContrasenia(text))}
      />

      <Button title='Registrarse' onPress={() => registro()} />

    </View>
  )
}

const styles = StyleSheet.create({})