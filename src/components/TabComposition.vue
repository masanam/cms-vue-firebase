<template>
    <div class="p-4" v-show="isActive">
      <slot />
    </div>
  </template>
  
  <script setup>
  import { inject, ref, onBeforeMount, watch } from 'vue';
  
  const addTab = inject('addTab');
  const activeTabHash = inject('activeTabHash');
  
  const props = defineProps(['title']);
  
  const hash = ref('');
  const isActive = ref(false);
  
  onBeforeMount(() => {
    hash.value = `#${props.title.toLowerCase().replace(/ /g, '-')}`;
  
    addTab({
      title: props.title,
      hash: hash.value,
    });
  });
  
  watch(activeTabHash, () => {
    isActive.value = activeTabHash.value === hash.value;
  });
  </script>
  