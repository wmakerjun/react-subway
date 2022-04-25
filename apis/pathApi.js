import { request } from "./apiClient";

const pathApi = {
  async getShortestPath({ sourceId, targetId, age }) {
    const response = await request(
      `paths?source=${sourceId}&target=${targetId}&age=${age}`
    );
    return response;
  },
};

export default pathApi;
