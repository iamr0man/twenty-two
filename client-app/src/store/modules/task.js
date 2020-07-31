import { TaskApi } from "../../services/index";

export default {
  namespaced: true,
  state: {
    currentTask: {},
    relationships: [],
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
    },
    SET_RELATIONSHIPS(state, payload) {
      state.relationships = payload
    }
  },
  actions: {
    async getRelationships({ commit }, { profileId }) {
      let { data } = await TaskApi.getRelationships(profileId)
      if(data) {
        const obj = {}
        for (let i = 0; i < data.length; i++) {
          if (obj[data[i].kind]) {
            obj[data[i].kind] += data[i].amount
          } else {
            obj[data[i].kind] = data[i].amount
          }
        }
        commit('SET_RELATIONSHIPS', obj)
      }
    },
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
    },
    async deleteTaskCard({ commit }, { profileId, taskId }) {
      const { data } = await TaskApi.deleteTaskCard(profileId, taskId);
      if (data) {
        commit("SET_TASK", {});
      }
    }
  },
  getters: {
    relationships: state => state.relationships,
    manager: state => state.manager,
    mainTasks: state => state.manager.tasks.filter(v => v.type === "main"),
    secondaryTasks: state =>
      state.manager.tasks.filter(v => v.type === "secondary"),
    currentTask: state => state.currentTask,
    subtasks: state => state.currentTask.subtasks
  }
};
