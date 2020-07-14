import axiosInstance from "../instance";

export default {
  async getPassionCards(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/note/all/`);
  },
  async getPassionCard(profileId, noteId) {
    return await axiosInstance.get(`/profile/${profileId}/note/${noteId}`);
  },
  async getPhotoURL(formData) {
    const url = "https://api.cloudinary.com/v1_1/dd1zwnjkj/image/upload";
    const res = await fetch(url, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });
    const { secure_url } = await res.json();
    return secure_url;
  }
};
