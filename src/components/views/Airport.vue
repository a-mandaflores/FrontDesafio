<template>
  <a-layout style="padding: 24px 0; margin: 10px; height: auto; background: #fff">
    <a-layout-content :style="{ marginBottom:'5rem', padding: '0 24px', minHeight: '280px' }">
      <div v-if="!loading">
        <TableElement />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import TableElement from '../table/TableAirport.vue';

const store = useStore();
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {

  error.value = null;
  try {
    await store.dispatch('callApi', 'airport');
  } catch (e) {
    error.value = 'Failed to fetch data. Please try again later.';
  } finally {
    loading.value = false;

  }
};

onMounted(() => {
  fetchData()
});

</script>
