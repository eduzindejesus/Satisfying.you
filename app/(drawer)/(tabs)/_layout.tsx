import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />  
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="newSearch"
        options={{
          title: "Nova pesquisa",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cardsSearch"
        options={{
          href: null,
          headerShown: true,
          title: "Resultado da Busca",
        }}
      />

      <Tabs.Screen
        name="thankYou"
        options={{
          href: null,
          headerShown: true,
          title: "Muito Obrigado!",
        }}
      />

      <Tabs.Screen
        name="modifySearch"
        options={{
          href: null,
          headerShown: true,
          title: "Modificar pesquisa",
        }}
      />

      <Tabs.Screen
        name="dataCollection"
        options={{
          href: null,
          headerShown: true,
          title: "Coleta de dados",
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          href: null,
          headerShown: true,
          title: "Relatórios de pesquisa",
        }}
      />
    </Tabs>
  );
}
