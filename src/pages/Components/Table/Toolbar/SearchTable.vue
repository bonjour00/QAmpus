<template>
  <q-input
    v-model="q"
    borderless
    dense
    debounce="300"
    placeholder="Search"
    filled
    @keyup.enter="$emit('updateSearch', q)"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const q = ref('');
// const props = defineProps<{
//   search: string;
// }>();
defineEmits(['updateSearch']);

// :modelValue="search"
//  @update:model-value="(value) => $emit('update:search', value)"
</script>
