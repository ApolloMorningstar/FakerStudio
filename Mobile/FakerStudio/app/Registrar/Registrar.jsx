import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, useWindowDimensions, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';

const Registrar = () => {
    const [Nome, setNome] = useState('');
    const [Sobrenome, setSobrenome] = useState('');
    const [Email, setEmail] = useState('');
    const [DataNascimento, setDataNascimento] = useState('');
    const [Senha, setSenha] = useState('');

    const CapaLogin = require('./pasta_de_imagens/logo.png');
    const GoogleLogo = require('./pasta_de_imagens/logo_deuses.png');

    const { width } = useWindowDimensions();

    const realizarRegistro = async () => {
        if (!Nome || !Sobrenome || !Email || !DataNascimento || !Senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const resposta = await fetch('http://localhost:8000/autentificacao/Registro', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Nome, Sobrenome, Email, DataNascimento, Senha })
            });

            if (resposta.ok) {
                Alert.alert('Sucesso', 'Usuário registrado com sucesso');
                setNome('');
                setSobrenome('');
                setEmail('');
                setDataNascimento('');
                setSenha('');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao registrar.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro na solicitação: ' + error.message);
        }
    };

    const handleDateChange = (text) => {
        const maskedText = text
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2') 
            .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3'); 
        setDataNascimento(maskedText);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={CapaLogin} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registrar</Text>
                    <TouchableOpacity style={styles.googleButton}>
                        <Image source={GoogleLogo} style={styles.googleLogo} />
                        <Text style={styles.googleButtonText}>Cadastre-se com o Google</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        value={Nome}
                        onChangeText={setNome}
                        placeholder="Nome"
                    />
                    <TextInput
                        style={styles.input}
                        value={Sobrenome}
                        onChangeText={setSobrenome}
                        placeholder="Sobrenome"
                    />
                    <TextInput
                        style={styles.input}
                        value={Email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        value={DataNascimento}
                        onChangeText={handleDateChange}
                        placeholder="Data de Nascimento"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={Senha}
                        onChangeText={setSenha}
                        placeholder="Senha"
                        secureTextEntry
                    />
                    <Pressable onPress={realizarRegistro} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Registrar</Text>
                    </Pressable>

                    <Text style={styles.footerText}>Já tem uma conta? <Link href="/login">Entre</Link></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE5E5',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        marginTop: 50,
        marginBottom: 20,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
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
    registerButton: {
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
    registerButtonText: {
        color: 'white',
        fontSize: 16,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#888',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    errorMessage: {
        color: 'red',
    },
});

export default Registrar;
