import React, { createContext, useContext, useState, ReactNode } from 'react';

type EventType = {
  id: number;
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
  const [events, setEvents] = useState<EventType[]>([
    { id: 1, title: 'SECOMP 2023', date: '10/10/2023', icon: 'laptop-outline', color: '#6D4C41' },
    { id: 2, title: 'UBUNTU 2022', date: '05/06/2022', icon: 'people-outline', color: '#333' },
    { id: 3, title: 'MENINAS CPU', date: '01/04/2022', icon: 'female-outline', color: '#E53935' },
  ]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents deve ser usado dentro de um EventsProvider');
  }
  return context;
};
