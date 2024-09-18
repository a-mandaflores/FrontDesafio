<template>
    <a-layout style="min-height: 75vh; padding: 24px 0; margin: 10px; background: #fff">         
      <a-layout-content :style="{marginBottom:'5rem', padding: '0 24px', minHeight: '280px' }">
        <div class="register">
          <h1 
            :class="{ selected: selectedTitle === 'aeroporto' }" 
            @click="selectTitle('aeroporto')"
          >
            AEROPORTO
          </h1>
          <h1 
            :class="{ selected: selectedTitle === 'voos' }" 
            @click="selectTitle('voos')"
          >
            VOOS
          </h1>
        </div>
        
        <div v-if="selectedTitle === 'aeroporto' ">
            <AirportRegister />
        </div>
        <div v-else>
            <FlightRegister />
        </div>
      </a-layout-content>
    </a-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AirportRegister from '../register/AirportRegister.vue';
  import FlightRegister from '../register/FlightRegister.vue';
  
  const selectedTitle = ref('aeroporto');
  
  const selectTitle = (title) => {
    selectedTitle.value = title;
  };
  </script>
  
  <style lang="scss" scoped>
  .register {
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 1rem; 
  }
  
  .register h1 {
    flex: 1; 
    text-align: center; 
    margin: 0; 
    cursor: pointer; 
    padding: 1rem;
    transition: background-color 0.3s, color 0.3s; 
    border: 1px solid transparent;
  }
  
  .register h1:hover {
    background-color: #3696fd;
  }
  
  .register h1.selected {
    padding: 1.5rem;
    background-color: #3696fd98; 
    color: #1b3d86; 
  }
  </style>
  