import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState(''); 
    const CapaSignUp = require('./pasta_de_imagens/logo.png'); 
    const GoogleLogo = require('./pasta_de_imagens/logo.png'); 

    const { width } = useWindowDimensions();
    const router = useRouter();

    const LogarUsuario = async () => {
        if (!Email || !Senha) {
            setMensagemErro('Preencha todos os campos.');
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

            const dados = await resposta.json();

            if (resposta.ok) {
                console.log(dados.message); 
                setEmail('');  
                setSenha(''); 
                setMensagemErro(''); 
                router.push("Perfil/Perfil"); 
            } else {
                setMensagemErro(dados.message || 'Erro ao tentar logar.'); 
            }
        } catch (error) {
            setMensagemErro('Erro na solicitação: ' + error.message); 
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
                    value={Email}
                    placeholder="Endereço de Email"
                    placeholderTextColor="#333"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    value={Senha}
                    placeholder="Senha"
                    placeholderTextColor="#333"
                    secureTextEntry
                />

                {mensagemErro ? <Text style={styles.errorMessage}>{mensagemErro}</Text> : null}

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
    errorMessage: { 
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;
