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
                body: JSON.stringify({ Nome: Nome, Sobrenome: Sobrenome, Email: Email, DataNascimento: DataNascimento, Senha: Senha }) 
            });

            if (resposta.ok) {
                console.log('Usuário logado com sucesso');
                setNome('');
                setSobrenome('');
                setEmail('');
                setDataNascimento('');
                setSenha('');
            } else {
                console.log('Ocorreu um erro:', resposta.status);
            }
        } catch (error) {
            console.log('Erro na solicitação:', error);
        }
    };

    const handleDateChange = (text) => {
        const maskedText = text
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona barra após os dois primeiros dígitos
            .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3'); // Adiciona barra após os dois próximos dígitos
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
                        <Text style={styles.googleButtonText}>Entrar com o Google</Text>
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
                <Link href="Perfil/Perfil" asChild>
                    <Pressable onPress={realizarRegistro} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Registrar</Text>
                    </Pressable>
                    </Link>
                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity onPress={() => console.log('Redirecionar para recuperação de senha')}>
                            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.footerText}>
                        Ao continuar, você concorda com nossos Termos de Serviço. Leia nossa política de privacidade.
                    </Text>
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
    forgotPasswordContainer: {
        alignSelf: 'stretch', 
        alignItems: 'flex-end', 
        marginTop: 15, 
    },
    forgotPasswordText: {
        color: '#FF6F61', 
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#888',
        marginTop: 20,
        paddingHorizontal: 10,
    },
});

export default Registrar;