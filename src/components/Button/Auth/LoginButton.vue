<template>
  <HoverBtn :props="props" @clicked="clicked" />
</template>

<script setup lang="ts">
import HoverBtn from '../Hover/HoverBtn.vue';
const props = {
  label: '登入',
  outline: true,
};
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
