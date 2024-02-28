<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="qa_id"
    class="q-pt-lg"
    :title="tableTitle"
    hide-pagination
    :rows-per-page-options="[pagination.rowsPerPage]"
    :loading="loading"
    style="border-radius: 25px; padding: 20px; height: 92vh"
  >
    <template v-slot:top-right>
      <SearchTable @update-search="searchReturn" />
      <OptionSelect
        :currentOption="orderNow"
        @update:current-option="orderReturn"
        :options="options"
        :title="title"
      />
      <slot name="add"></slot>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <slot name="btnAction" :props="props"></slot>
      </q-td>
    </template>
    <template #bottom>
      <div style="right: 30px; position: absolute">
        <PaginationTable
          :pagination="pagination"
          @update:pagination="pageReturn"
        />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SearchTable from './Toolbar/SearchTable.vue';
import OptionSelect from './Toolbar/OptionSelect.vue';
import PaginationTable from './Pagination/PaginationTable.vue';
import { QA, Pagination, Option, orderOptions } from './data ';

const props = defineProps<{
  rows: QA[];
  columns: any;
  tableTitle: string;
  loading: boolean;
  pageNow: Pagination;
  searchNow: string;
  orderNow: Option;
}>();

//toolBar
const options = orderOptions;
const title = '分類'; //optionTitle(prepend前綴)

//pagination
const pagination = computed(() => {
  return { ...props.pageNow, rowLength: props.rows ? props.rows.length : 0 };
});

const emit = defineEmits([
  'update:pageNow',
  'update:searchNow',
  'update:orderNow',
]);

// 回傳第幾頁、幾筆
const pageReturn = (value: any) => {
  emit('update:pageNow', value);
};
const searchReturn = (value: any) => {
  emit('update:searchNow', value);
};
const orderReturn = (value: any) => {
  emit('update:orderNow', value);
};
// :loading="true"
//loading-label="Gimme a sec and I'll fetch ya data!"
//no-data-label="I can't find any data 😞"
</script>
<style lang="sass">
.q-table__title
  font-weight: 900
  font-size: 30px
</style>
