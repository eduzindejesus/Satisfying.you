import { useUser } from "@/src/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Text, View } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, setUser } = useUser();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginBottom: 10,
          }}
        >
          <Text
            style={{ color: "#fff", fontSize: 18, fontFamily: "AveriaLibre" }}
          >
            {user?.email}
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ marginBottom: 20 }}>
        <DrawerItem
          label="Sair"
          labelStyle={{
            color: "#fff",
            fontFamily: "AveriaLibre",
            fontSize: 18,
          }}
          icon={({ size }) => (
            <Ionicons name="exit-outline" size={size} color="#fff" />
          )}
          onPress={() => {
            setUser(null);
            router.replace("/");
          }}
        />
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: "#fff",
        drawerActiveTintColor: "#3399FF",
        drawerInactiveTintColor: "gray",
        drawerStyle: { backgroundColor: "#3C2C8D" },
        headerTitleStyle: {
          fontFamily: "AveriaLibre",
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Pesquisas",
          drawerLabel: "Pesquisas",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
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
