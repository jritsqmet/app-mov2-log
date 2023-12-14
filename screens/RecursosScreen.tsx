import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

//IMAGEN
import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';


export default function RecursosScreen() {

  const [imagen, setImagen] = useState('')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
      //console.log(result)
    }
  };


  async function subir() {
    //Ruta de la imagen
    const storageRef = ref(storage, 'test/imagen23.jpg');

    //Convertir la imagen a una matriz de bytes
    const response = await fetch(imagen);
    const blob = await response.blob();

    try {
      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });
      console.log('La imagen se subió con éxito');

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>Subir una Imagen desde la Galería</Text>
      <Button title='Seleccionar imagen' onPress={() => pickImage()} />
      <Image
        source={{ uri: imagen }}
        style={styles.img}
      />
      <Button title='Subir' onPress={() => subir()} />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 400,
    height: 400
  }
})