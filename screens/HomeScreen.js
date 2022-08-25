import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  Modal,
  Alert,
} from "react-native";

import MyHeader from "../components/MyHeader";

import { RFValue } from "react-native-responsive-fontsize";

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

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: auth.currentUser.email,
      name: "",
      isModalVisible: false,
    };
  }

  getName = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", this.state.email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.setState({
        name: doc.data().name,
      });
    });
  };

  componentDidMount() {
    this.getName();
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
                  <Pressable
                    style={[styles.modalButton, { backgroundColor: "#7280f1" }]}
                    onPress={() => {
                      this.setState({ isModalVisible: false });
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
                        "Notifying emergency contacts and calling ambulance!"
                      );
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <Text style={styles.modalButonText}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <View>
            <Text style={styles.text}>Hello,</Text>
            <Text style={styles.text1}>{this.state.name}!</Text>
            <Image source={require("../images/pill.png")} style={styles.img} />
          </View>
          <View>
            <Text style={styles.number}>
              We found {Math.ceil(Math.random() * (30 - 10 + 1)) + 9} doctors
              and {Math.ceil(Math.random() * (15 - 10 + 1)) + 3} hospitals
              within a 3 km radius!
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>Stay home!</Text>
            <Text style={styles.subtitle}>
              Schedule an appointment and{"\n"}visit the doctor.
            </Text>
            <Image
              source={require("../images/xyz.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.nextText}>What do you need?</Text>
          <View style={styles.cont}>
            <Pressable
              style={styles.button1}
              onPress={() => {
                this.props.navigation.navigate("Pathology Lab");
              }}
            >
              <Image
                source={require("../images/patho.png")}
                style={[
                  styles.buttonImg,
                  { width: RFValue(40), height: RFValue(40) },
                ]}
              />
              <Text style={[styles.buttonTxt, { fontSize: RFValue(10) }]}>
                Path Lab
              </Text>
            </Pressable>
            <Pressable
              style={styles.button3}
              onPress={() => {
                this.props.navigation.navigate("Reports");
              }}
            >
              <Image
                source={require("../images/report.png")}
                style={styles.buttonImg}
              />
              <Text style={[styles.buttonTxt, { fontSize: RFValue(9) }]}>
                My Reports
              </Text>
            </Pressable>
            <Pressable
              style={styles.button1}
              onPress={() => {
                this.props.navigation.navigate("Donation Centre");
              }}
            >
              <Image
                source={require("../images/hand.png")}
                style={styles.buttonImg}
              />
              <Text style={[styles.buttonTxt, { fontSize: RFValue(9) }]}>
                Donation Center
              </Text>
            </Pressable>
          </View>
          <Pressable
            style={[
              styles.button2,
              { backgroundColor: "#7280f1", alignSelf: "center" },
            ]}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Image
              source={require("../images/sos.png")}
              style={[
                styles.buttonImg,
                { width: RFValue(40), height: RFValue(40) },
              ]}
            />
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

  text: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#b9c4e4",
    marginLeft: RFValue(30),
    marginTop: RFValue(30),
  },

  text1: {
    fontSize: RFValue(40),
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: RFValue(30),
    marginTop: RFValue(0),
    color: "#000000",
  },

  img: {
    width: RFValue(35),
    height: RFValue(35),
    marginTop: RFValue(-45),
    marginLeft: RFValue(215),
  },

  number: {
    fontSize: RFValue(11),
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "#000",
    marginTop: RFValue(25),
    borderWidth: 3,
    borderColor: "#7280f0",
    borderRadius: 20,
    padding: RFValue(10),
  },

  box: {
    flex: 1,
    width: "88%",
    height: RFValue(130),
    marginTop: RFValue(30),
    alignSelf: "center",
    padding: RFValue(10),
    backgroundColor: "#7280f1",
    borderRadius: 30,
    justifyContent: "center",
  },

  image: {
    objectFit: "contain",
    width: RFValue(100),
    height: RFValue(120),
    marginLeft: "auto",
    order: "2",
    marginTop: "auto",
  },

  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(20),
    marginLeft: RFValue(13),
    marginTop: RFValue(15),
  },

  subtitle: {
    color: "#b9c4e4",
    fontSize: RFValue(12),
    marginLeft: RFValue(13),
    marginTop: RFValue(10),
  },

  nextText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: RFValue(23),
    marginLeft: RFValue(30),
    marginTop: RFValue(22),
  },

  cont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(10),
    padding: RFValue(20),
  },

  button1: {
    width: RFValue(85),
    height: RFValue(85),
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    alignContent: "center",
    justifyContent: "center",
  },

  button2: {
    width: "93%",
    height: RFValue(70),
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    alignContent: "center",
    justifyContent: "center",
  },

  button3: {
    width: RFValue(85),
    height: RFValue(85),
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    alignContent: "center",
    justifyContent: "center",
  },

  buttonImg: {
    width: RFValue(35),
    height: RFValue(35),
    alignSelf: "center",
  },

  buttonTxt: {
    fontWeight: "bold",
    fontSize: RFValue(7),
    textAlign: "center",
    alignSelf: "center",
    marginTop: RFValue(5),
    color: "#000",
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
    height: "34%",
    borderColor: "#000",
    borderWidth: 2,
  },
});
