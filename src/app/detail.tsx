import React, { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  deleteRequest,
  updateRequest,
} from "../services/api";

export default function DetailScreen() {
  const {
    id,
    title,
    location,
    category,
    status,
    date,
    description,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    location: string;
    category: string;
    status: string;
    date: string;
    description: string;
  }>();

  const [currentStatus, setCurrentStatus] = useState(
    status || "Pending"
  );

  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleStatusUpdate = async () => {
    if (!id) {
      Alert.alert(
        "Error",
        "Request ID could not be found."
      );
      return;
    }

    let newStatus = "";

    if (currentStatus === "Pending") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Completed";
    } else {
      return;
    }

    try {
      setUpdating(true);

      await updateRequest(id, {
        status: newStatus,
      });

      setCurrentStatus(newStatus);

      Alert.alert(
        "Success",
        `Request status changed to ${newStatus}.`
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to update the request. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = () => {
    if (!id) {
      Alert.alert(
        "Error",
        "Request ID could not be found."
      );
      return;
    }

    Alert.alert(
      "Delete Request",
      "Are you sure you want to delete this request?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);

              await deleteRequest(id);

              Alert.alert(
                "Deleted",
                "The request was deleted successfully.",
                [
                  {
                    text: "OK",
                    onPress: () => router.replace("/"),
                  },
                ]
              );
            } catch (error) {
              Alert.alert(
                "Error",
                "Unable to delete the request. Please try again."
              );

              setDeleting(false);
            }
          },
        },
      ]
    );
  };

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
          {currentStatus}
        </Text>

        {currentStatus !== "Completed" ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleStatusUpdate}
            disabled={updating}
          >
            <Text style={styles.buttonText}>
              {updating
                ? "Updating..."
                : currentStatus === "Pending"
                ? "Change to In Progress"
                : "Mark as Completed"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedButton}>
            <Text style={styles.completedText}>
              ✓ Request Completed
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          disabled={deleting}
        >
          <Text style={styles.deleteText}>
            {deleting
              ? "Deleting..."
              : "🗑 Delete Request"}
          </Text>
        </TouchableOpacity>

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

  completedButton: {
    backgroundColor: "#BBDEFB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  completedText: {
    color: "#1565C0",
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  deleteText: {
    color: "#FFFFFF",
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