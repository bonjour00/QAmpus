<template>
  <q-select
    filled
    :modelValue="currentOption"
    @update:model-value="(value) => $emit('update:currentOption', value)"
    :options="options"
    dense
    options-dense
  >
    <template v-slot:prepend>
      <span class="text-subtitle2">{{ title }}:</span>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { Option } from '../data ';

const props = defineProps<{
  currentOption: Option;
  options: Option[];
  title: string;
}>();

defineEmits(['update:currentOption']);
</script>
