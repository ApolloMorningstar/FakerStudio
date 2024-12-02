


import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';  

const Home = () => {
  const [albuns, setAlbuns] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [albumSelecionado, setAlbumSelecionado] = useState(null);
  const [artistaSelecionado, setArtistaSelecionado] = useState(null);

  const [modalAlbumVisivel, setModalAlbumVisivel] = useState(false);
  const [modalArtistaVisivel, setModalArtistaVisivel] = useState(false);

  const flatListAlbunsRef = useRef(null);
  const flatListArtistasRef = useRef(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const respostaAlbuns = await fetch('http://localhost:8000/albuns');
        const dadosAlbuns = await respostaAlbuns.json();
        setAlbuns(dadosAlbuns);

        const respostaArtistas = await fetch('http://localhost:8000/artista');
        const dadosArtistas = await respostaArtistas.json();
        setArtistas(dadosArtistas);

        const respostaMusicas = await fetch('http://localhost:8000/musicas');
        const dadosMusicas = await respostaMusicas.json();
        setMusicas(dadosMusicas);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    };

    buscarDados();
  }, []);

  const abrirModalAlbum = (album) => {
    setAlbumSelecionado(album);
    setModalAlbumVisivel(true);
  };

  const abrirModalArtista = (artista) => {
    setArtistaSelecionado(artista);
    setModalArtistaVisivel(true);
  };

  const renderizarAlbum = ({ item }) => (
    <TouchableOpacity
      style={styles.albumButton}
      onPress={() => abrirModalAlbum(item)}
    >
      <Image source={{ uri: item.coverImageUrl }} style={styles.albumImage} />
      <Text style={styles.albumTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderizarArtista = ({ item }) => (
    <TouchableOpacity
      style={styles.artistButton}
      onPress={() => abrirModalArtista(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.artistImage} />
      <Text style={styles.artistName}>{item.nome}</Text>
    </TouchableOpacity>
  );

  const renderizarMusica = ({ item }) => (
    <View style={styles.songContainer}>
      <TouchableOpacity style={styles.songButton}>
        <Text style={styles.songTitle}>{item.titulo}</Text>
        <Text style={styles.songDuration}>{item.duracao}</Text>
      </TouchableOpacity>
    </View>
  );

  // Função para navegação nos FlatLists
  const scrollFlatList = (ref, direction) => {
    if (ref.current) {
      const offset = direction === 'left' ? -200 : 200; // Ajuste do deslocamento
      ref.current.scrollToOffset({ animated: true, offset });
    }
  };

  return (
    <LinearGradient colors={['#E0E0E0', '#B0B0B0']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image source={require('./pasta_de_imagens/logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>Bem-vindo ao SpotFake!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Álbuns Populares</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => scrollFlatList(flatListAlbunsRef, 'left')} style={styles.arrowButton}>
              <FontAwesome name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <FlatList
              data={albuns}
              renderItem={renderizarAlbum}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatList}
              ref={flatListAlbunsRef}
              decelerationRate="fast"
              snapToInterval={140}
              snapToAlignment="center"
            />
            <TouchableOpacity onPress={() => scrollFlatList(flatListAlbunsRef, 'right')} style={styles.arrowButton}>
              <FontAwesome name="arrow-right" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artistas em Alta</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => scrollFlatList(flatListArtistasRef, 'left')} style={styles.arrowButton}>
              <FontAwesome name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <FlatList
              data={artistas}
              renderItem={renderizarArtista}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatList}
              ref={flatListArtistasRef}
              decelerationRate="fast"
              snapToInterval={100}
              snapToAlignment="center"
            />
            <TouchableOpacity onPress={() => scrollFlatList(flatListArtistasRef, 'right')} style={styles.arrowButton}>
              <FontAwesome name="arrow-right" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Músicas</Text>
          <FlatList
            data={musicas}
            renderItem={renderizarMusica}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma música disponível</Text>}
          />
        </View>

        <Modal
          visible={modalAlbumVisivel}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalAlbumVisivel(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              {albumSelecionado && (
                <>
                  <Image
                    source={{ uri: albumSelecionado.coverImageUrl }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{albumSelecionado.title}</Text>
                  <Text style={styles.modalDescription}>{albumSelecionado.releaseYear}</Text>
                  <Button title="Fechar" onPress={() => setModalAlbumVisivel(false)} />
                </>
              )}
            </ScrollView>
          </View>
        </Modal>

        <Modal
          visible={modalArtistaVisivel}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalArtistaVisivel(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              {artistaSelecionado && (
                <>
                  <Image
                    source={{ uri: artistaSelecionado.imageUrl }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{artistaSelecionado.nome}</Text>
                  <Text style={styles.modalDescription}>{artistaSelecionado.bio}</Text>
                  <Button title="Fechar" onPress={() => setModalArtistaVisivel(false)} />
                </>
              )}
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  flatList: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20, // Para garantir que o conteúdo tenha um espaço no final
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
  albumButton: {
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2, 
    borderColor: '#fff', 
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#fff', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
  },
  artistButton: {
    alignItems: 'center',
    marginRight: 15,
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
  },
  songContainer: {
    flex: 1,
    margin: 5,
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
  songButton: {
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  songDuration: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Home;
