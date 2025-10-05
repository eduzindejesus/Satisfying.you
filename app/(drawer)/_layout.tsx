import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerTintColor: "#fff",
        drawerActiveTintColor: "#3399FF",
        drawerInactiveTintColor: "gray",
        drawerStyle: { backgroundColor: "#3C2C8D" },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Início",
          drawerLabel: "Início",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          title: "Login",
          drawerIcon: ({ color }) => (
            <IconSymbol size={28} name="person.circle.fill" color={color} />
          ),
          headerTitleStyle: {
            fontFamily: "AveriaLibre",
          },
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          title: "Explorar",
          drawerLabel: "Explorar",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="cardsSearch"
        options={{
          title: "Pesquisas",
          drawerLabel: "Pesquisas",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
