import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { useFonts } from 'expo-font';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router';
import SearchCard from '@/components/searchCard';
import { useEvents } from '@/EventsContext';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { events } = useEvents();

  const [fontsLoaded] = useFonts({
    'AveriaLibre': Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#3C2C8D' }} />;
  }

  return (
    <View style={styles.container}>
      {/* Barra superior com menu e busca */}
      <View style={styles.topBar}>
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
    margin: 30,
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
