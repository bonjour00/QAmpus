<template>
  <q-pagination
    :modelValue="page"
    @update:model-value="(value) => $emit('update:page', value)"
    :max="totalPage"
    max-pages="6"
    boundary-numbers
    direction-links
    active-color="accent"
    unelevated
    color="secondary"
    text-color="black"
    active-text-color="white"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  page: number;
  totalPage: number;
}>();
defineEmits(['update:page']);
</script>
