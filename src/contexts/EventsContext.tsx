import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { subscribeToEvents } from "../services/firebase/firestoreService";

export type EventType = {
  id: string;
  title: string;
  date: string;
  icon: string;
  color: string;
};

type EventsContextType = {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((fetchedEvents) => {
      setEvents(fetchedEvents);
    });
    return () => unsubscribe();
  }, []);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents deve ser usado dentro de um EventsProvider");
  }
  return context;
};
