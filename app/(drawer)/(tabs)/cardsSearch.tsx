import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEvents } from '@/EventsContext';

export default function ResearchOptionsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { events } = useEvents();

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{events.find(e => String(e.id) === id)?.title}</Text>
      </View>

      {/* Opções */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push({
            pathname: '/modifySearch',
            params: { id },
          })}
        >
          <MaterialIcons name="edit" size={40} color="#fff" />
          <Text style={styles.optionText}>Modificar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => router.push(`/dataCollection?id=${id}`)}>
          <Ionicons name="checkbox-outline" size={40} color="#fff" />
          <Text style={styles.optionText}>Coletar dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/report')}>
          <Ionicons name="pie-chart-outline" size={40} color="#fff" />
          <Text style={styles.optionText}>Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3C2C8D', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  headerTitle: { color: '#fff', fontSize: 22, fontFamily: 'AveriaLibre', marginLeft: 10 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  optionButton: {
    backgroundColor: '#4C3C8D',
    borderRadius: 8,
    width: '30%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: {
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'AveriaLibre'
  }
});
