<template>
  <q-pagination
    :modelValue="paginaTable.page"
    @update:model-value="
      (value) => $emit('update:paginaTable', { ...paginaTable, page: value })
    "
    :max="pagesNumber"
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
import { computed, ref } from 'vue';
import { Pagination } from '../data ';

const props = defineProps<{
  paginaTable: Pagination;
}>();
defineEmits(['update:paginaTable']);

const pagesNumber = computed(() =>
  Math.ceil(props.paginaTable.rowLength / props.paginaTable.rowsPerPage)
);
</script>
