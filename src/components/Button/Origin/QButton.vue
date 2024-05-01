<template>
  <q-btn
    v-bind="props"
    @click="clicked"
    unelevated
    color="primary"
    class="radius-8 text-weight-bold"
  />
</template>

<script setup lang="ts">
const { props } = defineProps<{
  props: any;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
