import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";

import RequestCard from "../components/RequestCard";
import {
  CampusRequest,
  getRequests,
} from "../services/api";

type RequestItem = {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  status: string;
  reportedDate: string;
  date: string;
};

const STORAGE_KEY = "campus_requests";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const convertRequests = (
    data: CampusRequest[]
  ): RequestItem[] => {
    return data.map((item) => ({
      id: item.id || "",
      title: item.title,
      location: item.location,
      category: item.category,
      description: item.description,
      status: item.status,
      reportedDate: item.reportedDate,
      date: item.reportedDate,
    }));
  };

  const loadRequests = async () => {
    setLoading(true);
    setError("");

    try {
      // GET data from MockAPI
      const data = await getRequests();

      const convertedData = convertRequests(data);

      setRequests(convertedData);

      // Save latest data locally
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (err) {
      // Try local data if network/API fails
      const savedData = await AsyncStorage.getItem(
        STORAGE_KEY
      );

      if (savedData) {
        const localRequests: CampusRequest[] =
          JSON.parse(savedData);

        setRequests(convertRequests(localRequests));

        setError(
          "Network unavailable. Showing saved requests."
        );
      } else {
        setError(
          "Unable to load requests. Check your internet connection."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Reload every time the Home Screen becomes active
  useFocusEffect(
    useCallback(() => {
      loadRequests();
    }, [])
  );

  const filteredRequests = requests.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Campus Service Request
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search requests..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addButtonText}>
          + Report New Issue
        </Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#1565C0"
          />

          <Text style={styles.loadingText}>
            Loading requests...
          </Text>
        </View>
      ) : (
        <>
          {error !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error}
              </Text>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={loadRequests}
              >
                <Text style={styles.retryText}>
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {requests.length === 0 ? (
            <Text style={styles.empty}>
              No service requests available.
            </Text>
          ) : filteredRequests.length === 0 ? (
            <Text style={styles.empty}>
              No requests match your search.
            </Text>
          ) : (
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
                        id: item.id,
                        title: item.title,
                        location: item.location,
                        category: item.category,
                        status: item.status,
                        date: item.reportedDate,
                        description:
                          item.description,
                      },
                    })
                  }
                />
              )}
            />
          )}
        </>
      )}
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

  addButton: {
    backgroundColor: "#1565C0",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  center: {
    alignItems: "center",
    marginTop: 40,
  },

  loadingText: {
    marginTop: 10,
    color: "#1565C0",
    fontSize: 16,
  },

  empty: {
    textAlign: "center",
    color: "#1565C0",
    marginTop: 20,
    fontSize: 18,
  },

  errorBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#90CAF9",
  },

  errorText: {
    textAlign: "center",
    color: "#D32F2F",
    marginBottom: 10,
  },

  retryButton: {
    backgroundColor: "#1565C0",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  retryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});