import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    tasks: [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    ADD_TASK(state, task) {

        console.log("ADD_TASK");

        console.log(task);

        state.tasks.unshift(task);

    },

    SET_TASKS(state, tasks) {

        console.log("SET_TASKS");

        console.log(tasks);

        console.log(Array.isArray(tasks));

        state.tasks = tasks;

    },
    UPDATE_TASK(state, updatedTask) {

        console.log("UPDATE_TASK");

        console.log(updatedTask);

        const index = state.tasks.findIndex(
            t => t.id === updatedTask.id
        );

        if(index !== -1){

            state.tasks.splice(index,1,updatedTask);

        }

    },
    REMOVE_TASK(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id);
    },

    SET_AUTH(state, payload) {
        state.user = payload.user;
        state.token = payload.token;
    },
  },
  actions: {
    async fetchTasks({ commit }) {

        try {

            const tasks = await api.get("/tasks");

            commit("SET_TASKS", tasks);

        }

        catch(error){

            console.log(error);

        }

    },
    // Action untuk Update Keseluruhan Data
    async updateTask({ commit }, { id, form }) {
      try {
        const task = await api.put(`/tasks/${id}`, form);

        commit("UPDATE_TASK", task);

        return task;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async toggleTaskStatus({ dispatch }, task) {
        try {

            await api.put(`/tasks/${task.id}`, {
                status: task.status === "Completed"
                    ? "Pending"
                    : "Completed"
            });

            await dispatch("fetchTasks");

        } catch (err) {
            console.log(err);
        }
    },
    async updateProfile({ commit }, name) {
        try {
            const response = await api.put('/profile', { name });
            // Update data user di store dan localStorage
            commit('SET_AUTH', { user: response, token: localStorage.getItem('token') });
            localStorage.setItem('user', JSON.stringify(response));
            alert("Profil berhasil diperbarui!");
        } catch (error) {
            alert("Gagal memperbarui profil.");
        }
    },

    async toggleFavorite({ dispatch }, task) {
        try {
            await api.put(`/tasks/${task.id}`, {
                is_favorite: !task.is_favorite
            });

            // reload semua task
            await dispatch("fetchTasks");

        } catch (error) {
            console.error(error);
        }
    },

    async createTask({ commit }, taskData) {

        try {

            const task = await api.post("/tasks", taskData);

            commit("ADD_TASK", task);

            return task;

        } catch (error) {

            console.log("========== ERROR ==========");
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);

            alert(JSON.stringify(error.response.data));

            throw error;
        }

    },

    async deleteTask({ commit }, id) {

        try {

            await api.delete(`/tasks/${id}`);

            commit("REMOVE_TASK", id);

        }

        catch (error) {

            console.error(error);

        }

    },

    async updateNotification({commit,state}, value){

        try{

            const user = await api.put("/notification",{

                email_notification:value

            });

            commit("SET_AUTH",{

                user,

                token:state.token

            });

            localStorage.setItem("user",JSON.stringify(user));

        }

        catch(error){

            console.error(error);

        }

    }
    
  }
});