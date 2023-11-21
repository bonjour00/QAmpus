<template>
  <q-select
    filled
    :modelValue="orderArr"
    @update:model-value="(value) => $emit('update:orderArr', value)"
    :options="optionsFilter"
    class="q-ml-sm"
    dense
    options-dense
  >
    <template v-slot:prepend>
      <span class="text-subtitle2">分類:</span>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface OrderArr {
  label: string;
  value: string;
}

const props = defineProps<{
  orderArr: OrderArr;
}>();
defineEmits(['update:orderArr']);

const options = [
  { label: '最新', value: 'desc' },
  { label: '最舊', value: 'asc' },
];
const optionsFilter = computed(() => {
  return options.filter((x) => x.value !== props.orderArr.value);
});
</script>
