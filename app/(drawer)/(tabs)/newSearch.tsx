import { Fonts } from "@/constants/Fonts";
import { addEvent } from "@/src/services/firebase/firestoreService";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewResearchScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const [errorName, setErrorName] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [errorImage, setErrorImage] = useState("");

  const [fontsLoaded] = useFonts({
    'AveriaLibre': Fonts.averiaRegular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#3C2C8D" }} />;
  }

  const handleRegister = async () => {
    let valid = true;

    if (!name.trim()) {
      setErrorName("Preencha o nome da pesquisa");
      valid = false;
    } else {
      setErrorName("");
    }

    if (!date.trim()) {
      setErrorDate("Preencha a data");
      valid = false;
    } else {
      setErrorDate("");
    }

    if (!imageSelected) {
      setErrorImage("Selecione uma imagem");
      valid = false;
    } else {
      setErrorImage("");
    }

    if (valid) {
      const newEvent = {
        id: "",
        title: name,
        date,
        icon: "book-outline",
        color: "#2196F3",
      };

      try {
        const docRef = await addEvent(newEvent);

        if (!docRef?.id) {
          alert("Erro ao cadastrar pesquisa");
          return;
        }

        alert("Pesquisa cadastrada com sucesso!");
        setName("");
        setDate("");

        router.push("/home");
      } catch (error) {
        console.log(error);
        alert("Erro ao cadastrar pesquisa");
      }
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar a galeria é necessária.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

      // new API returns `assets` array; older returns `uri` directly
      const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri ?? null;
      if (uri) {
        setImageSelected(uri);
      }
    } catch (error) {
      console.log('pickImage error', error);
      alert('Erro ao selecionar imagem');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova pesquisa</Text>
      </View>

      {/* Nome */}
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
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
        onPress={pickImage}
      >
        {imageSelected ? (
          <Image source={{ uri: imageSelected }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageText}>Câmera/Galeria de imagens</Text>
        )}
      </TouchableOpacity>
      {errorImage ? <Text style={styles.error}>{errorImage}</Text> : null}

      {/* Botão cadastrar */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>CADASTRAR</Text>
      </TouchableOpacity>
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
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  imageText: { color: "#aaa", fontFamily: "AveriaLibre" },
  registerButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontFamily: "AveriaLibre",
    fontSize: 18,
  },
});
