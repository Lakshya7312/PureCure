import React from "react";

import { Header, Icon } from "@rneui/themed";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";

export default function MyHeader() {
  const navigation = useNavigation();
  return (
    <Header
      backgroundColor="#6270dd"
      containerStyle={{ paddingVertical: RFValue(30) }}
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome"
          color="#FFF"
          onPress={() => navigation.toggleDrawer()}
          size={RFValue(25)}
          style={{ marginLeft: RFValue(10), marginTop: RFValue(8.5) }}
        />
      }
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
  );
}
