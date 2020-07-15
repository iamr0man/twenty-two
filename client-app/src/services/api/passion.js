import axiosInstance from "../instance";

export default {
  async getPassionCards(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/note/all/`);
  },
  async getPassionCard(profileId, noteId) {
    return await axiosInstance.get(`/profile/${profileId}/note/${noteId}`);
  },
  async getImageLink(formData) {
    const url = "https://api.cloudinary.com/v1_1/dd1zwnjkj/image/upload";
    const res = await fetch(url, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });
    debugger;
    const test = await res.json();
    debugger;
    return test;
  },
  async updatePassionCard(profileId, noteId, newNote) {
    return await axiosInstance.put(
      `/profile/${profileId}/note/${noteId}`,
      newNote
    );
  },
  async createPassionCard(profileId, newNote) {
    return await axiosInstance.post(`/profile/${profileId}/note`, newNote);
  }
};
