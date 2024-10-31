import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, useWindowDimensions, TouchableOpacity, Alert } from 'react-native';

const Login = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    const CapaLogin = require('./pasta_de_imagens/logo.png'); // Caminho para a imagem da logo principal
    const GoogleLogo = require('./pasta_de_imagens/logo_deuses.png'); // Logo do Google

    const { width } = useWindowDimensions();

    const realizarLogin = async () => {
        // Verificação se todos os campos estão preenchidos
        if (!nome || !sobrenome || !email || !dataNascimento || !cpf || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const resposta = await fetch('https://taskhub-s37f.onrender.com/auth/login', { // Alterar para o endpoint de login
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, sobrenome, email, dataNascimento, cpf, password: senha }) // Adicionar outros campos se necessário
            });

            if (resposta.ok) {
                console.log('Usuário logado com sucesso');
                setNome('');
                setSobrenome('');
                setEmail('');
                setDataNascimento('');
                setCpf('');
                setSenha('');
                // Navegar para a página inicial após o login
                // Por exemplo: navigation.navigate('Home'); (caso esteja utilizando React Navigation)
            } else {
                console.log('Ocorreu um erro:', resposta.status);
            }
        } catch (error) {
            console.log('Erro na solicitação:', error);
        }
    };

    const handleDateChange = (text) => {
        // Adiciona a máscara de data no formato DD/MM/YYYY
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
                    <Text style={styles.title}>Faça Login</Text>
                    <TouchableOpacity style={styles.googleButton}>
                        <Image source={GoogleLogo} style={styles.googleLogo} />
                        <Text style={styles.googleButtonText}>Entrar com o Google</Text>
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
                        onChangeText={handleDateChange} // Chama a função para formatar a data
                        value={dataNascimento}
                        placeholder="Data de Nascimento (DD/MM/AAAA)"
                        placeholderTextColor="#333"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setCpf}
                        value={cpf}
                        placeholder="CPF"
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
                    <Pressable onPress={realizarLogin} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </Pressable>
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
        backgroundColor: '#FFE5E5', // Cor de fundo da tela
        padding: 20,
    },
    scrollViewContent: {
        alignItems: 'center', // Centraliza o conteúdo
        paddingBottom: 20, // Espaçamento inferior para evitar que o último item fique colado na borda
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
        alignSelf: 'stretch', // Faz o container ocupar toda a largura
        alignItems: 'flex-end', // Alinha o conteúdo à direita
        marginTop: 15, // Espaçamento em relação ao botão de login
    },
    forgotPasswordText: {
        color: '#FF6F61', // Cor vibrante que combina com o fundo
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

export default Login;