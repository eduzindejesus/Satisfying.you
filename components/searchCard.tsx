import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SearchCardProps {
  event: {
    id: number;
    icon: string;
    color: string;
    title: string;
    date: string;
  }
}

export default function SearchCard({
  event
}: SearchCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={event.id}
      style={styles.card}
      onPress={() => router.push(`/cardsSearch?id=${event.id}`)}
    >
      <Ionicons name={event.icon} size={50} color={event.color} />
      <Text style={styles.cardTitle}>{event.title}</Text>
      <Text style={styles.cardDate}>{event.date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "AveriaLibre",
    color: "#1976D2",
    textAlign: "center",
  },
  cardDate: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
    fontFamily: "AveriaLibre",
  },
});
