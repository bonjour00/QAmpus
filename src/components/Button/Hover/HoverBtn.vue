<template>
  <q-btn
    @click="clicked"
    @mouseover="setHovering(true)"
    @mouseout="setHovering(false)"
    v-bind="props"
    color="primary"
    :outline="!hovering"
    unelevated
    class="radius-8 text-weight-bold"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { props } = defineProps<{
  props: any;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
const hovering = ref(false);
const setHovering = (tf: boolean) => {
  if (hovering.value != tf) {
    hovering.value = tf;
  }
};
</script>
