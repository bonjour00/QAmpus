<template>
  <q-stepper
    color="primary"
    animated
    inactive-color="primary"
    class="no-shadow"
    v-model="stepper"
  >
    <q-step
      class="q-pa-lg"
      v-for="(x, index) in record"
      :name="index"
      :title="x.title"
      :prefix="index + 1"
      :key="index"
    />
  </q-stepper>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  record?: any;
}>();
const stepper = ref(-1);
</script>
