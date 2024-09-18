<template>
    <a-layout 
        style="min-height: 100vh; padding: 24px 0; margin: 10px; background: #fff; display: flex; flex-direction: column;">
        <a-layout-content
            :style="{ marginBottom: '5rem', padding: '0 24px', flex: '1', minHeight: loading ? '280px' : 'auto' }">
            <a-spin size="large" v-if="loading" />
            <TableFlight v-else />
        </a-layout-content>

        
    </a-layout>
</template>

<script setup>
import TableFlight from '../table/TableFlight.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
    error.value = null;
    try {
        await store.dispatch('callApi', 'flight');
    } catch (e) {
        error.value = 'Failed to fetch data. Please try again later.';
        console.error('API call failed', e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style lang="scss" scoped></style>
