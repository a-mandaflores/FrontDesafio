<template>
  <div class="airport-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="formData.name" required placeholder="Digite o nome do aeroporto" />
      </div>

      <div class="form-group">
        <label for="zip_code">CEP</label>
        <input 
          type="text" 
          id="zip_code" 
          :value="formData.zip_code" 
          @input="handleZipCodeChange" 
          @blur="handleCepOnBlur"
          @keyup.enter="handleCepOnBlur"
          placeholder="Digite o CEP" 
          required 
          maxlength="10" 
        />
      </div>

      <div v-if="zipCodNotFound" style="color: red; padding: 1rem">CEP não encontrado</div>

      <div class="form-group">
        <label for="city">Cidade</label>
        <input type="text" id="city" v-model="formData.city" required placeholder="Digite a cidade" />
      </div>

      <div class="form-group">
        <label for="state">Estado</label>
        <input type="text" id="state" v-model="formData.state" required placeholder="Digite o estado" />
      </div>

      <div class="form-group">
        <label for="country">País</label>
        <input type="text" id="country" v-model="formData.country" required placeholder="Digite o país" />
      </div>

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';

const zipCodNotFound = ref(false);

const formatCep = (value) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '') 
    .replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3'); 
};

const handleZipCodeChange = (event) => {
  const inputValue = event.target.value;
  const numericValue = inputValue.replace(/\D/g, ''); 
  formData.value.zip_code = formatCep(numericValue);
};

const handleCepOnBlur = async () => {
  const numericValue = formData.value.zip_code.replace(/\D/g, ''); 
  if (numericValue.length === 8) {
    await handleCep(numericValue);
  }
};

const formData = ref({
  name: '',
  zip_code: '00.000-000',
  city: '',
  state: '',
  country: ''
});

const handleCep = async (zipCode) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
    if (response.data.erro) {
      zipCodNotFound.value = true;
      setTimeout(() => {
        zipCodNotFound.value = false;
      }, 5000);
    } else {
      formData.value.city = response.data.localidade;
      formData.value.state = response.data.uf;
      formData.value.country = 'Brasil'; 
      zipCodNotFound.value = false;
    }
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
  }
};

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3000/airport', formData.value);
    console.log('Resposta do servidor:', response.data);
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
  }
};
</script>

<style lang="scss" scoped>
.airport-form {
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
