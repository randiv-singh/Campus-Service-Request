import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

export default function DetailScreen() {
  const {
    title,
    location,
    category,
    status,
    date,
    description,
  } = useLocalSearchParams();

  const [reviewed, setReviewed] = useState(false);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        📋 {title}
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          📍 Location
        </Text>
        <Text style={styles.value}>
          {location}
        </Text>


        <Text style={styles.label}>
          🗂 Category
        </Text>
        <Text style={styles.value}>
          {category}
        </Text>


        <Text style={styles.label}>
          📅 Reported Date
        </Text>
        <Text style={styles.value}>
          {date}
        </Text>


        <Text style={styles.label}>
          📝 Description
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>


        <Text style={styles.label}>
          📌 Status
        </Text>

        <Text style={styles.status}>
          {reviewed ? "Reviewed ✅" : status}
        </Text>


        {!reviewed ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setReviewed(true)}
          >
            <Text style={styles.buttonText}>
              ✓ Mark as Reviewed
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.reviewedButton}>
            <Text style={styles.reviewedText}>
              ✓ Request Reviewed
            </Text>
          </View>
        )}


        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.settingsText}>
            ⚙ Go to Settings
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.homeText}>
            🏠 Back to Requests
          </Text>
        </TouchableOpacity>


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

  title: {
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

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565C0",
    marginTop: 12,
  },

  value: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
  },

  description: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
    lineHeight: 22,
  },

  status: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
    marginTop: 8,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#42A5F5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  reviewedButton: {
    backgroundColor: "#BBDEFB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  reviewedText: {
    color: "#1565C0",
    fontSize: 16,
    fontWeight: "bold",
  },

  settingsButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  settingsText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  homeButton: {
    marginTop: 15,
    backgroundColor: "#1565C0",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  homeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});