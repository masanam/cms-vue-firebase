<template>
    <div class="border-gray-300 rounded">
      <ul class="flex flex-nowrap justify-between">
        <li
          class="
            w-full
            text-center
            py-4
            cursor-pointer
            border-b-2 border-gray-300
          "
          :class="{
            'bg-gray-300 font-black': tab.hash !== activeTabHash,
            'bg-gray-200 font-bold text-blue-500': tab.hash === activeTabHash,
          }"
          v-for="tab in tabs"
          :key="tab.title"
          @click="activeTabHash = tab.hash"
        >
          {{ tab.title }}
        </li>
      </ul>
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref, provide } from 'vue';
  
  const activeTabHash = ref('');
  const tabs = ref([]);
  
  provide('addTab', (tab) => {
    const count = tabs.value.push(tab);
  
    if (count === 1) {
      activeTabHash.value = tab.hash;
    }
  });
  provide('activeTabHash', activeTabHash);
  </script>
  