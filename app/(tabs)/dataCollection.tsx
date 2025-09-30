import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SurveyScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const options = [
    { id: 1, label: "Péssimo", icon: "sad-outline", color: "#E74C3C" },
    { id: 2, label: "Ruim", icon: "sad", color: "#FF5733" },
    { id: 3, label: "Neutro", icon: "remove-circle-outline", color: "#F1C40F" },
    { id: 4, label: "Bom", icon: "happy-outline", color: "#2ECC71" },
    { id: 5, label: "Excelente", icon: "happy", color: "#27AE60" },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    // Vai para a tela de agradecimento
    setTimeout(() => {
    router.push("/thankYou");
  }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você achou do Carnaval 2024?</Text>

      <View style={styles.row}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => handleSelect(option.id)}
          >
            <Ionicons
              name={option.icon}
              size={48}
              color={option.color}
              style={[
                selected === option.id && { transform: [{ scale: 1.2 }] },
              ]}
            />
            <Text
              style={[
                styles.label,
                { color: option.color },
                selected === option.id && { fontWeight: "bold" },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C2C8D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "AveriaLibre",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  option: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "AveriaLibre",
  },
});
