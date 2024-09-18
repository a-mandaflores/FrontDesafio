import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      data: [],
      deleteModal: false,
      itemToDelete: null,
      componentDelete: null,
      deleteError: false,
      editModal: false,
      itemToEdit: null,
    };
  },
  mutations: {
    setData(state, data) {
      state.data = [...data];
    },
    toggleDeleteModal(state, payload) {
      if (payload) {
        const { itemId, component } = payload;
        state.deleteModal = !state.deleteModal;
        state.itemToDelete = itemId;
        state.componentDelete = component;
      } else {
        state.deleteModal = false;
        state.itemToDelete = null;
        state.componentDelete = null;
      }
    },
    togleEditModal(state, id){
      state.itemToEdit = id
      state.editModal = !state.editModal
    }
  },
  actions: {
    async callApi({ commit }, endpoint) {
      try {
        const response = await axios.get(`http://localhost:3000/${endpoint}`);
        commit("setData", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    deleteModelToggle({ commit }, payload) {
      commit("toggleDeleteModal", payload);
    },

    async deleteModel({ commit, state }) {
      if (state.itemToDelete === null) return;

      try {
        await axios.delete(
          `http://localhost:3000/${state.componentDelete}/${state.itemToDelete}`
        );

        const updatedData = state.data.filter(
          (item) => item.id !== state.itemToDelete
        );
        commit("setData", updatedData);

        commit("toggleDeleteModal", null);
      } catch (error) {
        state.deleteError = true;

        setTimeout(() => {
          state.deleteError = false;
          state.deleteModal = false;
        }, 3000);
      }
    },

    editModal({commit}, data){
      commit("togleEditModal", data)
    }
  },
});

export default store;
