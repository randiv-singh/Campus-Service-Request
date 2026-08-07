import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { router } from "expo-router";
import RequestCard from "../components/RequestCard";
import { requests } from "../data/requests";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const filteredRequests = requests.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Campus Service Request</Text>

      <TextInput
        style={styles.search}
        placeholder="Search requests..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredRequests.length === 0 && (
        <Text style={styles.empty}>No requests found.</Text>
      )}

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/detail",
                params: {
                  title: item.title,
                  location: item.location,
                  category: item.category,
                  status: item.status,
                  date: item.date,
                  description: item.description,
                },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EAF6FF",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1565C0",
    marginBottom: 15,
  },

  search: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#90CAF9",
    marginBottom: 15,
  },

  empty: {
    textAlign: "center",
    color: "#1565C0",
    marginTop: 20,
    fontSize: 18,
  },
});