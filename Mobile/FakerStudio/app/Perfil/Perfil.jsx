import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProfileImage, setNewProfileImage] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
   
      try {
        const response = await fetch('http://localhost:8000/autentificacao/Perfil', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          setNomeCompleto(data.Nome_Completo);
          setEmail(data.Email);
          setNewProfileImage(data.profileImage || 'path-to-your-profile-image');
        } else {
          Alert.alert('Erro', 'Erro ao buscar informações do perfil');
          router.replace('/Login/Login'); // Redireciona para o login se houver erro
        }
      } catch (error) {
        console.log('Erro ao buscar informações do perfil:', error);
        Alert.alert('Erro', 'Erro ao se conectar com o servidor.');
        router.replace('/Login/Login'); // Redireciona para o login em caso de erro
      } finally {
        setLoading(false); // Para o indicador de carregamento após a busca
      }
    };

    fetchUserInfo();
  }, [router]);


  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!nomeCompleto || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const updatedUserInfo = { ...userInfo, Nome_Completo: nomeCompleto, Email: email, profileImage: newProfileImage };

    // Aqui você pode fazer uma requisição para atualizar o perfil no servidor
    const token = await AsyncStorage.getItem('tokenJWT');
    const response = await fetch('http://localhost:8000/autentificacao/AtualizarPerfil', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserInfo),
    });

    if (response.ok) {
      Alert.alert('Sucesso', 'Informações do perfil atualizadas com sucesso!');
      setUserInfo(updatedUserInfo);
    } else {
      Alert.alert('Erro', 'Erro ao atualizar as informações do perfil.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar informações do perfil.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={{ uri: newProfileImage }} style={styles.profileImage} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
          placeholder="Nome Completo"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.premiumButton} onPress={handlePremiumUpgrade}>
          <Text style={styles.premiumButtonText}>Assinar Premium</Text>
        </TouchableOpacity>
        <Button title="Salvar Informações" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#E0E0E0",
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  premiumButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  premiumButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FF6F61",
    fontSize: 16,
  },
});

export default Perfil;
