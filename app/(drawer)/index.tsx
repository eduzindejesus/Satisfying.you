import { Fonts } from '@/constants/Fonts';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { isValidEmail } from '@/utils/validate';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [fontsLoaded] = useFonts({
    'AveriaLibre': Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#3C2C8D' }} />;
  }

  const handleLogin = () => {
    if (!email.trim()) {
      setError('Por favor, digite seu e-mail.');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Email inválido.');
      return;
    }

    if (!password.trim()) {
      setError('Por favor, digite sua senha.');
      return;
    }

    // Usuário e senha padrão
    if (email === 'teste@teste.com' && password === '123456') {
      setError('');
      router.push('/home');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Satisfying.you ☺</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/createAccount')}
      >
        <Text style={styles.createButtonText}>Criar minha conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => router.push('/recoverPassword')} 
        >
        <Text style={styles.forgotButtonText}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3C2C8D', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontFamily: 'AveriaLibre', fontSize: 32, color: '#fff', marginBottom: 40 },
  label: { alignSelf: 'flex-start', color: '#fff', fontFamily: 'AveriaLibre', marginBottom: 5, fontSize: 16 },
  input: { width: '100%', height: 45, backgroundColor: '#fff', borderRadius: 4, paddingHorizontal: 10, marginBottom: 15 },
  error: { color: '#FF4D4D', alignSelf: 'flex-start', marginBottom: 15, fontFamily: 'AveriaLibre' },
  loginButton: { width: '100%', backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 4, marginBottom: 10, alignItems: 'center' },
  loginButtonText: { color: '#fff', fontFamily: 'AveriaLibre', fontSize: 18 },
  createButton: { width: '100%', backgroundColor: '#42A5F5', paddingVertical: 12, borderRadius: 4, marginBottom: 10, alignItems: 'center' },
  createButtonText: { color: '#fff', fontFamily: 'AveriaLibre', fontSize: 16 },
  forgotButton: { width: '100%', backgroundColor: '#BDBDBD', paddingVertical: 12, borderRadius: 4, alignItems: 'center' },
  forgotButtonText: { color: '#fff', fontFamily: 'AveriaLibre', fontSize: 16 },
});
