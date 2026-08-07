import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
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
          />

        </View>


        <Text style={styles.version}>
          Version 1.0
        </Text>


        <Text style={styles.footer}>
          Campus Service Request
        </Text>


      </View>

    </View>

  );
}


const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F1FFF4",
    padding:20,
  },


  heading:{
    fontSize:28,
    fontWeight:"bold",
    textAlign:"center",
    color:"#2E7D32",
    marginBottom:20,
  },


  card:{
    backgroundColor:"#FFFFFF",
    padding:20,
    borderRadius:15,
    elevation:4,
  },


  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },


  label:{
    fontSize:18,
    color:"#333",
  },


  version:{
    marginTop:30,
    textAlign:"center",
    color:"#555",
  },


  footer:{
    marginTop:10,
    textAlign:"center",
    color:"#2E7D32",
    fontWeight:"bold",
  },

});