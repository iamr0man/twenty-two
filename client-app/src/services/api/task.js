import axiosInstance from "../instance";

export default {
  async getWeekCards(profileId) {
    return await axiosInstance.get('/profile/task/all/' + profileId)
  },
  async getRating(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/rating/all/`)
  },
  async getWeekRating(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/rating/week/`)
  },
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
  },
  async deleteTaskCard(profileId, taskId) {
    return await axiosInstance.delete(`/profile/${profileId}/task/${taskId}`);
  },
  async getRelationships(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/relationships/all`)
  }
};
