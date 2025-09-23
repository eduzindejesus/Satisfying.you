import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ThankYouScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Obrigado por participar da pesquisa!</Text>
      <Text style={styles.message}>Aguardamos você no próximo ano!</Text>
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
  message: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "AveriaLibre",
  },
});
