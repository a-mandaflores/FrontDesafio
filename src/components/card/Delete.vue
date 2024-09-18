<template>
    <div class="modal-container">
      <div v-if="!deleteError" class="modal-content">
        <h1 >Tem certeza que deseja deletar?</h1>
        <div class="button-group">
          <button @click="handleDelete(flightId)" class="confirm-button">Sim</button>
          <button @click="handleCancel" class="cancel-button">Não</button>
        </div>
      </div>

      <div v-else class="modal-content">
        <h1 >Esse aeroporto já esta cadastrada em um Voo, você precisa excluir o voo primeiro! </h1>

      </div>
    </div>
  </template>
  
  <script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const flightId = computed(() => store.state.itemToDelete)
const deleteError = computed(() => store.state.deleteError)


  const handleCancel = () => {
    store.dispatch('deleteModelToggle', null)
  }

  const handleDelete = (id) => {
    store.dispatch('deleteModel', id)
  }

  </script>
  
  <style lang="scss" scoped>
  .modal-container {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    max-width: 400px; 
  }
  
  .button-group {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem; 
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .confirm-button {
    background-color: #55bb6d; 
    color: #fff;
  }
  
  .confirm-button:hover {
    background-color: #218838;
  }
  
  .cancel-button {
    background-color: #d15561;
    color: #fff;
  }
  
  .cancel-button:hover {
    background-color: #c82333;
  }
  </style>
  