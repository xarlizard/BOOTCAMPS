const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || `HTTP error! status: ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or other errors
      throw new ApiError(
        "Network error. Please check your connection.",
        0,
        null
      );
    }
  }

  // Health check
  async checkHealth() {
    return this.request("/api/health");
  }

  // Items CRUD operations
  async getItems(params = {}) {
    const searchParams = new URLSearchParams();

    if (params.search) searchParams.append("search", params.search);
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.pageSize)
      searchParams.append("pageSize", params.pageSize.toString());

    const query = searchParams.toString();
    return this.request(`/api/items${query ? `?${query}` : ""}`);
  }

  async getItem(id) {
    return this.request(`/api/items/${id}`);
  }

  async createItem(item) {
    return this.request("/api/items", {
      method: "POST",
      body: JSON.stringify(item),
    });
  }

  async updateItem(id, item) {
    return this.request(`/api/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
    });
  }

  async deleteItem(id) {
    return this.request(`/api/items/${id}`, {
      method: "DELETE",
    });
  }
}

// Create a singleton instance
const apiService = new ApiService();

export { ApiService, ApiError };
export default apiService;
