import axiosInstance from "../instance";

export default {
  async getLanguageCards(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/language/all/`);
  },
  async getLanguageCard(profileId, noteId) {
    return await axiosInstance.get(`/profile/${profileId}/language/${noteId}`);
  },
  async updateLanguageCard(profileId, noteId, newNote) {
    return await axiosInstance.put(
      `/profile/${profileId}/language/${noteId}`,
      newNote
    );
  },
  async createLanguageCard(profileId, newNote) {
    return await axiosInstance.post(`/profile/${profileId}/language`, newNote);
  }
};
