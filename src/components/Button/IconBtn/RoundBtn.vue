<template>
  <q-btn dense round flat @click="clicked" :icon="icon"></q-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  icon: string;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
