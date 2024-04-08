<template>
  <q-btn flat :label="btnName" unelevated color="primary" f @click="clicked" />
</template>

<script setup lang="ts">
const props = defineProps<{
  btnName: string;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
