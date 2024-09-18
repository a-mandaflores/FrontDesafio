<template>
    <div class="modal-container">
        <div class="modal-content">
            <div class="close" @click="handleCancel">X</div>
            <h2>Editar</h2>

            <form @submit.prevent="handleEdit(itemId)">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="name" placeholder="Enter name" />
                </div>

                <div class="form-group">
                    <label for="zipCode">Zip Code</label>
                    <input type="text" id="zipCode" v-model="zipCode" placeholder="Enter zip code" />
                </div>

                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" id="city" v-model="city" placeholder="Enter city" />
                </div>

                <div class="form-group">
                    <label for="country">Country</label>
                    <input type="text" id="country" v-model="country" placeholder="Enter country" />
                </div>

                <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" id="state" v-model="state" placeholder="Enter state" />
                </div>

                <div class="button-group">
                    <button type="button" @click="handleEdit" class="confirm-button">Confirm</button>
                    <button type="button" @click="handleCancel" class="cancel-button">
                        Cancel
                    </button>
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
const itemId = computed(() => store.state.itemToEdit);

const name = ref('');
const zipCode = ref('');
const city = ref('');
const country = ref('');
const state = ref('');

const fetchItem = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/airport/${itemId.value}`);
        
        name.value = response.data.name
        zipCode.value = response.data.location.zip_code
        city.value = response.data.location.city
        country.value = response.data.location.country
        state.value = response.data.location.state

    } catch (error) {
        console.error(error);
    }
}


const handleCancel = () => {
    store.dispatch('editModal', null);
    location.reload();
};

const handleEdit = async () => {
    const data = {
        name: name.value,
        zip_code: zipCode.value,
        city: city.value,
        country: country.value,
        state: state.value
    }
    try {
        await axios.patch(`http://localhost:3000/airport/${itemId.value}`, data);
    }catch{
        console.error(error);
    }
    store.dispatch('editModal', itemId.value)
    location.reload();

    
};



onMounted(() => {
    fetchItem()
})
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