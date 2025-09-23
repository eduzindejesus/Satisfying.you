import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';
import { useFonts } from 'expo-font';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NewResearchScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorDate, setErrorDate] = useState('');

  const [fontsLoaded] = useFonts({
    'AveriaLibre': Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#3C2C8D' }} />;
  }

  const handleRegister = () => {
    let valid = true;

    if (!name) {
      setErrorName('Preencha no nome da pesquisa');
      valid = false;
    } else {
      setErrorName('');
    }

    if (!date) {
      setErrorDate('Preencha a data');
      valid = false;
    } else {
      setErrorDate('');
    }

    if (valid) {
      // Aqui você pode salvar no banco ou navegar
      alert('Pesquisa cadastrada com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova pesquisa</Text>
      </View>

      {/* Nome */}
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {errorName ? <Text style={styles.error}>{errorName}</Text> : null}

      {/* Data */}
      <Text style={styles.label}>Data</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={date}
          onChangeText={setDate}
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#aaa"
        />
        <Ionicons name="calendar-outline" size={24} color="#3C2C8D" style={styles.calendarIcon} />
      </View>
      {errorDate ? <Text style={styles.error}>{errorDate}</Text> : null}

      {/* Imagem */}
      <Text style={styles.label}>Imagem</Text>
      <TouchableOpacity style={styles.imageBox}>
        <Text style={styles.imageText}>Câmera/Galeria de imagens</Text>
      </TouchableOpacity>

      {/* Botão cadastrar */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3C2C8D', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  headerTitle: { color: '#fff', fontSize: 22, fontFamily: 'AveriaLibre', marginLeft: 10 },
  label: { color: '#fff', fontFamily: 'AveriaLibre', marginBottom: 5, fontSize: 16 },
  input: { backgroundColor: '#fff', borderRadius: 4, paddingHorizontal: 10, height: 45, marginBottom: 5 },
  error: { color: '#FF4D4D', fontFamily: 'AveriaLibre', marginBottom: 15 },
  dateContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  calendarIcon: { position: 'absolute', right: 10 },
  imageBox: { backgroundColor: '#fff', borderRadius: 4, height: 70, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  imageText: { color: '#aaa', fontFamily: 'AveriaLibre' },
  registerButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 4, alignItems: 'center' },
  registerButtonText: { color: '#fff', fontFamily: 'AveriaLibre', fontSize: 18 },
});
