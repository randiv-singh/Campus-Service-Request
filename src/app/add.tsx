import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { addRequest } from "../services/api";

export default function AddRequestScreen() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !location.trim() ||
      !category.trim() ||
      !description.trim()
    ) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await addRequest({
        title,
        location,
        category,
        description,
        status: "Pending",
        reportedDate: new Date().toLocaleDateString(),
      });

      Alert.alert(
        "Success",
        "Service request submitted successfully.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to submit request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Report Campus Issue</Text>

      <Text style={styles.label}>Title</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Broken Chair"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Location</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Room A201"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Category</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Furniture"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Describe the problem..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Submitting..." : "Submit Request"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  description: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});