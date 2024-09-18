<template>
    <a-layout class="template">
        <a-layout-header class="header">
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1"><router-link to="/">Aeroportos</router-link></a-menu-item>
                <a-menu-item key="2"><router-link to="/flight">Voos</router-link></a-menu-item>
                <a-menu-item key="3"><router-link to="/register">Cadastros</router-link></a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <Breadcrumb :routes="breadcrumbRoutes" />
            <router-view></router-view>
        </a-layout-content>
        <Copyright />
    </a-layout>
</template>

<script setup>
import Breadcrumb from './pageElements/Breadcrumb.vue';
import Copyright from './pageElements/Copyright.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); 

const breadcrumbMap = {
    '1': [
        
        { path: '/aeroport', name: 'Aeroport' }
    ],
    '2': [
        { path: '/flight', name: 'Voos' }
    ],
    '3': [
        { path: '/register', name: 'Cadastrar' }
    ]
};

const selectedKeys = computed(() => {
    if (route.path === '/') return ['1'];
    if (route.path === '/flight') return ['2'];
    if (route.path === '/register') return ['3'];
    return [];
});


const breadcrumbRoutes = computed(() => {
    return breadcrumbMap[selectedKeys.value[0]] || [];
});
</script>

<style>
body {
    background-color: #f7f5f5;
    min-height: 100vh; 
  }
</style>
