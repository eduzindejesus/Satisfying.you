import { Fonts } from "@/constants/Fonts";
import { useEvents } from "@/src/contexts/EventsContext";
import {
  deleteEvent,
  updateEvent,
} from "@/src/services/firebase/firestoreService";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
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

export default function EditResearchScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { events } = useEvents();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  // NOVO: modal de imagem
  const [imageModalVisible, setImageModalVisible] = useState(false);

  // NOVO: imagem local
  const [imageURI, setImageURI] = useState<string | null>(null);

  // carregando dados da pesquisa
  useEffect(() => {
    const event = events.find((event) => String(event.id) === id);
    setName(event?.title || "");
    setDate(event?.date || "");
  }, [id, events]);

  const [fontsLoaded] = useFonts({
    AveriaLibre: Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#3C2C8D" }} />;
  }

  // 📌 Função para selecionar imagem
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão necessária para acessar as imagens.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  // 📌 Função para tirar foto
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão necessária para usar a câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    let valid = true;

    if (!name) {
      setErrorName("Preencha o nome da pesquisa");
      valid = false;
    } else setErrorName("");

    if (!date) {
      setErrorDate("Preencha a data");
      valid = false;
    } else setErrorDate("");

    if (!valid) return;

    try {
      await updateEvent(id as string, {
        title: name,
        date,
      });

      alert("Pesquisa atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar pesquisa");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(id as string);
      alert("Pesquisa apagada!");
      setShowModal(false);
      router.push(`/home`);
    } catch (error) {
      alert("Erro ao apagar pesquisa");
    }
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

      <TouchableOpacity
        style={styles.imageBox}
        onPress={() => setImageModalVisible(true)}
      >
        <Text
          style={{
            fontFamily: "AveriaLibre",
            color: imageURI ? "green" : "#aaa",
          }}
        >
          {imageURI ? "Imagem selecionada ✓" : "Câmera/Galeria de imagens"}
        </Text>
      </TouchableOpacity>

      {/* Botões */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SALVAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setShowModal(true)}
      >
        <Ionicons name="trash-outline" size={28} color="#fff" />
        <Text style={styles.deleteButtonText}>Apagar</Text>
      </TouchableOpacity>

      {/* Modal deletar */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={deleteModalStyles.overlay}>
          <View style={deleteModalStyles.modalBox}>
            <Text style={deleteModalStyles.modalText}>
              Tem certeza de apagar essa pesquisa?
            </Text>

            <View style={deleteModalStyles.buttonRow}>
              <Pressable style={deleteModalStyles.simButton} onPress={handleDelete}>
                <Text style={deleteModalStyles.buttonText}>SIM</Text>
              </Pressable>

              <Pressable
                style={deleteModalStyles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={deleteModalStyles.buttonText}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL IGUAL AO NEWRESEARCHSCREEN */}
      {imageModalVisible && (
        <View style={imagePickerModalStyles.overlay}>
          <View style={imagePickerModalStyles.modalBox}>
            <TouchableOpacity
              style={imagePickerModalStyles.optionButton}
              onPress={() => {
                setImageModalVisible(false);
                openCamera();
              }}
            >
              <Text style={imagePickerModalStyles.optionText}>Abrir câmera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={imagePickerModalStyles.optionButton}
              onPress={() => {
                setImageModalVisible(false);
                pickImage();
              }}
            >
              <Text style={imagePickerModalStyles.optionText}>Escolher da galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                imagePickerModalStyles.optionButton,
                { backgroundColor: "#ccc" },
              ]}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={imagePickerModalStyles.optionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}


const imagePickerModalStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
  },
  optionButton: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    textAlign: "center",
    fontFamily: "AveriaLibre",
    fontSize: 16,
    color: "#333",
  },
});


const deleteModalStyles = StyleSheet.create({
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
