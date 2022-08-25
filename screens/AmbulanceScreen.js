import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
  TextInput,
  Modal,
  ToastAndroid,
} from "react-native";

import MyHeader from "../components/MyHeader";

import { RFValue } from "react-native-responsive-fontsize";

import SelectDropdown from "react-native-select-dropdown";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import app from "../config";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export default class AmbulanceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: auth.currentUser.email,
      hospital1: "",
      hospital2: "",
      hospital3: "",
      disabled: false,
      isModalVisible: false,
      isModalVisible2: false,
    };
  }

  getHospital = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", this.state.email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.setState({
        hospital1: doc.data().preferredHospital1,
        hospital2: doc.data().preferredHospital2,
        hospital3: doc.data().preferredHospital3,
      });
    });

    if (
      this.state.hospital1 === "" &&
      this.state.hospital2 === "" &&
      this.state.hospital3 === ""
    ) {
      this.setState({
        disabled: true,
      });
    }
  };

  componentDidMount() {
    this.getHospital();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#f8f8f8"
          translucent={true}
        />
        <MyHeader />
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
              <SelectDropdown
                data={[
                  this.state.hospital1,
                  this.state.hospital2,
                  this.state.hospital3,
                ]}
                defaultButtonText="Select Hospital"
                onSelect={(selectedHospital) => {
                  Alert.alert(
                    "Hold Steady!",
                    `Ambulance arriving in 10 mins from ${selectedHospital}!\nDriver Contact: +91-9875620778`
                  );
                  this.setState({ isModalVisible: false });
                }}
                buttonStyle={styles.hospitalMenu}
                buttonTextStyle={{ color: "#000" }}
                dropdownStyle={{ borderRadius: 30 }}
              />
              <Pressable
                style={styles.cancel}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible2}
          onRequestClose={() => {
            this.setState({ isModalVisible2: false });
          }}
        >
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              <Text style={styles.modalText}>Are you sure?</Text>
              <Text style={styles.subText}>
                Press "Confirm" to proceed calling an ambulance or click
                "Cancel" to cancel.
              </Text>
              <View style={styles.buttEqual}>
                <Pressable
                  style={[styles.modalButton, { backgroundColor: "#7280f1" }]}
                  onPress={() => {
                    this.setState({ isModalVisible2: false });
                  }}
                >
                  <Text style={[styles.modalButonText, { color: "#fff" }]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    Alert.alert(
                      "Hold Steady!",
                      `Ambulance arriving in 6 mins from your nearest hospital!\nDriver Contact: +91-9874501945`
                    );
                    this.setState({ isModalVisible2: false });
                  }}
                >
                  <Text style={styles.modalButonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <KeyboardAwareScrollView>
          <Text style={styles.text}>Call Ambulance From:</Text>
          <Pressable
            style={[styles.button, { marginTop: RFValue(40) }]}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
            disabled={this.state.disabled}
          >
            <Text style={styles.buttonText}>Preferred Hospital</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible2: true });
            }}
          >
            <Text style={styles.buttonText}>
              Nearest Hospitals (Recommended)
            </Text>
          </Pressable>
          <Text style={styles.feelText}>What's your situation?</Text>

          <SelectDropdown
            data={[
              "Critical",
              "Non-Critical",
            ]}
            defaultButtonText="Select Situation"
            onSelect={(value) => {
              ToastAndroid.show("Situation Noted.", ToastAndroid.SHORT)
            }}
            buttonStyle={styles.labButton}
            buttonTextStyle={{ color: "#000" }}
            dropdownStyle={{ borderRadius: 25 }}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf7",
  },

  text: {
    fontSize: RFValue(30),
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    marginTop: RFValue(20),
  },

  button: {
    width: RFValue(250),
    height: RFValue(50),
    backgroundColor: "#7280f1",
    borderRadius: 50,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: RFValue(20),
  },

  buttonText: {
    fontSize: RFValue(15),
    alignSelf: "center",
    color: "#fff",
  },

  feelText: {
    fontSize: RFValue(30),
    alignSelf: "center",
    marginTop: RFValue(80),
    color: "#000",
  },

  input: {
    width: RFValue(250),
    height: RFValue(40),
    borderColor: "#0F3D3E",
    borderWidth: 2,
    borderRadius: 30,
    color: "#000",
    marginTop: RFValue(20),
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
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
    height: "25%",
    borderColor: "#000",
    borderWidth: 2,
  },

  hospitalMenu: {
    width: RFValue(250),
    height: RFValue(40),
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#0F3D3E",
    borderWidth: 2,
    backgroundColor: "#fff",
  },

  cancel: {
    width: RFValue(100),
    height: RFValue(35),
    backgroundColor: "#7280f1",
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 50,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: RFValue(20),
  },

  cancelText: {
    fontSize: RFValue(15),
    alignSelf: "center",
    color: "#fff",
  },

  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(22),
  },

  modalView2: {
    margin: RFValue(20),
    borderRadius: 20,
    padding: RFValue(35),
    alignItems: "center",
    backgroundColor: "#7280f1",
    height: "34%",
    borderColor: "#000",
    borderWidth: 2,
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
    marginTop: RFValue(30),
    padding: RFValue(20),
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  labButton: {
    width: RFValue(300),
    height: RFValue(40),
    marginTop: RFValue(25),
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#7280f1",
    borderWidth: 3,
    backgroundColor: "#e9ecf7",
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
});
