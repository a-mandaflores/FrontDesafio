<template>
  <div class="flight-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="origin">Origem</label>
        <input 
          type="text" 
          id="origin" 
          v-model="formData.origin" 
          @input="fetchAirports('origin')" 
          required 
          placeholder="Digite a origem do voo" 
        />
        <div v-if="showCityDropdown.origin" class="dropdown">
          <ul>
            <li v-for="city in filteredCities.origin" :key="city.id" @click="selectCity(city, 'origin')">{{ city.name }}</li>
          </ul>
        </div>
      </div>

      <div class="form-group">
        <label for="destination">Destino</label>
        <input 
          type="text" 
          id="destination" 
          v-model="formData.destination" 
          @input="fetchAirports('destination')" 
          required 
          placeholder="Digite o destino do voo" 
        />
        <div v-if="showCityDropdown.destination" class="dropdown">
          <ul>
            <li v-for="city in filteredCities.destination" :key="city.id" @click="selectCity(city, 'destination')">{{ city.name }}</li>
          </ul>
        </div>
      </div>

      <div class="form-group">
        <label for="departure">Saída</label>
        <input 
          type="datetime-local" 
          id="departure" 
          v-model="formData.departure_time" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="arrival">Chegada</label>
        <input 
          type="datetime-local" 
          id="arrival" 
          v-model="formData.arrival_time" 
          required 
        />
      </div>
      <div v-if="destinationEqual" style="color: red; padding: 1rem">Destino e origem não podem ser o mesmos</div>
      <div v-if="destinationDay" style="color: red; padding: 1rem">Não pode haver 2 voos para o mesmo destino no mesmo dia</div>

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';

const formData = reactive({
  origin: '',
  destination: '',
  departure_time: '',
  arrival_time: '',
  origin_airport_id: '',
  destination_airport_id: ''
});

const filteredCities = reactive({
  origin: [],
  destination: []
});

const destinationEqual = ref(false)
const destinationDay = ref(false)

const showCityDropdown = reactive({
  origin: false,
  destination: false
});

const fetchAirports = async (type) => {
  if (formData[type].length < 3) {
    filteredCities[type] = [];
    showCityDropdown[type] = false;
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3000/airport`);
    filteredCities[type] = response.data || []; 
    showCityDropdown[type] = true;
  } catch (error) {
    console.error('Erro ao buscar aeroportos:', error);
  }
};

const selectCity = (city, type) => {
  formData[type] = city.name; 
  const fetchType = type == 'origin' ? 'origin_airport_id' : 'destination_airport_id';
  formData[fetchType] = city.id;
  showCityDropdown[type] = false;
};

const handleSubmit = async () => {
  if (formData.origin === formData.destination) {
    destinationEqual.value = true
    return;
  }

  try {
    await axios.post('http://localhost:3000/flight', {
      origin_airport_id: formData.origin_airport_id,
      destination_airport_id: formData.destination_airport_id,
      departure_time: formData.departure_time,
      arrival_time: formData.arrival_time
    });
  } catch (error) {
    destinationDay.value = true
    console.error('Erro ao enviar o formulário:', error.name);
  }

  setTimeout(() => {
    destinationEqual.value = false
    destinationDay.value = false
  }, 5000)
};
</script>


<style lang="scss" scoped>
.flight-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .form-group {
    margin-bottom: 1rem;

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
  }

  .dropdown {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 100%;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5rem;
        cursor: pointer;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
