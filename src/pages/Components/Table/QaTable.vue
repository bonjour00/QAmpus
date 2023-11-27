<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="qa_id"
    class="q-pt-lg"
    title="待審核問題"
    v-model:pagination="pagination"
    hide-pagination
  >
    <template v-slot:top-right>
      <SearchTable v-model:search="search" />
      <OptionSelect
        v-model:currentOption="orderArr"
        :options="options"
        :title="title"
      />
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <slot name="btnAction" :props="props"></slot>
      </q-td>
    </template>
    <template #bottom>
      <div style="right: 30px; position: absolute">
        <PaginationTable v-model:pagina-table="pagination" />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { columns } from './Columns';
import SearchTable from './Toolbar/SearchTable.vue';
import OptionSelect from './Toolbar/OptionSelect.vue';
import PaginationTable from './Pagination/PaginationTable.vue';
import { QA, Pagination, paginationInitial, Option } from './data ';

const props = defineProps<{
  rows: QA[];
  pageNow: Pagination;
  searchNow: string;
  orderNow: Option;
}>();

//toolBar
const search = ref('');
const orderArr = ref({ label: '最新', value: 'desc' });
const options = [
  { label: '最新', value: 'desc' },
  { label: '最舊', value: 'asc' },
];
const title = '分類'; //optionTitle(prepend前綴)

//pagination
const pagination = ref({ ...paginationInitial, rowLength: props.rows.length });

const emit = defineEmits([
  'update:pageNow',
  'update:searchNow',
  'update:orderNow',
]);
//回傳第幾頁、幾筆
watch(pagination, () => {
  emit('update:pageNow', pagination.value);
});
watch(search, () => {
  emit('update:searchNow', search.value);
});
watch(orderArr, () => {
  emit('update:orderNow', orderArr.value);
});
// :loading="true"
//loading-label="Gimme a sec and I'll fetch ya data!"
//no-data-label="I can't find any data 😞"
</script>
