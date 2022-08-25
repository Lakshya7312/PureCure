import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";

import MyHeader from "../components/MyHeader";

import { RFValue } from "react-native-responsive-fontsize";

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
    };
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
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            <View style={styles.modalView}>
              <ScrollView>
                <Text style={styles.tex}>
                  Our SOS ambulance call feature can also be integrated with the
                  UI of the users’ phones to function more quickly and
                  efficiently through the phone’s gesture system.{" "}
                </Text>
                <Pressable
                  style={[styles.button, { marginTop: RFValue(50) }]}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </ScrollView>
            </View>
          </Modal>
          <Text style={styles.text}>Settings</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text style={styles.buttonText}>Gesture SOS</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Personal Info");
            }}
          >
            <Text style={styles.buttonText}>Personal Info</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Policy");
            }}
          >
            <Text style={styles.buttonText}>Policy & Agreements</Text>
          </Pressable>
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

  heading: {
    fontSize: RFValue(27),
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },

  text: {
    fontSize: RFValue(40),
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    marginTop: RFValue(20),
    marginBottom: RFValue(20),
  },

  button: {
    width: "90%",
    height: RFValue(45),
    backgroundColor: "#7280f1",
    borderRadius: 10,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: RFValue(10),
  },

  buttonText: {
    fontSize: RFValue(15),
    alignSelf: "center",
    color: "#fff",
  },

  modalView: {
    backgroundColor: "#e9ecf7",
    padding: 35,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  tex: {
    fontSize: RFValue(33),
    fontWeight: "bold",
  },
});
