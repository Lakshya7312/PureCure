import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

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

export default class PersonalInfoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: auth.currentUser.email,
      name: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      bGroup: "",
      verification: "",
      emergencyContact1: "",
      emergencyContact2: "",
      emergencyContact3: "",
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", this.state.email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.setState({
        name: doc.data().name,
        address: doc.data().address,
        dateOfBirth: doc.data().dateOfBirth,
        gender: doc.data().gender,
        bGroup: doc.data().bloodGroup,
        verification: doc.data().verification,
        emergencyContact1: doc.data().emergencyContact1,
        emergencyContact2: doc.data().emergencyContact2,
        emergencyContact3: doc.data().emergencyContact3,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.heading}>Personal Info</Text>
          <Text
            style={[
              styles.heading,
              { fontSize: RFValue(13), marginTop: RFValue(0) },
            ]}
          >
            Here's the data you've provided us
          </Text>
          <Text style={[styles.data, { marginTop: RFValue(50) }]}>
            Email:- {this.state.email}
          </Text>
          <Text style={styles.data}>Name:- {this.state.name}</Text>
          <Text style={styles.data}>
            Emergency Contact #1:- {this.state.emergencyContact1}
          </Text>
          <Text style={styles.data}>
            Emergency Contact #2:- {this.state.emergencyContact2}
          </Text>
          <Text style={styles.data}>
            Emergency Contact #3:- {this.state.emergencyContact3}
          </Text>
          <Text style={styles.data}>
            Date Of Birth:- {this.state.dateOfBirth}
          </Text>
          <Text style={styles.data}>Gender:- {this.state.gender}</Text>
          <Text style={styles.data}>Address:- {this.state.address}</Text>
          <Text style={styles.data}>Blood Group:- {this.state.bGroup}</Text>
          <Text style={styles.data}>
            Verification:- {this.state.verification}
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Close</Text>
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
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
    marginTop: RFValue(35),
  },

  data: {
    fontSize: RFValue(17),
    marginTop: RFValue(10),
    marginLeft: RFValue(12),
    color: "#000",
  },

  button: {
    width: "90%",
    height: RFValue(45),
    backgroundColor: "#7280f1",
    borderRadius: 10,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: RFValue(50),
  },

  buttonText: {
    fontSize: RFValue(15),
    alignSelf: "center",
    color: "#fff",
  },
});
