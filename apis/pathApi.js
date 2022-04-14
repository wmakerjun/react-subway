import { request } from "./apiClient";

const pathApi = {
  async getShortestPath({ sourceId, targetId }) {
    const response = await request(
      `paths?source=${sourceId}&target=${targetId}`
    );
    return response;
  },
};

export default pathApi;
