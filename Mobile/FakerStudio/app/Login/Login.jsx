import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const CapaSignUp = require('./pasta_de_imagens/logo.png'); 
    const GoogleLogo = require('./pasta_de_imagens/logo.png'); 

    const { width } = useWindowDimensions();

    const LogarUsuario = async () => {
        if (!email || !senha || senha !== confirmarSenha) {
            console.log('Os parâmetros email e senha não foram fornecidos ou as senhas não coincidem');
            return;
        }
        try {
            const resposta = await fetch("http://localhost:8000/autentificacao/Login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: Email,
                    Senha: Senha,
                })
            });


            if (resposta.ok) {
                console.log('Usuário criado com sucesso');
                setEmail('');
                setSenha('');
                setConfirmarSenha('');
            } else {
                console.log('Ocorreu um erro:', resposta.status);
            }
        } catch (error) {
            console.log('Erro na solicitação:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={CapaSignUp} />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <TouchableOpacity style={styles.googleButton}>
                    <Image source={GoogleLogo} style={styles.googleLogo} />
                    <Text style={styles.googleButtonText}>Faça Login com o Google</Text>
                </TouchableOpacity>
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
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Senha"
                    placeholderTextColor="#333"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmarSenha}
                    value={confirmarSenha}
                    placeholder="Confirmação da Senha"
                    placeholderTextColor="#333"
                    secureTextEntry
                />
                <Pressable onPress={LogarUsuario} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Entrar</Text>
                </Pressable>
                <Text style={styles.footerText}>
                    Ao continuar, você concorda com nossos Termos de Serviço. Leia nossa política de privacidade.
                </Text>
            </View>
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
});

export default Login;

