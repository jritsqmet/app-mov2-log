import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
//Imagen
import * as ImagePicker from 'expo-image-picker';


export default function GeneralScreen() {

  const [imagen, setImagen] = useState('')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
      console.log(result)
    }
  };


  return (
    <View>
      <Text>Subir una imagen desde la camara</Text>
      <Button title='Abrir camara' onPress={pickImage}/>
      <Image source ={{uri: imagen}} style={styles.img}/>
    </View>
  )
}

const styles = StyleSheet.create({
  img:{
    width:400,
    height:400
  }
})