<template>
  <q-btn :label="btnName" unelevated color="primary" @click="clicked"
    ><slot></slot
  ></q-btn>
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
