import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid,
  StatusBar,
  Modal,
} from "react-native";

import { Header } from "@rneui/themed";

import app from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";

import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RFValue } from "react-native-responsive-fontsize";

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  storeToken = async (user) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      Alert.alert("Something went wrong!", error.message);
    }
  };

  getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
    } catch (error) {
      Alert.alert("Something went wrong!", error.message);
    }
  };

  checkTextInput = () => {
    if (!this.state.email.trim() || !this.state.password.trim()) {
      const message = "Please fill all the required fields!";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", message);
      }
    } else {
      this.login(this.state.email, this.state.password);
    }
  };

  login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (Platform.OS === "android") {
          this.storeToken(res.user);
          ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
          this.props.navigation.replace("Home1");
        } else {
          this.storeToken(res.user);
          Alert.alert("Success", "You are logged in!");
          this.props.navigation.replace("Home1");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#ff2849"
          translucent={true}
        />
        <ScrollView>
          <Header
            backgroundColor="#6270dd"
            containerStyle={{ paddingVertical: RFValue(30) }}
            centerComponent={{
              text: "PureCure",
              style: {
                fontSize: RFValue(27),
                fontWeight: "bold",
                color: "#fff",
                alignSelf: "center",
              },
            }}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure?</Text>
                <Text style={styles.subText}>
                  Press "Confirm" to proceed calling an ambulance or click
                  "Cancel" to cancel your SOS call.
                </Text>
                <View style={styles.buttEqual}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "#7280f1" }]}
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <Text style={[styles.modalButonText, { color: "#fff" }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      Alert.alert(
                        "Hold Steady!",
                        "Notifying emergency contacts and calling ambulance!"
                      );
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <Text style={styles.modalButonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Text style={styles.head}>Login</Text>
          <TextInput
            style={[styles.input, { marginTop: RFValue(40) }]}
            placeholder="Email"
            placeholderTextColor={"#000"}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#000"}
            autoCapitalize="none"
            secureTextEntry={true}
            keyboardType="default"
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.checkTextInput();
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                marginTop: RFValue(20),
                backgroundColor: "#e9ecf7",
                borderWidth: 3,
              },
            ]}
            onPress={() => {
              this.props.navigation.navigate("Signup");
            }}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sos}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>SOS</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf7",
  },

  modalText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },

  subText: {
    fontSize: RFValue(13),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    marginTop: RFValue(15),
  },

  buttEqual: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(40),
    padding: RFValue(20),
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  modalButton: {
    width: RFValue(85),
    height: RFValue(35),
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginLeft: RFValue(20),
  },

  modalButonText: {
    color: "#000",
    alignSelf: "center",
    fontSize: RFValue(15),
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },

  head: {
    fontSize: RFValue(30),
    color: "#000",
    alignSelf: "center",
    marginTop: RFValue(30),
    fontWeight: "bold",
  },

  input: {
    width: RFValue(250),
    height: RFValue(40),
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: RFValue(15),
    color: "#000",
    marginTop: RFValue(40),
    alignSelf: "center",
    justifyContent: "center",
  },

  button: {
    width: RFValue(200),
    height: RFValue(40),
    backgroundColor: "#7280f1",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#7280f1",
    alignSelf: "center",
    marginTop: RFValue(40),
    textAlign: "center",
    justifyContent: "center",
  },

  sos: {
    width: RFValue(50),
    height: RFValue(50),
    backgroundColor: "#7280f1",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#7280f1",
    justifyContent: "center",
    marginTop: "36%",
    marginLeft: "81%",
  },

  buttonText: {
    color: "#000",
    alignSelf: "center",
    fontSize: RFValue(15),
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(22),
  },

  modalView: {
    margin: RFValue(20),
    borderRadius: 20,
    padding: RFValue(35),
    alignItems: "center",
    backgroundColor: "#7280f1",
    height: "40%",
  },
});
