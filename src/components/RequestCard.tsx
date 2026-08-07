import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Request = {
  id: string;
  title: string;
  location: string;
  category: string;
  status: string;
  date: string;
  description: string;
};

type Props = {
  item: Request;
  onPress: () => void;
};

function getIcon(category: string) {
  switch (category) {
    case "Furniture":
      return "🪑";
    case "Network":
      return "📶";
    case "Equipment":
      return "🖥️";
    case "Maintenance":
      return "🔧";
    case "Electrical":
      return "⚡";
    case "Security":
      return "🚧";
    default:
      return "📋";
  }
}

export default function RequestCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>
        {getIcon(item.category)} {item.title}
      </Text>

      <Text style={styles.location}>
        📍 {item.location}
      </Text>

      <Text style={styles.category}>
        {item.category}
      </Text>

      <View
        style={[
          styles.statusBox,
          item.status === "Resolved" && styles.resolved,
          item.status === "In Progress" && styles.progress,
        ]}
      >
        <Text style={styles.status}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  location: {
    marginTop: 8,
    fontSize: 15,
    color: "#555",
  },

  category: {
    marginTop: 6,
    fontSize: 14,
    color: "#777",
  },

  statusBox: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#FFE082",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  progress: {
    backgroundColor: "#BBDEFB",
  },

  resolved: {
    backgroundColor: "#C8E6C9",
  },

  status: {
    fontWeight: "bold",
    color: "#333",
  },
});