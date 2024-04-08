<template>
  <q-select
    :modelValue="currentOption"
    @update:model-value="(value) => $emit('update:currentOption', value)"
    filled
    use-input
    clearable
    dense
    options-dense
    input-debounce="0"
    :options="filterOption"
    @filter="filterFn"
    ><template v-slot:prepend>
      <span class="text-subtitle2">{{ title }}</span>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> 查無資料☹️</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup lang="ts">
// option-label value

const props = defineProps<{
  currentOption: any;
  filterOption: any;
  filterFn: any;
  title: string;
}>();
</script>
