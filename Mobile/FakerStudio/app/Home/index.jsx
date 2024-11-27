import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]); 

  useEffect(() => {
    // Função para buscar álbuns
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:8000/albuns');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Erro ao buscar álbuns:', error);
      }
    };

    // Função para buscar artistas
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:8000/artista');
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Erro ao buscar artistas:', error);
      }
    };

    // Função para buscar músicas
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:8000/musicas');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      }
    };

    // Chama as funções para buscar os dados quando a tela for carregada
    fetchAlbums();
    fetchArtists();
    fetchSongs(); 
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

  const renderSongItem = ({ item }) => (
    <View style={styles.songContainer}>
      <TouchableOpacity style={styles.songButton}>
        <Text style={styles.songTitle}>{item.titulo}</Text>
        <Text style={styles.songDuration}>{item.duracao}</Text>
      </TouchableOpacity>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Músicas</Text>
        <FlatList
          data={songs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma música disponível</Text>}
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
    textAlign: 'center', 
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
    alignItems: 'center', 
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
    width: 130, 
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
    borderRadius: 45, 
  },
  artistName: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    width: 90, 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  songContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  songButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  songTitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    width: 130,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  songDuration: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
