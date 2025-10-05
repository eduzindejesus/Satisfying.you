import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import AnotherScreen from './explore';
import { HomeContent } from './home';
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
  <Text style={styles.userText}>usuario@dominio.com</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: '#4C3C8D',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "AveriaLibre",
  },
});

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Pesquisas"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#4C3C8D',
        },
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
      }}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Pesquisas"
        component={HomeContent}
        options={{
          drawerIcon: ({ color, size }: { color?: string; size?: number }) => (
            <MaterialIcons name="description" size={size ?? 24} color={color ?? '#fff'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sair"
        component={AnotherScreen}
        options={{
          drawerIcon: ({ color, size }: { color?: string; size?: number }) => (
            <MaterialIcons name="logout" size={size ?? 24} color={color ?? '#fff'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
} 