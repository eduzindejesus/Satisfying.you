import { EventType } from "@/src/contexts/EventsContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function addEvent(event: EventType) {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      title: event.title,
      date: event.date,
      icon: event.icon,
      color: event.color,
      createdAt: new Date(),
    });
    console.log("Documento adicionado com sucesso:", docRef.id);
    return docRef;
  } catch (error) {
    console.log("Erro ao adicionar:", error);
    throw error;
  }
}

export async function updateEvent(id: string, data: Partial<EventType>) {
  try {
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, data);
    console.log("Documento atualizado com sucesso");
  } catch (error) {
    console.log("Erro ao atualizar:", error);
    throw error;
  }
}

export async function deleteEvent(id: string) {
  try {
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
    console.log("Documento deletado com sucesso");
  } catch (error) {
    console.log("Erro ao deletar:", error);
    throw error;
  }
}

export function subscribeToEvents(callback: (events: EventType[]) => void) {
  const q = collection(db, "events");
  return onSnapshot(
    q,
    (querySnapshot) => {
      const events: EventType[] = [];
      querySnapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data(),
        } as EventType);
      });
      callback(events);
    },
    (error) => {
      console.log("Erro ao buscar eventos:", error);
    }
  );
}
