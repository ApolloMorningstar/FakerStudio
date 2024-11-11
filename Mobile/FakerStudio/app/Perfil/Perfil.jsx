// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, TextInput, Button } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from 'expo-image-picker';
// import { useRouter } from "expo-router";


// import { AdvancedImage } from 'cloudinary-react-native';
// import { Cloudinary } from "@cloudinary/url-gen";

// const cld = new Cloudinary({
//   cloud: {
//       cloudName: 'demo'
//   },
//   url:{
//     secure: true
//   }
// });

// const Perfil = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [newProfileImage, setNewProfileImage] = useState('');
//   const [nomeCompleto, setNomeCompleto] = useState('');
//   const [email, setEmail] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       const token = await AsyncStorage.getItem('tokenJWT');
//       try {
//         const response = await fetch('http://localhost:8000/autentificacao/Perfil', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUserInfo(data);
//           setNomeCompleto(data.Nome_Completo);
//           setEmail(data.Email);
//           setNewProfileImage(data.profileImage || 'path-to-your-profile-image');
//         } else {
//           Alert.alert('Erro', 'Erro ao buscar informações do perfil');
//           router.replace('/Login/Login');
//         }
//       } catch (error) {
//         console.log('Erro ao buscar informações do perfil:', error);
//         Alert.alert('Erro', 'Erro ao se conectar com o servidor.');
//         router.replace('/Login/Login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, [router]);

//   const handleImagePicker = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setNewProfileImage(result.assets[0].uri);
//     }
//   };

//   const handleSave = async () => {
//     if (!nomeCompleto || !email) {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//       return;
//     }

//     const updatedUserInfo = { ...userInfo, Nome_Completo: nomeCompleto, Email: email, profileImage: newProfileImage };

//     const token = await AsyncStorage.getItem('tokenJWT');
//     const response = await fetch('http://localhost:8000/autentificacao/AtualizarPerfil', {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUserInfo),
//     });

//     if (response.ok) {
//       Alert.alert('Sucesso', 'Informações do perfil atualizadas com sucesso!');
//       setUserInfo(updatedUserInfo);
//     } else {
//       Alert.alert('Erro', 'Erro ao atualizar as informações do perfil.');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF6F61" />
//         <Text>Carregando...</Text>
//       </View>
//     );
//   }

//   if (!userInfo) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Erro ao carregar informações do perfil.</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.profileHeader}>
//         <TouchableOpacity onPress={handleImagePicker}>
//           <Image source={{ uri: newProfileImage }} style={styles.profileImage} />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.input}
//           value={nomeCompleto}
//           onChangeText={setNomeCompleto}
//           placeholder="Nome Completo"
//         />
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Email"
//           keyboardType="email-address"
//         />
//         <Button title="Salvar Informações" onPress={handleSave} />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     padding: 20,
//   },
//   profileHeader: {
//     alignItems: "center",
//     marginTop: 40,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//     backgroundColor: "#E0E0E0",
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "#FF6F61",
//     fontSize: 16,
//   },
// });

// export default Perfil;



import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 

export default function Perfil() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState('');
  const [appMemoria, setAppMemoria] = useState([]);

  useEffect(() => {
    buscarMemorias();
  }, []);

  const buscarMemorias = async () => { // Buscar todas as memórias salvas
    const resultadoMemorias = await AsyncStorage.getItem('@memorias');
    if (resultadoMemorias) {
      setAppMemoria(JSON.parse(resultadoMemorias));
    }
  };

  const salvarMemoria = async () => { // Salvar nova memória
    if (titulo && data && cidade && descricao && imagemUri) { // Verificar se todos os campos estão preenchidos
      const novaMemoria = { titulo, data, cidade, descricao, imagemUri };
      const novasMemorias = [...appMemoria, novaMemoria]; // Adicionando a nova memória na lista

      await AsyncStorage.setItem('@memorias', JSON.stringify(novasMemorias));
      setAppMemoria(novasMemorias);
      limparFormulario(); 
    } else {
      alert('Por favor, preencha todos os campos.'); 
    }
  };
 
//admito que precisei de uma ajudinha nessa parte
  const selecionarImagem = async () => {     // Abre a biblioteca de imagens do dispositivo

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Filtra para mostrar apenas imagens
      allowsEditing: true, // Permite que o usuário edite a imagem escolhida
      quality: 1, // Define a qualidade máxima da imagem selecionada
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri); // Acessar o URI da imagem selecionada corretamente
    }
  };

  const limparFormulario = () => {
    setTitulo('');
    setData('');
    setCidade('');
    setDescricao('');
    setImagemUri('');
  };

  const apagarMemoria = async (index) => {
    const novasMemorias = appMemoria.filter((_, i) => i !== index);
    await AsyncStorage.setItem('@memorias', JSON.stringify(novasMemorias));
    setAppMemoria(novasMemorias);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Memórias</Text>
      
      {appMemoria.length > 0 ? (
        appMemoria.map((memoria, index) => (
          <View key={index} style={styles.memoriaCard}>
            {memoria.imagemUri ? ( // Verificar se imagemUri não está vazio antes de renderizar
              <Image source={{ uri: memoria.imagemUri }} style={styles.imagem} />
            ) : null}
            <Text style={styles.titulo}>{memoria.titulo}</Text>
            <Text>{memoria.descricao}</Text>
            <Text>{memoria.cidade}, {memoria.data}</Text>
            <Button title="Apagar" onPress={() => apagarMemoria(index)} color="red" />
          </View>
        ))
      ) : (
        <Text style={styles.noMemoriaText}>Nenhuma memória salva</Text>
      )}

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Quando aconteceu? (ano)"
        value={data}
        onChangeText={setData}
        style={styles.input}
      />
      <TextInput
        placeholder="Onde aconteceu? (cidade)"
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
      />
      <TextInput
        placeholder="Conte sobre a memória"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <Button title="Selecionar Imagem" onPress={selecionarImagem} />
      {imagemUri ? <Image source={{ uri: imagemUri }} style={styles.previewImagem} /> : null}

      <Button title="Adicionar" onPress={salvarMemoria} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  memoriaCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  previewImagem: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noMemoriaText: {
    fontSize: 16,
    marginBottom: 20,
  },
});




