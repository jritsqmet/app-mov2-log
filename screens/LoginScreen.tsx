import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';



export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user)
        console.log('Acceso correcto')
        navigation.navigate('Drawer_Welcome')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode)
        console.log(errorMessage)

        

        if ( errorCode === 'auth/invalid-credential'){
          Alert.alert('ERROR', 'El correo o contraseña no son válidos')
        }else if(errorCode === 'auth/missing-password') {
          Alert.alert( 'ERROR', 'No se admiten contraseñas en blanco')
        }else{
          Alert.alert('ERROR', 'Verifique las credenciales')
        }

      });
  }


  return (
    <View>
      <Text style={{ fontSize: 30 }}>Login</Text>

      <TextInput
        placeholder='Ingrese un correo'
        onChangeText={(texto) => (setCorreo(texto))}
        
      />

      <TextInput
        placeholder='Ingrese la contraseña'
        onChangeText={(texto) => (setContrasenia(texto))}
      />

      <Button title='Ingresar' onPress={() => login()} />

      <Text onPress={() => navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})