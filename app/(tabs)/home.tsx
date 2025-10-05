import SearchCard from '@/components/searchCard';
import { Fonts } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import DrawerNavigator from './DrawerNavigator';

export function HomeContent() {
  const router = useRouter();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const [fontsLoaded] = useFonts({
    'AveriaLibre': Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#3C2C8D' }} />;
  }

  const events = [
    { id: 1, title: 'SECOMP 2023', date: '10/10/2023', icon: 'laptop-outline', color: '#6D4C41' },
    { id: 2, title: 'UBUNTU 2022', date: '05/06/2022', icon: 'people-outline', color: '#333' },
    { id: 3, title: 'MENINAS CPU', date: '01/04/2022', icon: 'female-outline', color: '#E53935' },
  ];

  return (
    <View style={styles.container}>
      {/* Barra superior com menu e busca */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation?.openDrawer?.()} style={{ marginRight: 10 }}>
          <Ionicons name="menu" size={32} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Insira o termo de busca..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Cards de eventos */}
      <ScrollView horizontal contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
        {events.map((event) => (
          <SearchCard 
            key={event.id}
            event={event}
          />
        ))}
      </ScrollView>

      {/* Botão nova pesquisa */}
      <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/newSearch')} >
        <Text style={styles.searchButtonText}>NOVA PESQUISA</Text>
      </TouchableOpacity>
    </View>
  );
}

// Export the drawer navigator as the Home tab content
export default function HomeScreen() {
  return <DrawerNavigator />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3C2C8D', paddingTop: 40 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 20 },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontFamily: 'AveriaLibre',
  },
  cardsContainer: { paddingHorizontal: 10 },
  searchButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'AveriaLibre',
  },
});
