import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';


const Capa = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./pasta de imagens/logo.png')} />
      <Text style={styles.title}>SpotFake</Text>

      <View style={styles.buttonWrapper}>
      
      <Link href="Registrar/Registrar" asChild>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Registrar</Text>
        </TouchableOpacity>
      </Link>
      <Link href="Login/Login" asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>        
      </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fddde6', 
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 50,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    position: 'absolute',
    bottom: 0, 
    height: 80, 
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#fff', 
    borderRadius: 5, 
    borderColor: '#000', 
    borderWidth: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Capa;