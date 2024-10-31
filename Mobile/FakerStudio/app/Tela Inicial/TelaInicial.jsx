import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TelaInicial = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Capa/Capa');
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./pasta_de_imagens/logo.png')} />
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
  },
});

export default TelaInicial;
