import { Fonts } from "@/constants/Fonts";
import { useEvents } from '@/src/contexts/EventsContext';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: Math.min(Dimensions.get("window").width * 0.8, 600),
    backgroundColor: "#3C2C8D",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  simButton: {
    flex: 1,
    backgroundColor: "#E94F7A",
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#4F7AE9",
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function EditResearchScreen() {
  const router = useRouter();
  const [name, setName] = useState("Carnaval 2024");
  const [date, setDate] = useState("16/02/2024");
  const [errorName, setErrorName] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { id } = useLocalSearchParams();
  const { events, setEvents } = useEvents();

  useEffect(() => {
    const fetchData = () => {
      const event = events.find(event => String(event.id) === id);
      setName(event?.title || '');
      setDate(event?.date || '');
    };
    fetchData();
  }, [id, events]);

  const [fontsLoaded] = useFonts({
    AveriaLibre: Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#3C2C8D" }} />;
  }

  const handleSave = () => {
    let valid = true;

    if (!name) {
      setErrorName("Preencha o nome da pesquisa");
      valid = false;
    } else {
      setErrorName("");
    }

    if (!date) {
      setErrorDate("Preencha a data");
      valid = false;
    } else {
      setErrorDate("");
    }

    if (valid) {
      setEvents((prev) =>
        prev.map((event) => 
          String(event.id ) === id
            ? { 
              ...event,
              title: name,
              date,
            }
            : event,
        )
      );
      alert("Pesquisa atualizada com sucesso!");
    }
  };

  const handleDelete = () => {
    setEvents(prev => prev.filter(event => String(event.id) !== id))
    alert("Pesquisa apagada!");
    setShowModal(false);
    router.push(`/home`);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push(`/cardsSearch?id=${id}`)}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modificar pesquisa</Text>
      </View>

      {/* Nome */}
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
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
        <Ionicons
          name="calendar-outline"
          size={24}
          color="#3C2C8D"
          style={styles.calendarIcon}
        />
      </View>
      {errorDate ? <Text style={styles.error}>{errorDate}</Text> : null}

      {/* Imagem */}
      <Text style={styles.label}>Imagem</Text>
      <TouchableOpacity style={styles.imageBox}>
        <Ionicons name="image-outline" size={32} color="#9c27b0" />
      </TouchableOpacity>

      {/* Botões */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SALVAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={() => setShowModal(true)}>
        <Ionicons name="trash-outline" size={28} color="#fff" />
        <Text style={styles.deleteButtonText}>Apagar</Text>
      </TouchableOpacity>

      {/* Modal para deletar */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalBox}>
            <Text style={modalStyles.modalText}>
              Tem certeza de apagar essa pesquisa?
            </Text>
            <View style={modalStyles.buttonRow}>
              <Pressable
                style={modalStyles.simButton}
                onPress={() => {
                  handleDelete()
                }}
              >
                <Text style={modalStyles.buttonText}>SIM</Text>
              </Pressable>
              <Pressable
                style={modalStyles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={modalStyles.buttonText}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3C2C8D", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "AveriaLibre",
    marginLeft: 10,
  },
  label: {
    color: "#fff",
    fontFamily: "AveriaLibre",
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 5,
  },
  error: { color: "#FF4D4D", fontFamily: "AveriaLibre", marginBottom: 15 },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  calendarIcon: { position: "absolute", right: 10 },
  imageBox: {
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 15,
  },
  saveButtonText: { color: "#fff", fontFamily: "AveriaLibre", fontSize: 18 },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF4D4D",
    paddingVertical: 12,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff",
    fontFamily: "AveriaLibre",
    fontSize: 18,
    marginLeft: 8,
  },
});
