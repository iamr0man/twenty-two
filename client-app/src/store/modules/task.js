import { TaskApi } from "../../services/index";

export default {
  namespaced: true,
  state: {
    currentTask: {},
    tasks: {
      task: []
    }
  },
  mutations: {
    SET_TASKS(state, payload) {
      state.tasks = payload;
    },
    SET_TASK(state, payload) {
      state.currentTask = payload;
    }
  },
  actions: {
    async getTaskCards({ commit }, { profileId }) {
      const { data } = await TaskApi.getTaskCards(profileId);
      if (data) {
        commit("SET_TASKS", data);
      }
    },
    async getTaskCard({ commit }, { profileId, noteId }) {
      const { data } = await TaskApi.getTaskCard(profileId, noteId);
      if (data) {
        commit("SET_TASK", data);
      }
    },
    async updateTaskCard({ commit }, { profileId, noteId, newTask }) {
      const { data } = await TaskApi.updateTaskCard(
        profileId,
        noteId,
        newTask
      );
      if (data) {
        commit("SET_TASK", data);
      }
    },
    async createTaskCard({ commit }, { profileId, newNote }) {
      const { data } = await TaskApi.createTaskCard(profileId, newNote);
      if (data) {
        commit("SET_TASK", data);
      }
    },
    async createBoard({ commit }, { profileId }) {
      const { data } = await TaskApi.createBoard(profileId);
      if (data) {
        commit("SET_TASKS", data);
      }
    },
  },
  getters: {
    tasks: state => state.tasks,
    mainTasks: state => state.tasks.task.filter(v => v.type === 'main'),
    secondaryTasks: state => state.tasks.task.filter(v => v.type === 'secondary'),
    currentTask: state => state.currentTask
  }
};
