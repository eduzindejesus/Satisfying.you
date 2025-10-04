import { Fonts } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PasswordRecoveryScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const [fontsLoaded] = useFonts({
        'AveriaLibre': Fonts.averiaRegular,
    });

    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: '#3C2C8D' }} />;
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRecover = () => {
        if (!validateEmail(email)) {
            setError('E-mail parece ser inválido');
            return;
        }
        setError('');
        // lógica real de recuperação aqui
        router.push('/'); // ou outra tela após envio
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recuperação de senha</Text>
            </View>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.recoverButton} onPress={handleRecover}>
                <Text style={styles.recoverButtonText}>RECUPERAR</Text>
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
        marginLeft: 10,
    },
    label: {
        alignSelf: 'flex-start',
        color: '#fff',
        fontFamily: 'AveriaLibre',
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
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
    recoverButton: {
        width: '100%',
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    recoverButtonText: {
        color: '#fff',
        fontFamily: 'AveriaLibre',
        fontSize: 18,
    },
});
