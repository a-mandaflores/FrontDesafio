<template class="relative">
  <div>
    <table class="table">
      <thead>
        <tr class="header">
          <th>Código do voo</th>
          <th>Origem</th>
          <th>Destino</th>
          <th>Saída</th>
          <th>Chegada</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row" v-for="(item, index) in rawData" :key="item.id" :class="{ 'first-row': index === 0 }">
          <td>{{ item.cod_flight }}</td>
          <td>{{ item.origin_airport ? item.origin_airport.name : 'N/A' }}</td>
          <td>{{ item.destination_airport ? item.destination_airport.name : 'N/A' }}</td>
          <td>{{ formatDateTime(item.departure_time) }}</td>
          <td>{{ formatDateTime(item.arrival_time) }}</td>
          <td class="buttons">
            <button @click="editItem(item.id)" class="btn edit-btn">Editar</button>
            <button @click="showDeleteDialog(item.id)"  class="btn delete-btn">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="showEditModel" class="modal-container">
    <EditFlights />
  </div>

  <div v-if="showDeleteModal" class="modal-container">
    <Delete />
  </div>
</template>

<script setup>
import Delete from '../card/Delete.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import EditFlights from '../card/EditFlights.vue';

const store = useStore();
const dataStore = computed(() => store.state.data);
const rawData = ref([]);

const stateDeleteModal = computed(() => store.state.deleteModal);
const showDeleteModal = computed(() => stateDeleteModal.value); 

const stateEditModel = computed(() => store.state.editModal)
const showEditModel = computed(() => stateEditModel.value)

const formatDateTime = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleString('pt-BR', { timeZone: 'UTC' });
};


const showDeleteDialog = (id) => {
  const item = rawData.value.find((item) => item.id === id);
  if (item) {
    store.dispatch('deleteModelToggle', { itemId: id, component: 'flight' });
  }
};

const editItem = (id) => {
  store.dispatch('editModal', id)
}

watch(dataStore, (newData) => {
  rawData.value = newData;
}, { immediate: true });

</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.header {
  background-color: #3696fd;
  color: #ffffff;
  text-align: left;
}

.header th {
  padding: 1rem;
  font-size: 0.875rem;
}

.row:nth-child(even) {
  background-color: #f9f9f9;
}

.row:nth-child(odd) {
  background-color: #ffffff;
}

.row td {
  padding: 0.75rem;
  text-align: left;
  font-size: 0.875rem;
}

.table td {
  color: #333333;
}

.table th {
  font-size: 0.875rem;
  color: #ffffff;
}

.table tr:hover {
  background-color: #e2e6ea;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #55bb6d;
  color: white;
}

.edit-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #d15561;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}


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

.modal-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}

.confirm-button {
  background-color: #28a745;
  color: #fff;
}

.confirm-button:hover {
  background-color: #218838;
}

.cancel-button {
  background-color: #dc3545;
  color: #fff;
}

.cancel-button:hover {
  background-color: #c82333;
}
</style>
