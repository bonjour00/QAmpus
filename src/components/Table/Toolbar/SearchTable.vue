<template>
  <q-input
    v-model="q"
    borderless
    dense
    placeholder="Search"
    filled
    @keyup.enter="$emit('updateSearch', q)"
    bg-color="grey-1"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const q = ref('');

defineEmits(['updateSearch']);
</script>
