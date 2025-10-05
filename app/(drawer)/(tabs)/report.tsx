import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';

export default function ReportScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  // Dados do gráfico
  const data = [
    { name: 'Excelente', population: 20, color: '#F4D03F', legendFontColor: '#fff', legendFontSize: 14 },
    { name: 'Bom', population: 20, color: '#5DADE2', legendFontColor: '#fff', legendFontSize: 14 },
    { name: 'Neutro', population: 20, color: '#58D68D', legendFontColor: '#fff', legendFontSize: 14 },
    { name: 'Ruim', population: 20, color: '#EC7063', legendFontColor: '#fff', legendFontSize: 14 },
    { name: 'Péssimo', population: 20, color: '#48C9B0', legendFontColor: '#fff', legendFontSize: 14 },
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/cardsSearch')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Relatório</Text>
      </View>

      {/* Gráfico */}
      <PieChart
        data={data}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#3C2C8D',
          backgroundGradientFrom: '#3C2C8D',
          backgroundGradientTo: '#3C2C8D',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        hasLegend={true}
        center={[0, 0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3C2C8D', padding: 15 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 22, fontFamily: 'AveriaLibre', marginLeft: 10 },
});
