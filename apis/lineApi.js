import { request } from "./apiClient";

const lineApi = {
  async get(id) {
    const response = await request(`lines/${id}`);
    return response;
  },
  async getAll() {
    const response = await request(`lines`);
    return response;
  },
  async create(data) {
    const response = await request(`lines`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async update(id, data) {
    const response = await request(
      `lines/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );
    return response;
  },
  async delete(id) {
    const response = await request(
      `lines/${id}`,
      {
        method: "DELETE",
      },
      false
    );
    return response;
  },
  async addLineStations({ lineId, data }) {
    const response = await request(
      `lines/${lineId}/sections`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );
    return response;
  },
  async deleteLineStation({ lineId, stationId }) {
    const response = await request(
      `lines/${lineId}/sections?stationId=${stationId}`,
      {
        method: "DELETE",
      },
      false
    );
    return response;
  },
};

export default lineApi;
