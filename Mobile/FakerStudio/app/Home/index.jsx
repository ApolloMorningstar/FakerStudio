import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:8000/albuns');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Erro ao buscar álbuns:', error);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:8000/artista');
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Erro ao buscar artistas:', error);
      }
    };

    fetchAlbums();
    fetchArtists();
  }, []);

  const renderAlbumItem = ({ item }) => (
    <View style={styles.albumContainer}>
      <TouchableOpacity style={styles.albumButton}>
        <Image source={{ uri: item.coverImageUrl }} style={styles.albumImage} />
        <Text style={styles.albumTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderArtistItem = ({ item }) => (
    <View style={styles.artistContainer}>
      <TouchableOpacity style={styles.artistButton}>
        <Image source={{ uri: item.imageUrl }} style={styles.artistImage} />
      </TouchableOpacity>
      <Text style={styles.artistName}>{item.nome}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#E0E0E0', '#B0B0B0']} style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./pasta_de_imagens/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Bem-vindo ao SpotFake!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Álbuns Populares</Text>
        <FlatList
          data={albums}
          renderItem={renderAlbumItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Artistas em Alta</Text>
        <FlatList
          data={artists}
          renderItem={renderArtistItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center', // Centraliza o título da seção
  },
  albumContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  albumButton: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center', // Garante que o conteúdo da célula fique centralizado
  },
  albumImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
  },
  albumTitle: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#555',
    width: 130, // Evita que o título ultrapasse o limite da imagem
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  artistContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  artistButton: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistImage: {
    width: 90,
    height: 90,
    borderRadius: 45, // Faz o círculo perfeito
  },
  artistName: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    width: 90, // Impede o nome de ultrapassar a imagem
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default HomeScreen;
