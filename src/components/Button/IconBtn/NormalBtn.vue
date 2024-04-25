<template>
  <q-btn
    unelevated
    color="primary"
    @click="clicked"
    style="min-width: 115px; border-radius: 8px; font-weight: bolder"
  >
    <q-icon :name="icon" />{{ btnName }}
  </q-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  btnName: string;
  icon: string;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
