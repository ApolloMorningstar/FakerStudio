import React, { useState, useEffect } from "react";
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

    const token = "seu_token_aqui"; 

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await fetch('http://localhost:3000/perfil', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setNome(data.Nome_Completo.split(' ')[0]); 
                    setSobrenome(data.Nome_Completo.split(' ')[1]);
                    setEmail(data.Email);
                } else {
                    Alert.alert('Erro', 'Falha ao carregar os dados do perfil');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPerfil();
    }, []);

    
    const handleSendImage = async () => {
        if (!imagemUri) {
            Alert.alert("Erro", "Nenhuma imagem foi selecionada");
            return;
        }
    
        let formData = new FormData();
        formData.append('file', {
            uri: imagemUri,
            name: 'profile_image.jpg',
            type: 'image/jpeg'
        });
        formData.append('upload_preset', 'ml_default');
        formData.append('name', 'teste');
    
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dgzxx5pbz/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            });
    
            const result = await response.json();
            if (response.ok) {
                setImagemUri(result.secure_url); 
                saveNewImageURLonBackend(result.secure_url); 
            } else {
                Alert.alert('Erro no upload', 'O upload da imagem falhou');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    


    const handleDateChange = (text) => {
        const maskedText = text
            .replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, '$1/$2') 
            .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
        setDataNascimento(maskedText);
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para editar a foto de perfil.");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImagemUri(result.uri);
        }
    };

    const Salvar_edicao_deInformacao = () => {
        Alert.alert('Informações Salvas', `Nome: ${Nome}\nSobrenome: ${Sobrenome}\nEmail: ${Email}\nData de Nascimento: ${DataNascimento}\nSenha: ${Senha}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoTopLeftContainer}>
                    <Image style={styles.logoTopLeft} source={CapaLogin} />
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.profileImageContainer}>
                        {imagemUri ? (
                            <Image source={{ uri: imagemUri }} style={styles.profileImage} />
                        ) : (
                            <Text style={styles.profileImagePlaceholder}>Selecionar Imagem</Text>
                        )}
                    </View>

                    <Button title="Selecionar Imagem" onPress={pickImage} />

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
                    <Pressable onPress={Salvar_edicao_deInformacao} style={styles.loginButton}>
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
        color: '#666',
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
