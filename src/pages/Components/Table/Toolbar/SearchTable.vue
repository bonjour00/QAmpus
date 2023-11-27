<template>
  <q-input
    borderless
    dense
    debounce="300"
    placeholder="Search"
    filled
    :modelValue="search"
    @update:model-value="(value) => $emit('update:search', value)"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const props = defineProps<{
  search: string;
}>();
defineEmits(['update:search']);
</script>
