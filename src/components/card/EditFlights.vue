<template>
    <div class="modal-container">
        <div class="modal-content">
            <div class="close" @click="handleCancel">X</div>
            <h2>Editar Voo</h2>

            <form @submit.prevent="handleEdit(flightId)">
               
                <div class="form-group">
                    <label for="departureTime">Partida</label>
                    <input type="datetime-local" id="departureTime" v-model="departureTime" />
                </div>

                <div class="form-group">
                    <label for="arrivalTime">Chegada</label>
                    <input type="datetime-local" id="arrivalTime" v-model="arrivalTime" />
                </div>

                <div class="form-group">
                    <label for="origin">Origem</label>
                    <input type="text" id="origin" v-model="origin" placeholder="Enter origin airport" />
                </div>

                <div class="form-group">
                    <label for="destination">Destino</label>
                    <input type="text" id="destination" v-model="destination" placeholder="Enter destination airport" />
                </div>

                <div class="button-group">
                    <button type="button" @click="handleEdit" class="confirm-button">Confirm</button>
                    <button type="button" @click="handleCancel" class="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const flightId = computed(() => store.state.itemToEdit);

const departureTime = ref('');
const arrivalTime = ref('');
const origin = ref('');
const destination = ref('');
const data = ref({})

const formatISODateTime = (localDateTime) => {
    const date = new Date(localDateTime);
    return date.toISOString();
};

const formatDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const fetchFlight = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/flight/${flightId.value}`);
        data.value = response.data
        departureTime.value = formatDateTime(response.data.departure_time);
        arrivalTime.value = formatDateTime(response.data.arrival_time);
        origin.value = response.data.origin_airport.name;
        destination.value = response.data.destination_airport.name
    } catch (error) {
        console.error(error);
    }
};

const handleCancel = () => {
    store.dispatch('editModal', null);
    location.reload();
};

const handleEdit = async () => {
    const requestData = {
        departure_time: formatISODateTime(departureTime.value),
        arrival_time: formatISODateTime(arrivalTime.value),
        origin_airport_id: data.value.origin_airport.id,
        destination_airport_id: data.value.destination_airport.id
    };
    console.log(requestData)
    try {
        const response = await axios.patch(`http://localhost:3000/flight/${flightId.value}`, requestData);
        console.log(flightId.value);
    } catch (error) {
        console.error(error);
    }
    store.dispatch('editModal', flightId.value);
    location.reload();
};

onMounted(() => {
    fetchFlight();
});
</script>

<style lang="scss" scoped>
.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
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

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
