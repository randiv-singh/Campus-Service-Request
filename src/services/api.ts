const API_URL =
  "https://6aa0d1ec2703577aa1e30b42.mockapi.io/requests";

export type CampusRequest = {
  id?: string;
  title: string;
  location: string;
  category: string;
  description: string;
  status: string;
  reportedDate: string;
};

// GET - retrieve all requests
export const getRequests = async (): Promise<CampusRequest[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load requests");
  }

  return await response.json();
};

// POST - create a new request
export const addRequest = async (
  request: CampusRequest
): Promise<CampusRequest> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to add request");
  }

  return await response.json();
};

// PUT - update an existing request
export const updateRequest = async (
  id: string,
  request: Partial<CampusRequest>
): Promise<CampusRequest> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to update request");
  }

  return await response.json();
};

// DELETE - delete a request
export const deleteRequest = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete request");
  }
};