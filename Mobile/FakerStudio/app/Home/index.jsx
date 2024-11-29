// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const HomeScreen = () => {
//   const [albums, setAlbums] = useState([]);
//   const [artists, setArtists] = useState([]);
//   const [songs, setSongs] = useState([]); 

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/albuns');
//         const data = await response.json();
//         setAlbums(data);
//       } catch (error) {
//         console.error('Erro ao buscar álbuns:', error);
//       }
//     };

//     const fetchArtists = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/artista');
//         const data = await response.json();
//         setArtists(data);
//       } catch (error) {
//         console.error('Erro ao buscar artistas:', error);
//       }
//     };

//     const fetchSongs = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/musicas');
//         const data = await response.json();
//         setSongs(data);
//       } catch (error) {
//         console.error('Erro ao buscar músicas:', error);
//       }
//     };

//     fetchAlbums();
//     fetchArtists();
//     fetchSongs(); 
//   }, []);

//   const renderAlbumItem = ({ item }) => (
//     <View style={styles.albumContainer}>
//       <TouchableOpacity style={styles.albumButton}>
//         <Image source={{ uri: item.coverImageUrl }} style={styles.albumImage} />
//         <Text style={styles.albumTitle}>{item.title}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderArtistItem = ({ item }) => (
//     <View style={styles.artistContainer}>
//       <TouchableOpacity style={styles.artistButton}>
//         <Image source={{ uri: item.imageUrl }} style={styles.artistImage} />
//       </TouchableOpacity>
//       <Text style={styles.artistName}>{item.nome}</Text>
//     </View>
//   );

//   const renderSongItem = ({ item }) => (
//     <View style={styles.songContainer}>
//       <TouchableOpacity style={styles.songButton}>
//         <Text style={styles.songTitle}>{item.titulo}</Text>
//         <Text style={styles.songDuration}>{item.duracao}</Text>
//       </TouchableOpacity>
//     </View>
//   );  

//   return (
//     <LinearGradient colors={['#E0E0E0', '#B0B0B0']} style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require('./pasta_de_imagens/logo.png')} style={styles.logo} />
//         <Text style={styles.headerText}>Bem-vindo ao SpotFake!</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Álbuns Populares</Text>
//         <FlatList
//           data={albums}
//           renderItem={renderAlbumItem}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Artistas em Alta</Text>
//         <FlatList
//           data={artists}
//           renderItem={renderArtistItem}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Músicas</Text>
//         <FlatList
//           data={songs}
//           renderItem={renderSongItem}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma música disponível</Text>}
//         />
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 26,
//     fontWeight: '600',
//     color: '#333',
//   },
//   section: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginBottom: 10,
//     color: '#333',
//     textAlign: 'center', 
//   },
//   albumContainer: {
//     marginRight: 15,
//     alignItems: 'center',
//   },
//   albumButton: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#FFFFFF',
//     padding: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     alignItems: 'center', 
//   },
//   albumImage: {
//     width: 130,
//     height: 130,
//     borderRadius: 8,
//   },
//   albumTitle: {
//     textAlign: 'center',
//     marginTop: 8,
//     fontSize: 14,
//     color: '#555',
//     width: 130, 
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//   },
//   artistContainer: {
//     marginRight: 15,
//     alignItems: 'center',
//   },
//   artistButton: {
//     width: 90,
//     height: 90,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   artistImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 45, 
//   },
//   artistName: {
//     textAlign: 'center',
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#555',
//     width: 90, 
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//   },
//   songContainer: {
//     marginRight: 15,
//     alignItems: 'center',
//   },
//   songButton: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   songTitle: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//     width: 130,
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//   },
//   songDuration: {
//     fontSize: 12,
//     color: '#777',
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default HomeScreen;






















import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const HomeScreen = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [sound, setSound] = useState(null); 

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

    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:8000/musicas');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      }
    };

    fetchAlbums();
    fetchArtists();
    fetchSongs();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSong = async (url) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Erro ao reproduzir música:', error);
    }
  };

  const renderSongItem = ({ item }) => (
    <View style={styles.songContainer}>
      <TouchableOpacity style={styles.songButton} onPress={() => playSong(item.fileUrl)}>
        <Image source={{ uri: item.coverImageUrl }} style={styles.songImage} />
        <Text style={styles.songTitle}>{item.titulo}</Text>
        <Text style={styles.songDuration}>{item.duracao} min</Text>
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
    backgroundColor: '#F5F5F5' 
},
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 20, 
    justifyContent: 'center' 
},
  logo: { 
    width: 50, 
    height: 50, 
    marginRight: 10 
  },
  headerText: { 
    fontSize: 26, 
    fontWeight: '600', 
    color: '#333' 
},
  section: { 
    marginTop: 20 
},
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '500', 
    marginBottom: 10, 
    color: '#333', 
    textAlign: 'center' 
},
  songContainer: { 
    marginRight: 15, 
    alignItems: 'center' 
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
  songImage: { 
    width: 130, 
    height: 130, 
    borderRadius: 8 
},
  songTitle: { 
    fontSize: 14, 
    color: '#555', 
    textAlign: 'center', 
    marginTop: 8 
},
  songDuration: { 
    fontSize: 12, 
    color: '#777', 
    textAlign: 'center', 
    marginTop: 5 
  },
  emptyText: { 
    fontSize: 14, 
    color: '#999', 
    textAlign: 'center',
    marginTop: 10 
},
});

export default HomeScreen;







// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const Home = () => {
//   const [albuns, setAlbuns] = useState([]);
//   const [artistas, setArtistas] = useState([]);
//   const [musicas, setMusicas] = useState([]);
//   const [albumSelecionado, setAlbumSelecionado] = useState(null);
//   const [artistaSelecionado, setArtistaSelecionado] = useState(null);

//   const [modalAlbumVisivel, setModalAlbumVisivel] = useState(false);
//   const [modalArtistaVisivel, setModalArtistaVisivel] = useState(false);

//   useEffect(() => {
//     const buscarDados = async () => {
//       try {
//         const respostaAlbuns = await fetch('http://localhost:8000/albuns');
//         const dadosAlbuns = await respostaAlbuns.json();
//         setAlbuns(dadosAlbuns);

//         const respostaArtistas = await fetch('http://localhost:8000/artista');
//         const dadosArtistas = await respostaArtistas.json();
//         setArtistas(dadosArtistas);

//         const respostaMusicas = await fetch('http://localhost:8000/musicas');
//         const dadosMusicas = await respostaMusicas.json();
//         setMusicas(dadosMusicas);
//       } catch (erro) {
//         console.error('Erro ao buscar dados:', erro);
//       }
//     };

//     buscarDados();
//   }, []);

//   const abrirModalAlbum = (album) => {
//     setAlbumSelecionado(album);
//     setModalAlbumVisivel(true);
//   };

//   const abrirModalArtista = (artista) => {
//     setArtistaSelecionado(artista);
//     setModalArtistaVisivel(true);
//   };

//   const renderizarAlbum = ({ item }) => (
//     <TouchableOpacity
//       style={styles.albumButton}
//       onPress={() => abrirModalAlbum(item)}
//     >
//       <Image source={{ uri: item.coverImageUrl }} style={styles.albumImage} />
//       <Text style={styles.albumTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   const renderizarArtista = ({ item }) => (
//     <TouchableOpacity
//       style={styles.artistButton}
//       onPress={() => abrirModalArtista(item)}
//     >
//       <Image source={{ uri: item.imageUrl }} style={styles.artistImage} />
//       <Text style={styles.artistName}>{item.nome}</Text>
//     </TouchableOpacity>
//   );

//   const renderizarMusica = ({ item }) => (
//     <View style={styles.songContainer}>
//       <TouchableOpacity style={styles.songButton}>
//         <Text style={styles.songTitle}>{item.titulo}</Text>
//         <Text style={styles.songDuration}>{item.duracao}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <LinearGradient colors={['#E0E0E0', '#B0B0B0']} style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require('./pasta_de_imagens/logo.png')} style={styles.logo} />
//         <Text style={styles.headerText}>Bem-vindo ao SpotFake!</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Álbuns Populares</Text>
//         <FlatList
//           data={albuns}
//           renderItem={renderizarAlbum}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Artistas em Alta</Text>
//         <FlatList
//           data={artistas}
//           renderItem={renderizarArtista}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Músicas</Text>
//         <FlatList
//           data={musicas}
//           renderItem={renderizarMusica}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={2}
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma música disponível</Text>}
//         />
//       </View>

//       {/* Modal para detalhes do álbum */}
//       <Modal
//         visible={modalAlbumVisivel}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalAlbumVisivel(false)}
//       >
//         <View style={styles.modalContainer}>
//           <ScrollView style={styles.modalContent}>
//             {albumSelecionado && (
//               <>
//                 <Image
//                   source={{ uri: albumSelecionado.coverImageUrl }}
//                   style={styles.modalImage}
//                 />
//                 <Text style={styles.modalTitle}>{albumSelecionado.title}</Text>
//                 <Text style={styles.modalDescription}>{albumSelecionado.descricao}</Text>
//                 <Button title="Fechar" onPress={() => setModalAlbumVisivel(false)} />
//               </>
//             )}
//           </ScrollView>
//         </View>
//       </Modal>

//       {/* Modal para detalhes do artista */}
//       <Modal
//         visible={modalArtistaVisivel}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalArtistaVisivel(false)}
//       >
//         <View style={styles.modalContainer}>
//           <ScrollView style={styles.modalContent}>
//             {artistaSelecionado && (
//               <>
//                 <Image
//                   source={{ uri: artistaSelecionado.imageUrl }}
//                   style={styles.modalImage}
//                 />
//                 <Text style={styles.modalTitle}>{artistaSelecionado.nome}</Text>
//                 <Text style={styles.modalDescription}>{artistaSelecionado.biografia}</Text>
//                 <Button title="Fechar" onPress={() => setModalArtistaVisivel(false)} />
//               </>
//             )}
//           </ScrollView>
//         </View>
//       </Modal>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 26,
//     fontWeight: '600',
//     color: '#333',
//   },
//   section: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginBottom: 10,
//     color: '#333',
//     textAlign: 'center',
//   },
//   albumButton: {
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   albumImage: {
//     width: 130,
//     height: 130,
//     borderRadius: 8,
//   },
//   albumTitle: {
//     textAlign: 'center',
//     marginTop: 8,
//     fontSize: 14,
//     color: '#555',
//   },
//   artistButton: {
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   artistImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//   },
//   artistName: {
//     textAlign: 'center',
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#555',
//   },
//   songContainer: {
//     flex: 1,
//     margin: 5,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   songButton: {
//     alignItems: 'center',
//   },
//   songTitle: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//   },
//   songDuration: {
//     fontSize: 12,
//     color: '#777',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   modalDescription: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default Home;
