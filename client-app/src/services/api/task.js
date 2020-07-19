import axiosInstance from "../instance";

export default {
  async getTaskCards(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/lastboard`);
  },
  async getTaskCard(profileId, taskId) {
    return await axiosInstance.get(`/profile/${profileId}/task/${taskId}`);
  },
  async updateTaskCard(profileId, taskId, newTask) {
    return await axiosInstance.put(
      `/profile/${profileId}/task/${taskId}`,
      newTask
    );
  },
  async createTaskCard(profileId, newNote) {
    return await axiosInstance.post(`/profile/${profileId}/task`, newNote);
  },
  async createBoard(profileId) {
    return await axiosInstance.post(`/profile/task`, { profileId });
  }
};
