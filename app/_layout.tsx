import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = { anchor: '(tabs)' };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'AveriaLibre-Regular': require('@/assets/fonts/AveriaLibre-Regular.ttf'),
      'AveriaLibre-Bold': require('@/assets/fonts/AveriaLibre-Bold.ttf'),
      'AveriaLibre-Italic': require('@/assets/fonts/AveriaLibre-Italic.ttf'),
      'AveriaLibre-BoldItalic': require('@/assets/fonts/AveriaLibre-BoldItalic.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />; // splash temporário
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="cardsSearch" options={{ title: 'Pesquisas' }} />
        <Stack.Screen name="createAccount" options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="dataCollection" options={{ title: 'Coleta de Dados' }} />
        <Stack.Screen name="explore" options={{ title: 'Explorar' }} />
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="modifySearch" options={{ title: 'Modificar Pesquisa' }} />
        <Stack.Screen name="newSearch" options={{ title: 'Nova Pesquisa' }} />
        <Stack.Screen name="recoverPassword" options={{ title: 'Recuperar Senha' }} />
        <Stack.Screen name="report" options={{ title: 'Relatório' }} />
        <Stack.Screen name="thankYou" options={{ title: 'Agradecimentos' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
