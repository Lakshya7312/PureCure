import "react-native-gesture-handler";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Icon } from "@rneui/themed";

import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./screens/WelcomeScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import EFormScreen from "./screens/EFormScreen";
import AmbulanceScreen from "./screens/AmbulanceScreen";
import SettingsScreen from "./screens/SettingsScreen";
import QRScreen from "./screens/QRScreen";
import NFCScreen from "./screens/NFCScreen";
import ReportScreen from "./screens/ReportScreen";
import DonationScreen from "./screens/DonationScreen";
import PathologyScreen from "./screens/PathologyScreen";
import DonateBloodScreen from "./screens/DonateBloodScreen";
import PolicyScreen from "./screens/PolicyScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";

import { RFValue } from "react-native-responsive-fontsize";

import app from "./config";
import { getAuth, signOut } from "firebase/auth";

import logo from "./assets/icon.png";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const auth = getAuth(app);

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View>
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              PureCure
            </Text>
            <Text style={{ color: "#fff", marginTop: RFValue(3) }}>
              Click below to navigate
            </Text>
          </View>
          <Image
            source={logo}
            style={{
              width: RFValue(40),
              height: RFValue(40),
              borderRadius: 30,
            }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: RFValue(50),
          backgroundColor: "#f8f8f8",
          padding: RFValue(20),
          borderRadius: 20,
        }}
        onPress={() => {
          AsyncStorage.clear();
          props.navigation.navigate("Login");
          signOut(auth).then(() => {
            ToastAndroid.show("Signed Out!", ToastAndroid.SHORT);
          });
        }}
      >
        <Icon
          name="logout"
          type="antdesign"
          size={RFValue(17)}
          iconStyle={{ marginLeft: RFValue(-180) }}
        />
        <Text
          style={{
            fontSize: RFValue(15),
            marginTop: RFValue(-20),
            marginLeft: RFValue(40),
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <Icon name="home" type="fontawesome5" size={27} />,
        }}
      />
      <Drawer.Screen
        name="E-Form"
        component={EFormScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <Icon name="file" type="font-awesome" size={20} />,
        }}
      />
      <Drawer.Screen
        name="Call Ambulance"
        component={AmbulanceScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon name="ambulance" type="font-awesome" size={21} />
          ),
        }}
      />
      <Drawer.Screen
        name="Pathology Lab"
        component={PathologyScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon name="vial" type="font-awesome-5" size={23} />
          ),
        }}
      />
      <Drawer.Screen
        name="Donation Centre"
        component={DonationScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <Icon name="heart" type="font-awesome" size={21} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <Icon name="gear" type="font-awesome" />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home1"
            component={DrawerRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QRCode"
            component={QRScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NFC"
            component={NFCScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reports"
            component={ReportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Blood"
            component={DonateBloodScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Policy"
            component={PolicyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Personal Info"
            component={PersonalInfoScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  drawerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#7280f1",
    marginBottom: 20,
  },
});
