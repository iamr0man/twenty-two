import { TaskApi } from "../../services/index";

export default {
  namespaced: true,
  state: {
    currentTask: {},
    manager: {
      tasks: []
    }
  },
  mutations: {
    SET_TASKS(state, payload) {
      state.manager = payload;
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
    async getTaskCard({ commit }, { profileId, taskId }) {
      const { data } = await TaskApi.getTaskCard(profileId, taskId);
      if (data) {
        commit("SET_TASK", data);
      }
    },
    async updateTaskCard({ commit }, { profileId, noteId, newTask }) {
      const { data } = await TaskApi.updateTaskCard(profileId, noteId, newTask);
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
    }
  },
  getters: {
    manager: state => state.manager,
    mainTasks: state => state.manager.tasks.filter(v => v.type === "main"),
    secondaryTasks: state =>
      state.manager.tasks.filter(v => v.type === "secondary"),
    currentTask: state => state.currentTask,
    subtasks: state => state.currentTask.subtasks
  }
};
