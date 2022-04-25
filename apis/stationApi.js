import { request } from "./apiClient";

const stationApi = {
  async getAll() {
    const response = await request(`stations`);
    return response;
  },
  async create(data) {
    const response = await request(`stations`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async delete({ id }) {
    const response = await request(
      `stations/${id}`,
      {
        method: "DELETE",
      },
      false
    );
    return response;
  },
};

export default stationApi;
