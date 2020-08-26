import axiosInstance from "../instance";

export default {
  async getTransactionCards(profileId) {
    return await axiosInstance.get(`/profile/${profileId}/budget/all/`);
  },
  // async getPassionCard(profileId, noteId) {
  //   return await axiosInstance.get(`/profile/${profileId}/note/${noteId}`);
  // },
  // async getImageLink(formData) {
  //   const url = "https://api.cloudinary.com/v1_1/dd1zwnjkj/image/upload";
  //   const res = await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //     mode: "no-cors"
  //   });
  //   const test = await res.json();
  //   return test;
  // },
  // async updatePassionCard(profileId, noteId, newNote) {
  //   return await axiosInstance.put(
  //     `/profile/${profileId}/note/${noteId}`,
  //     newNote
  //   );
  // },
  async createTransactionCard(profileId, newTransaction) {
    return await axiosInstance.post(`/profile/${profileId}/budget`, newTransaction);
  }
};
