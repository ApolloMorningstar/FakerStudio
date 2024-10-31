import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TelaInicial = () => {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const timer = setTimeout(() => {
      // After 5 seconds, navigate to 'Capa'
      router.push('/Capa/Capa');
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image style={styles.logo} source={require('./pasta_de_imagens/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fddde6', // Background color matching the image theme
  },
  logo: {
    width: 180,
    height: 180,
  },
});

export default TelaInicial;
