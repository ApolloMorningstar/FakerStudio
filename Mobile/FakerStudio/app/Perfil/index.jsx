import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Perfil = () => {
    const [Nome, setNome] = useState('');
    const [Sobrenome, setSobrenome] = useState('');
    const [Email, setEmail] = useState('');
    const [DataNascimento, setDataNascimento] = useState('');
    const [Senha, setSenha] = useState('');
    const [imagemUri, setImagemUri] = useState('');
    const CapaLogin = require('./pasta_de_imagens/logo.png'); 
    const GoogleLogo = require('./pasta_de_imagens/logo.png'); 
    const IconPerfil = require('./pasta_de_imagens/iconPerfil.png')




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
                    console.log(data)
                    if (response.ok) {
                        setNome(data.Nome); 
                        setSobrenome(data.Sobrenome); 
                        setEmail(data.Email);
                        setDataNascimento(data.DataNascimento);
                        setSenha(data.Senha);
                        // setImagemUri(data.imagemUri || '');
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
    


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoTopLeftContainer}>
                    <Image style={styles.logoTopLeft} source={CapaLogin} />
                </View>

                <View style={styles.formContainer}>
                    <TouchableOpacity onPress={selecionarImagem} style={styles.profileImageContainer}>
                        {imagemUri ? (
                            <Image source={{ uri: imagemUri }} style={styles.profileImage} />
                        ) : (
                            <Image source={IconPerfil} style={styles.profileImagePlaceholder} />
                        )}
                    </TouchableOpacity>


                    {imagemUri ? <Image source={{ uri: imagemUri }} style={styles.previewImagem} /> : null}

                    <Text style={styles.title}>Perfil</Text>
                    
                    <TouchableOpacity style={styles.googleButton}>
                        <Image source={GoogleLogo} style={styles.googleLogo} />
                        <Text style={styles.googleButtonText}>Logado com o Google</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        onChangeText={setNome}
                        value={Nome}
                        placeholder="Nome"
                        placeholderTextColor="#333"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSobrenome}
                        value={Sobrenome}
                        placeholder="Sobrenome"
                        placeholderTextColor="#333"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={Email}
                        placeholder="Endereço de Email"
                        placeholderTextColor="#333"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={handleDateChange}
                        value={DataNascimento}
                        placeholder="Data de Nascimento (DD/MM/AAAA)"
                        placeholderTextColor="#333"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSenha}
                        value={Senha}
                        placeholder="Senha"
                        placeholderTextColor="#333"
                        secureTextEntry
                    />
                    {/* <Pressable onPress={Salvar_edicao_deInformacao} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Salvar</Text>
                    </Pressable> */}
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
        backgroundColor: '#333',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 50,
        shadowRadius: 15,
        elevation: 21,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Perfil;
