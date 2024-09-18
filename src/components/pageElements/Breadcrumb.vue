<template>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item v-for="route in routes" :key="route.path">
        {{ route.name }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </template>
  
  <script setup>
  const props = defineProps({
    routes: {
      type: Array,
      required: true
    }
  });
  
  </script>
  
  <style scoped>
  </style>
  