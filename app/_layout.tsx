import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="createAccount" options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="recoverPassword" options={{ title: 'Recuperar Senha' }} />
        <Stack.Screen name="dataCollection" options={{ title: 'Coleta de Dados' }} />
        <Stack.Screen name="thankYou" options={{ title: 'Agradecimentos' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}