import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Perfil = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [imagemUri, setImagemUri] = useState('');
    const capaLogin = require('./pasta_de_imagens/logo.png'); 
    const logoGoogle = require('./pasta_de_imagens/logo.png'); 
    const iconePerfil = require('./pasta_de_imagens/iconPerfil.png');

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem('tokenJWT');
                const userId = await AsyncStorage.getItem('id');

                if (userId && token) {
                    const response = await fetch(`http://localhost:8000/usuarios/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    const data = await response.json();
                    if (response.ok) {
                        setNome(data.Nome); 
                        setSobrenome(data.Sobrenome); 
                        setEmail(data.Email);
                        setDataNascimento(data.DataNascimento);
                        setSenha(data.Senha);
                    } else {
                        Alert.alert('Erro', 'Falha ao carregar os dados do perfil');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPerfil();
    }, []);

    const handleDateChange = (text) => {
        const maskedText = text
            .replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, '$1/$2') 
            .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
        setDataNascimento(maskedText); 
    };

    const selecionarImagem = async () => {    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            quality: 1, 
        });
    
        if (!result.canceled) {
            setImagemUri(result.assets[0].uri); 
        }
    };

    const salvarEdicaoDeInformacao = async () => {
        try {
            const token = await AsyncStorage.getItem('tokenJWT');
            const userId = await AsyncStorage.getItem('id');
            
            if (!token) {
                Alert.alert('Erro', 'Token não encontrado.');
                return;
            }
    
            if (!userId) {
                Alert.alert('Erro', 'ID do usuário não encontrado.');
                return;
            }
    
            const dadosAtualizados = {
                Nome: nome,
                Sobrenome: sobrenome,
                Email: email,
                Senha: senha,
                DataNascimento: dataNascimento,
                imagemUri
            };
    
            const response = await fetch(`http://localhost:8000/autentificacao/ChangePerfil`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados),
            });
    
            if (response.ok) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Falha ao atualizar o perfil.';
                Alert.alert('Erro', errorMessage);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoTopLeftContainer}>
                    <Image style={styles.logoTopLeft} source={capaLogin} />
                </View>

                <View style={styles.formContainer}>
                    <TouchableOpacity onPress={selecionarImagem} style={styles.profileImageContainer}>
                        {imagemUri ? (
                            <Image source={{ uri: imagemUri }} style={styles.profileImage} />
                        ) : (
                            <Image source={iconePerfil} style={styles.profileImagePlaceholder} />
                        )}
                    </TouchableOpacity>

                    {imagemUri ? <Image source={{ uri: imagemUri }} style={styles.previewImagem} /> : null}

                    <Text style={styles.title}>Perfil</Text>
                    
                    <TouchableOpacity style={styles.googleButton}>
                        <Image source={logoGoogle} style={styles.googleLogo} />
                        <Text style={styles.googleButtonText}>Logado com o Google</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        onChangeText={setNome}
                        value={nome}
                        placeholder="Nome"
                        placeholderTextColor="#333"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSobrenome}
                        value={sobrenome}
                        placeholder="Sobrenome"
                        placeholderTextColor="#333"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Endereço de Email"
                        placeholderTextColor="#333"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={handleDateChange}
                        value={dataNascimento}
                        placeholder="Data de Nascimento (DD/MM/AAAA)"
                        placeholderTextColor="#333"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSenha}
                        value={senha}
                        placeholder="Senha"
                        placeholderTextColor="#333"
                        secureTextEntry
                    />
                    <Pressable onPress={salvarEdicaoDeInformacao} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Salvar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE5E5', 
        padding: 20,
    },
    scrollViewContent: {
        alignItems: 'center', 
        paddingBottom: 20, 
    },
    logoTopLeftContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    logoTopLeft: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 100, 
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileImagePlaceholder: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', 
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 15,
        width: '100%',
    },
    googleLogo: {
        width: 40,
        height: 30,
        marginLeft: 0,
        marginRight: 8,
    },
    googleButtonText: {
        color: '#333',
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        marginBottom: 15,
        backgroundColor: 'white',
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
    },
    previewImagem: {
        marginTop: 15,
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});

export default Perfil;
