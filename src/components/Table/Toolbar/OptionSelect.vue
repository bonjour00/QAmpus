<template>
  <q-select
    filled
    :modelValue="currentOption"
    @update:model-value="(value) => $emit('update:currentOption', value)"
    :options="options"
    class="q-ml-sm-sm"
    dense
    options-dense
    bg-color="grey-1"
  >
    <template v-slot:prepend>
      <span class="text-subtitle2">{{ title }}:</span>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Option } from '../data ';

const props = defineProps<{
  currentOption: Option;
  options: Option[];
  title: string;
}>();

defineEmits(['update:currentOption']);
</script>
