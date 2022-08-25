import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

export default class PolicyScreen extends React.Component {o
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>
            To fully avail the services of the Application and use it, you must
            download the app from the Google Playstore, and verify your
            email address. Without limitation to the foregoing, in the event you
            are barred from undertaking legally binding obligations under the
            Indian Contract Act, 1872, or are for any reason, unable to provide
            ‘Consent’ as per the Information Technology (Reasonable security
            practices and procedures and sensitive personal data or information)
            Rules, 2011, you are not eligible to register for, use or avail the
            services available on the Application. Fair usage policy The
            Services of PureCure cannot be used for personal gains or in
            conjunction with any commercial activity including but not limited
            to using on the application. PureCure reserves the right to limit,
            suspend, disable or discontinue your Service in the event that it is
            discovered that the Service is being used in conjunction with any
            commercial activity including but not limited to using on the
            application or for commercial gains or misuse of service for not
            intended purpose. Terms of Use: The use of free consultations via
            our Gold plan shall be restricted on a daily, monthly, weekly and
            yearly basis. Capping of which is subjected to change. The
            application is constantly reviewed by our internal teams to ensure
            we deliver the right benefits to our customers and avoid any mis-use
            of our services. To read more about the policy visit, Your Gold/Gold
            Store page in our applications. Without limiting any other
            provisions of these Terms, you may not use this Application for any
            purpose that is unlawful or prohibited by these Terms and/or any
            applicable additional terms. Your access of this Application may be
            terminated immediately, in our sole discretion, with or without
            notice, if you fail to comply with any provision of these Terms
            and/or additional terms, or for any other reason, or no reason.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf7",
    padding: RFValue(10)
  },

  text: {
    color: "#000",
    marginTop: RFValue(50),
    fontSize: RFValue(20),
  },
});
