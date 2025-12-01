import { Fonts } from '@/constants/Fonts';
import { arePasswordsEqual, isPasswordValid, isValidEmail } from '@/utils/validate';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signUp } from '@/src/services/firebase/authService';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const [fontsLoaded] = useFonts({
    'AveriaLibre': Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#3C2C8D' }} />;
  }

  const handleSignUp = () => {
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

    if (!isPasswordValid(password)) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!repeatPassword.trim()) {
      setError('Por favor, repita sua senha.');
      return;
    }

    if (!arePasswordsEqual(password, repeatPassword)) {
      setError('O campo repetir senha difere da senha.');
      return;
    }

    setError('');

    signUp(email, password)
      .then(() => {
        router.push("/home");
      })
      .catch((error: any) => {
        if (error.code === "auth/email-already-in-use") {
          setError("Este e-mail já está em uso.");
        } else if (error.code === "auth/invalid-email") {
          setError("E-mail inválido.");
        } else if (error.code === "auth/weak-password") {
          setError("A senha deve ter pelo menos 6 caracteres.");
        } else {
          setError("Erro ao criar conta.");
        }
      });
  };

  return (
    <View style={styles.container}>
      {/* Formulário */}
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

      <Text style={styles.label}>Repetir senha</Text>
      <TextInput
        style={styles.input}
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
        <Text style={styles.registerButtonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C2C8D',
    padding: 20,
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30, 
    marginTop: 20,
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 22, 
    fontFamily: 'AveriaLibre', 
    marginLeft: 10 
  },
  label: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontFamily: 'AveriaLibre',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    color: '#3F92C5',
    fontFamily: 'AveriaLibre',
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: '#FF4D4D',
    alignSelf: 'flex-start',
    marginBottom: 15,
    fontFamily: 'AveriaLibre',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontFamily: 'AveriaLibre',
    fontSize: 18,
  },
});
