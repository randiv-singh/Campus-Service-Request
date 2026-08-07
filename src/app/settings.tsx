import { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        ⚙ Settings
      </Text>

      <View style={styles.card}>

        <View style={styles.row}>
          <Text style={styles.label}>
            Enable Notifications
          </Text>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: "#BBDEFB",
              true: "#42A5F5",
            }}
            thumbColor="#FFFFFF"
          />
        </View>


        <Text style={styles.sectionTitle}>
          About
        </Text>

        <Text style={styles.info}>
          Campus Service Request
        </Text>

        <Text style={styles.version}>
          Version 1.0
        </Text>


        <Text style={styles.footer}>
          Manage your campus requests easily
        </Text>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
    padding: 20,
  },


  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 20,
  },


  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },


  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },


  label: {
    fontSize: 18,
    color: "#1565C0",
    fontWeight: "600",
  },


  sectionTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565C0",
  },


  info: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },


  version: {
    marginTop: 10,
    fontSize: 15,
    color: "#666",
  },


  footer: {
    marginTop: 25,
    textAlign: "center",
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
  },

});